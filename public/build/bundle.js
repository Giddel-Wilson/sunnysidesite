
(function(l, r) { if (!l || l.getElementById('livereloadscript')) return; r = l.createElement('script'); r.async = 1; r.src = '//' + (self.location.host || 'localhost').split(':')[0] + ':35729/livereload.js?snipver=1'; r.id = 'livereloadscript'; l.getElementsByTagName('head')[0].appendChild(r) })(self.document);
var app = (function () {
    'use strict';

    function noop() { }
    function add_location(element, file, line, column, char) {
        element.__svelte_meta = {
            loc: { file, line, column, char }
        };
    }
    function run(fn) {
        return fn();
    }
    function blank_object() {
        return Object.create(null);
    }
    function run_all(fns) {
        fns.forEach(run);
    }
    function is_function(thing) {
        return typeof thing === 'function';
    }
    function safe_not_equal(a, b) {
        return a != a ? b == b : a !== b || ((a && typeof a === 'object') || typeof a === 'function');
    }
    let src_url_equal_anchor;
    function src_url_equal(element_src, url) {
        if (!src_url_equal_anchor) {
            src_url_equal_anchor = document.createElement('a');
        }
        src_url_equal_anchor.href = url;
        return element_src === src_url_equal_anchor.href;
    }
    function is_empty(obj) {
        return Object.keys(obj).length === 0;
    }
    function append(target, node) {
        target.appendChild(node);
    }
    function insert(target, node, anchor) {
        target.insertBefore(node, anchor || null);
    }
    function detach(node) {
        if (node.parentNode) {
            node.parentNode.removeChild(node);
        }
    }
    function element(name) {
        return document.createElement(name);
    }
    function text(data) {
        return document.createTextNode(data);
    }
    function space() {
        return text(' ');
    }
    function attr(node, attribute, value) {
        if (value == null)
            node.removeAttribute(attribute);
        else if (node.getAttribute(attribute) !== value)
            node.setAttribute(attribute, value);
    }
    function children(element) {
        return Array.from(element.childNodes);
    }
    function custom_event(type, detail, { bubbles = false, cancelable = false } = {}) {
        const e = document.createEvent('CustomEvent');
        e.initCustomEvent(type, bubbles, cancelable, detail);
        return e;
    }

    let current_component;
    function set_current_component(component) {
        current_component = component;
    }

    const dirty_components = [];
    const binding_callbacks = [];
    let render_callbacks = [];
    const flush_callbacks = [];
    const resolved_promise = /* @__PURE__ */ Promise.resolve();
    let update_scheduled = false;
    function schedule_update() {
        if (!update_scheduled) {
            update_scheduled = true;
            resolved_promise.then(flush);
        }
    }
    function add_render_callback(fn) {
        render_callbacks.push(fn);
    }
    // flush() calls callbacks in this order:
    // 1. All beforeUpdate callbacks, in order: parents before children
    // 2. All bind:this callbacks, in reverse order: children before parents.
    // 3. All afterUpdate callbacks, in order: parents before children. EXCEPT
    //    for afterUpdates called during the initial onMount, which are called in
    //    reverse order: children before parents.
    // Since callbacks might update component values, which could trigger another
    // call to flush(), the following steps guard against this:
    // 1. During beforeUpdate, any updated components will be added to the
    //    dirty_components array and will cause a reentrant call to flush(). Because
    //    the flush index is kept outside the function, the reentrant call will pick
    //    up where the earlier call left off and go through all dirty components. The
    //    current_component value is saved and restored so that the reentrant call will
    //    not interfere with the "parent" flush() call.
    // 2. bind:this callbacks cannot trigger new flush() calls.
    // 3. During afterUpdate, any updated components will NOT have their afterUpdate
    //    callback called a second time; the seen_callbacks set, outside the flush()
    //    function, guarantees this behavior.
    const seen_callbacks = new Set();
    let flushidx = 0; // Do *not* move this inside the flush() function
    function flush() {
        // Do not reenter flush while dirty components are updated, as this can
        // result in an infinite loop. Instead, let the inner flush handle it.
        // Reentrancy is ok afterwards for bindings etc.
        if (flushidx !== 0) {
            return;
        }
        const saved_component = current_component;
        do {
            // first, call beforeUpdate functions
            // and update components
            try {
                while (flushidx < dirty_components.length) {
                    const component = dirty_components[flushidx];
                    flushidx++;
                    set_current_component(component);
                    update(component.$$);
                }
            }
            catch (e) {
                // reset dirty state to not end up in a deadlocked state and then rethrow
                dirty_components.length = 0;
                flushidx = 0;
                throw e;
            }
            set_current_component(null);
            dirty_components.length = 0;
            flushidx = 0;
            while (binding_callbacks.length)
                binding_callbacks.pop()();
            // then, once components are updated, call
            // afterUpdate functions. This may cause
            // subsequent updates...
            for (let i = 0; i < render_callbacks.length; i += 1) {
                const callback = render_callbacks[i];
                if (!seen_callbacks.has(callback)) {
                    // ...so guard against infinite loops
                    seen_callbacks.add(callback);
                    callback();
                }
            }
            render_callbacks.length = 0;
        } while (dirty_components.length);
        while (flush_callbacks.length) {
            flush_callbacks.pop()();
        }
        update_scheduled = false;
        seen_callbacks.clear();
        set_current_component(saved_component);
    }
    function update($$) {
        if ($$.fragment !== null) {
            $$.update();
            run_all($$.before_update);
            const dirty = $$.dirty;
            $$.dirty = [-1];
            $$.fragment && $$.fragment.p($$.ctx, dirty);
            $$.after_update.forEach(add_render_callback);
        }
    }
    /**
     * Useful for example to execute remaining `afterUpdate` callbacks before executing `destroy`.
     */
    function flush_render_callbacks(fns) {
        const filtered = [];
        const targets = [];
        render_callbacks.forEach((c) => fns.indexOf(c) === -1 ? filtered.push(c) : targets.push(c));
        targets.forEach((c) => c());
        render_callbacks = filtered;
    }
    const outroing = new Set();
    let outros;
    function transition_in(block, local) {
        if (block && block.i) {
            outroing.delete(block);
            block.i(local);
        }
    }
    function transition_out(block, local, detach, callback) {
        if (block && block.o) {
            if (outroing.has(block))
                return;
            outroing.add(block);
            outros.c.push(() => {
                outroing.delete(block);
                if (callback) {
                    if (detach)
                        block.d(1);
                    callback();
                }
            });
            block.o(local);
        }
        else if (callback) {
            callback();
        }
    }
    function create_component(block) {
        block && block.c();
    }
    function mount_component(component, target, anchor, customElement) {
        const { fragment, after_update } = component.$$;
        fragment && fragment.m(target, anchor);
        if (!customElement) {
            // onMount happens before the initial afterUpdate
            add_render_callback(() => {
                const new_on_destroy = component.$$.on_mount.map(run).filter(is_function);
                // if the component was destroyed immediately
                // it will update the `$$.on_destroy` reference to `null`.
                // the destructured on_destroy may still reference to the old array
                if (component.$$.on_destroy) {
                    component.$$.on_destroy.push(...new_on_destroy);
                }
                else {
                    // Edge case - component was destroyed immediately,
                    // most likely as a result of a binding initialising
                    run_all(new_on_destroy);
                }
                component.$$.on_mount = [];
            });
        }
        after_update.forEach(add_render_callback);
    }
    function destroy_component(component, detaching) {
        const $$ = component.$$;
        if ($$.fragment !== null) {
            flush_render_callbacks($$.after_update);
            run_all($$.on_destroy);
            $$.fragment && $$.fragment.d(detaching);
            // TODO null out other refs, including component.$$ (but need to
            // preserve final state?)
            $$.on_destroy = $$.fragment = null;
            $$.ctx = [];
        }
    }
    function make_dirty(component, i) {
        if (component.$$.dirty[0] === -1) {
            dirty_components.push(component);
            schedule_update();
            component.$$.dirty.fill(0);
        }
        component.$$.dirty[(i / 31) | 0] |= (1 << (i % 31));
    }
    function init(component, options, instance, create_fragment, not_equal, props, append_styles, dirty = [-1]) {
        const parent_component = current_component;
        set_current_component(component);
        const $$ = component.$$ = {
            fragment: null,
            ctx: [],
            // state
            props,
            update: noop,
            not_equal,
            bound: blank_object(),
            // lifecycle
            on_mount: [],
            on_destroy: [],
            on_disconnect: [],
            before_update: [],
            after_update: [],
            context: new Map(options.context || (parent_component ? parent_component.$$.context : [])),
            // everything else
            callbacks: blank_object(),
            dirty,
            skip_bound: false,
            root: options.target || parent_component.$$.root
        };
        append_styles && append_styles($$.root);
        let ready = false;
        $$.ctx = instance
            ? instance(component, options.props || {}, (i, ret, ...rest) => {
                const value = rest.length ? rest[0] : ret;
                if ($$.ctx && not_equal($$.ctx[i], $$.ctx[i] = value)) {
                    if (!$$.skip_bound && $$.bound[i])
                        $$.bound[i](value);
                    if (ready)
                        make_dirty(component, i);
                }
                return ret;
            })
            : [];
        $$.update();
        ready = true;
        run_all($$.before_update);
        // `false` as a special case of no DOM component
        $$.fragment = create_fragment ? create_fragment($$.ctx) : false;
        if (options.target) {
            if (options.hydrate) {
                const nodes = children(options.target);
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.l(nodes);
                nodes.forEach(detach);
            }
            else {
                // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
                $$.fragment && $$.fragment.c();
            }
            if (options.intro)
                transition_in(component.$$.fragment);
            mount_component(component, options.target, options.anchor, options.customElement);
            flush();
        }
        set_current_component(parent_component);
    }
    /**
     * Base class for Svelte components. Used when dev=false.
     */
    class SvelteComponent {
        $destroy() {
            destroy_component(this, 1);
            this.$destroy = noop;
        }
        $on(type, callback) {
            if (!is_function(callback)) {
                return noop;
            }
            const callbacks = (this.$$.callbacks[type] || (this.$$.callbacks[type] = []));
            callbacks.push(callback);
            return () => {
                const index = callbacks.indexOf(callback);
                if (index !== -1)
                    callbacks.splice(index, 1);
            };
        }
        $set($$props) {
            if (this.$$set && !is_empty($$props)) {
                this.$$.skip_bound = true;
                this.$$set($$props);
                this.$$.skip_bound = false;
            }
        }
    }

    function dispatch_dev(type, detail) {
        document.dispatchEvent(custom_event(type, Object.assign({ version: '3.59.2' }, detail), { bubbles: true }));
    }
    function append_dev(target, node) {
        dispatch_dev('SvelteDOMInsert', { target, node });
        append(target, node);
    }
    function insert_dev(target, node, anchor) {
        dispatch_dev('SvelteDOMInsert', { target, node, anchor });
        insert(target, node, anchor);
    }
    function detach_dev(node) {
        dispatch_dev('SvelteDOMRemove', { node });
        detach(node);
    }
    function attr_dev(node, attribute, value) {
        attr(node, attribute, value);
        if (value == null)
            dispatch_dev('SvelteDOMRemoveAttribute', { node, attribute });
        else
            dispatch_dev('SvelteDOMSetAttribute', { node, attribute, value });
    }
    function validate_slots(name, slot, keys) {
        for (const slot_key of Object.keys(slot)) {
            if (!~keys.indexOf(slot_key)) {
                console.warn(`<${name}> received an unexpected slot "${slot_key}".`);
            }
        }
    }
    /**
     * Base class for Svelte components with some minor dev-enhancements. Used when dev=true.
     */
    class SvelteComponentDev extends SvelteComponent {
        constructor(options) {
            if (!options || (!options.target && !options.$$inline)) {
                throw new Error("'target' is a required option");
            }
            super();
        }
        $destroy() {
            super.$destroy();
            this.$destroy = () => {
                console.warn('Component was already destroyed'); // eslint-disable-line no-console
            };
        }
        $capture_state() { }
        $inject_state() { }
    }

    /* src\Nav.svelte generated by Svelte v3.59.2 */

    const file$6 = "src\\Nav.svelte";

    function create_fragment$6(ctx) {
    	let main;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div1;
    	let a0;
    	let t2;
    	let a1;
    	let t4;
    	let a2;
    	let t6;
    	let a3;
    	let t8;
    	let div2;
    	let img1;
    	let img1_src_value;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div1 = element("div");
    			a0 = element("a");
    			a0.textContent = "About";
    			t2 = space();
    			a1 = element("a");
    			a1.textContent = "Services";
    			t4 = space();
    			a2 = element("a");
    			a2.textContent = "Projects";
    			t6 = space();
    			a3 = element("a");
    			a3.textContent = "CONTACT";
    			t8 = space();
    			div2 = element("div");
    			img1 = element("img");
    			if (!src_url_equal(img0.src, img0_src_value = "./logo.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "sunnyside");
    			attr_dev(img0, "class", "logo");
    			add_location(img0, file$6, 4, 4, 60);
    			attr_dev(div0, "class", "logoShell");
    			add_location(div0, file$6, 3, 2, 31);
    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "class", "svelte-du2rd9");
    			add_location(a0, file$6, 7, 4, 156);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "svelte-du2rd9");
    			add_location(a1, file$6, 8, 4, 183);
    			attr_dev(a2, "href", "#");
    			attr_dev(a2, "class", "svelte-du2rd9");
    			add_location(a2, file$6, 9, 4, 213);
    			attr_dev(a3, "href", "#");
    			attr_dev(a3, "class", "svelte-du2rd9");
    			add_location(a3, file$6, 10, 4, 243);
    			attr_dev(div1, "class", "linkShell svelte-du2rd9");
    			add_location(div1, file$6, 6, 2, 127);
    			if (!src_url_equal(img1.src, img1_src_value = "./icon-hamburger.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			add_location(img1, file$6, 13, 4, 306);
    			attr_dev(div2, "class", "burger svelte-du2rd9");
    			add_location(div2, file$6, 12, 2, 280);
    			attr_dev(main, "class", "svelte-du2rd9");
    			add_location(main, file$6, 2, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, img0);
    			append_dev(main, t0);
    			append_dev(main, div1);
    			append_dev(div1, a0);
    			append_dev(div1, t2);
    			append_dev(div1, a1);
    			append_dev(div1, t4);
    			append_dev(div1, a2);
    			append_dev(div1, t6);
    			append_dev(div1, a3);
    			append_dev(main, t8);
    			append_dev(main, div2);
    			append_dev(div2, img1);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$6.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$6($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Nav', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Nav> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Nav extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$6, create_fragment$6, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Nav",
    			options,
    			id: create_fragment$6.name
    		});
    	}
    }

    /* src\Hero.svelte generated by Svelte v3.59.2 */
    const file$5 = "src\\Hero.svelte";

    function create_fragment$5(ctx) {
    	let main;
    	let nav;
    	let t0;
    	let section;
    	let h1;
    	let t2;
    	let img;
    	let img_src_value;
    	let current;
    	nav = new Nav({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(nav.$$.fragment);
    			t0 = space();
    			section = element("section");
    			h1 = element("h1");
    			h1.textContent = "WE ARE CREATIVE";
    			t2 = space();
    			img = element("img");
    			attr_dev(h1, "class", "svelte-1kmler2");
    			add_location(h1, file$5, 7, 4, 116);
    			if (!src_url_equal(img.src, img_src_value = "./image-header.jpg")) attr_dev(img, "src", img_src_value);
    			attr_dev(img, "alt", "orange slice with blue background");
    			attr_dev(img, "class", "svelte-1kmler2");
    			add_location(img, file$5, 8, 4, 146);
    			attr_dev(section, "class", "creativeShell svelte-1kmler2");
    			add_location(section, file$5, 6, 2, 79);
    			attr_dev(main, "class", "svelte-1kmler2");
    			add_location(main, file$5, 4, 0, 58);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(nav, main, null);
    			append_dev(main, t0);
    			append_dev(main, section);
    			append_dev(section, h1);
    			append_dev(section, t2);
    			append_dev(section, img);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(nav.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(nav.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(nav);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$5.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$5($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Hero', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Hero> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Nav });
    	return [];
    }

    class Hero extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$5, create_fragment$5, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Hero",
    			options,
    			id: create_fragment$5.name
    		});
    	}
    }

    /* src\Grid.svelte generated by Svelte v3.59.2 */

    const file$4 = "src\\Grid.svelte";

    function create_fragment$4(ctx) {
    	let main;
    	let div0;
    	let section0;
    	let h10;
    	let t1;
    	let p0;
    	let t3;
    	let h30;
    	let t5;
    	let section1;
    	let img0;
    	let img0_src_value;
    	let t6;
    	let div1;
    	let section2;
    	let img1;
    	let img1_src_value;
    	let t7;
    	let section3;
    	let h11;
    	let t9;
    	let p1;
    	let t11;
    	let h31;
    	let t13;
    	let div2;
    	let section4;
    	let img2;
    	let img2_src_value;
    	let t14;
    	let article0;
    	let h12;
    	let t16;
    	let p2;
    	let t18;
    	let section5;
    	let img3;
    	let img3_src_value;
    	let t19;
    	let article1;
    	let h13;
    	let t21;
    	let p3;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div0 = element("div");
    			section0 = element("section");
    			h10 = element("h1");
    			h10.textContent = "Tranform your brand";
    			t1 = space();
    			p0 = element("p");
    			p0.textContent = "We are a full-service creative agency specializing in helping brands\r\n        grow fast. Engage your clients through compelling visuals that do most\r\n        of the marketing for you.";
    			t3 = space();
    			h30 = element("h3");
    			h30.textContent = "LEARN MORE";
    			t5 = space();
    			section1 = element("section");
    			img0 = element("img");
    			t6 = space();
    			div1 = element("div");
    			section2 = element("section");
    			img1 = element("img");
    			t7 = space();
    			section3 = element("section");
    			h11 = element("h1");
    			h11.textContent = "Stand out to the right audience";
    			t9 = space();
    			p1 = element("p");
    			p1.textContent = "Using a collaborative formula of designers, researchers, photographers,\r\n        videographers, and copywriters, we’ll build and extend your brand in\r\n        digital places.";
    			t11 = space();
    			h31 = element("h3");
    			h31.textContent = "LEARN MORE";
    			t13 = space();
    			div2 = element("div");
    			section4 = element("section");
    			img2 = element("img");
    			t14 = space();
    			article0 = element("article");
    			h12 = element("h1");
    			h12.textContent = "Graphic design";
    			t16 = space();
    			p2 = element("p");
    			p2.textContent = "Great design makes you memorable. We deliver artwork that underscores\r\n          your brand message and captures potential clients’ attention.";
    			t18 = space();
    			section5 = element("section");
    			img3 = element("img");
    			t19 = space();
    			article1 = element("article");
    			h13 = element("h1");
    			h13.textContent = "Photography";
    			t21 = space();
    			p3 = element("p");
    			p3.textContent = "Increase your credibility by getting the most stunning, high-quality\r\n          photos that improve your business image.";
    			attr_dev(h10, "class", "transform svelte-1am7kiz");
    			add_location(h10, file$4, 6, 6, 110);
    			attr_dev(p0, "class", "svelte-1am7kiz");
    			add_location(p0, file$4, 7, 6, 164);
    			attr_dev(h30, "class", "svelte-1am7kiz");
    			add_location(h30, file$4, 13, 6, 382);
    			attr_dev(section0, "class", "gridInnerShell content svelte-1am7kiz");
    			add_location(section0, file$4, 5, 4, 62);
    			if (!src_url_equal(img0.src, img0_src_value = "./image-transform.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-1am7kiz");
    			add_location(img0, file$4, 16, 6, 463);
    			attr_dev(section1, "class", "gridInnerShell svelte-1am7kiz");
    			add_location(section1, file$4, 15, 4, 423);
    			attr_dev(div0, "class", "gridShell svelte-1am7kiz");
    			add_location(div0, file$4, 4, 2, 33);
    			if (!src_url_equal(img1.src, img1_src_value = "./image-stand-out.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-1am7kiz");
    			add_location(img1, file$4, 21, 6, 604);
    			attr_dev(section2, "class", "gridInnerShell svelte-1am7kiz");
    			add_location(section2, file$4, 20, 4, 564);
    			attr_dev(h11, "class", "standOut svelte-1am7kiz");
    			add_location(h11, file$4, 24, 6, 716);
    			attr_dev(p1, "class", "svelte-1am7kiz");
    			add_location(p1, file$4, 25, 6, 781);
    			attr_dev(h31, "class", "svelte-1am7kiz");
    			add_location(h31, file$4, 31, 6, 990);
    			attr_dev(section3, "class", "gridInnerShell content svelte-1am7kiz");
    			add_location(section3, file$4, 23, 4, 668);
    			attr_dev(div1, "class", "gridShell svelte-1am7kiz");
    			add_location(div1, file$4, 19, 2, 535);
    			if (!src_url_equal(img2.src, img2_src_value = "./image-graphic-design.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "cherry");
    			attr_dev(img2, "class", "svelte-1am7kiz");
    			add_location(img2, file$4, 36, 6, 1123);
    			attr_dev(h12, "class", "svelte-1am7kiz");
    			add_location(h12, file$4, 38, 8, 1223);
    			attr_dev(p2, "class", "svelte-1am7kiz");
    			add_location(p2, file$4, 39, 8, 1256);
    			attr_dev(article0, "class", "cardContent svelte-1am7kiz");
    			add_location(article0, file$4, 37, 6, 1184);
    			attr_dev(section4, "class", "gridInnerShell card firstCard svelte-1am7kiz");
    			add_location(section4, file$4, 35, 4, 1068);
    			if (!src_url_equal(img3.src, img3_src_value = "./image-photography.jpg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "orange");
    			attr_dev(img3, "class", "svelte-1am7kiz");
    			add_location(img3, file$4, 46, 6, 1523);
    			attr_dev(h13, "class", "svelte-1am7kiz");
    			add_location(h13, file$4, 48, 8, 1620);
    			attr_dev(p3, "class", "svelte-1am7kiz");
    			add_location(p3, file$4, 49, 8, 1650);
    			attr_dev(article1, "class", "cardContent svelte-1am7kiz");
    			add_location(article1, file$4, 47, 6, 1581);
    			attr_dev(section5, "class", "gridInnerShell card secondCard svelte-1am7kiz");
    			add_location(section5, file$4, 45, 4, 1467);
    			attr_dev(div2, "class", "gridShell svelte-1am7kiz");
    			add_location(div2, file$4, 34, 2, 1039);
    			attr_dev(main, "class", "svelte-1am7kiz");
    			add_location(main, file$4, 3, 0, 23);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div0);
    			append_dev(div0, section0);
    			append_dev(section0, h10);
    			append_dev(section0, t1);
    			append_dev(section0, p0);
    			append_dev(section0, t3);
    			append_dev(section0, h30);
    			append_dev(div0, t5);
    			append_dev(div0, section1);
    			append_dev(section1, img0);
    			append_dev(main, t6);
    			append_dev(main, div1);
    			append_dev(div1, section2);
    			append_dev(section2, img1);
    			append_dev(div1, t7);
    			append_dev(div1, section3);
    			append_dev(section3, h11);
    			append_dev(section3, t9);
    			append_dev(section3, p1);
    			append_dev(section3, t11);
    			append_dev(section3, h31);
    			append_dev(main, t13);
    			append_dev(main, div2);
    			append_dev(div2, section4);
    			append_dev(section4, img2);
    			append_dev(section4, t14);
    			append_dev(section4, article0);
    			append_dev(article0, h12);
    			append_dev(article0, t16);
    			append_dev(article0, p2);
    			append_dev(div2, t18);
    			append_dev(div2, section5);
    			append_dev(section5, img3);
    			append_dev(section5, t19);
    			append_dev(section5, article1);
    			append_dev(article1, h13);
    			append_dev(article1, t21);
    			append_dev(article1, p3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$4.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$4($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Grid', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Grid> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Grid extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$4, create_fragment$4, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Grid",
    			options,
    			id: create_fragment$4.name
    		});
    	}
    }

    /* src\Testimonial.svelte generated by Svelte v3.59.2 */

    const file$3 = "src\\Testimonial.svelte";

    function create_fragment$3(ctx) {
    	let main;
    	let h2;
    	let t1;
    	let div6;
    	let section0;
    	let div0;
    	let span0;
    	let img0;
    	let img0_src_value;
    	let t2;
    	let p0;
    	let t4;
    	let div1;
    	let h30;
    	let t6;
    	let h50;
    	let t8;
    	let section1;
    	let div2;
    	let span1;
    	let img1;
    	let img1_src_value;
    	let t9;
    	let p1;
    	let t11;
    	let div3;
    	let h31;
    	let t13;
    	let h51;
    	let t15;
    	let section2;
    	let div4;
    	let span2;
    	let img2;
    	let img2_src_value;
    	let t16;
    	let p2;
    	let t18;
    	let div5;
    	let h32;
    	let t20;
    	let h52;

    	const block = {
    		c: function create() {
    			main = element("main");
    			h2 = element("h2");
    			h2.textContent = "Client testimonials";
    			t1 = space();
    			div6 = element("div");
    			section0 = element("section");
    			div0 = element("div");
    			span0 = element("span");
    			img0 = element("img");
    			t2 = space();
    			p0 = element("p");
    			p0.textContent = "We put our trust in Sunnyside and they delivered, making sure our needs\r\n        were met and deadlines were always hit.";
    			t4 = space();
    			div1 = element("div");
    			h30 = element("h3");
    			h30.textContent = "Emily R.";
    			t6 = space();
    			h50 = element("h5");
    			h50.textContent = "Marketing Director";
    			t8 = space();
    			section1 = element("section");
    			div2 = element("div");
    			span1 = element("span");
    			img1 = element("img");
    			t9 = space();
    			p1 = element("p");
    			p1.textContent = "Sunnyside’s enthusiasm coupled with their keen interest in our brand’s\r\n        success made it a satisfying and enjoyable experience.";
    			t11 = space();
    			div3 = element("div");
    			h31 = element("h3");
    			h31.textContent = "Thomas S.";
    			t13 = space();
    			h51 = element("h5");
    			h51.textContent = "Chief Operating Officer";
    			t15 = space();
    			section2 = element("section");
    			div4 = element("div");
    			span2 = element("span");
    			img2 = element("img");
    			t16 = space();
    			p2 = element("p");
    			p2.textContent = "Incredible end result! Our sales increased over 400% when we worked with\r\n        Sunnyside. Highly recommended!";
    			t18 = space();
    			div5 = element("div");
    			h32 = element("h3");
    			h32.textContent = "Jennie F.";
    			t20 = space();
    			h52 = element("h5");
    			h52.textContent = "Business Owner";
    			attr_dev(h2, "class", "svelte-1fzsups");
    			add_location(h2, file$3, 3, 2, 31);
    			if (!src_url_equal(img0.src, img0_src_value = "./image-emily.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-1fzsups");
    			add_location(img0, file$3, 7, 14, 168);
    			attr_dev(span0, "class", "svelte-1fzsups");
    			add_location(span0, file$3, 7, 8, 162);
    			attr_dev(div0, "class", "pfp svelte-1fzsups");
    			add_location(div0, file$3, 6, 6, 135);
    			attr_dev(p0, "class", "svelte-1fzsups");
    			add_location(p0, file$3, 9, 6, 235);
    			attr_dev(h30, "class", "name svelte-1fzsups");
    			add_location(h30, file$3, 14, 8, 418);
    			attr_dev(h50, "class", "position svelte-1fzsups");
    			add_location(h50, file$3, 15, 8, 458);
    			attr_dev(div1, "class", "nEtPos svelte-1fzsups");
    			add_location(div1, file$3, 13, 6, 388);
    			attr_dev(section0, "class", "innerShell svelte-1fzsups");
    			add_location(section0, file$3, 5, 4, 99);
    			if (!src_url_equal(img1.src, img1_src_value = "./image-thomas.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-1fzsups");
    			add_location(img1, file$3, 21, 10, 619);
    			attr_dev(span1, "class", "svelte-1fzsups");
    			add_location(span1, file$3, 20, 8, 601);
    			attr_dev(div2, "class", "pfp svelte-1fzsups");
    			add_location(div2, file$3, 19, 6, 574);
    			attr_dev(p1, "class", "svelte-1fzsups");
    			add_location(p1, file$3, 24, 6, 697);
    			attr_dev(h31, "class", "name svelte-1fzsups");
    			add_location(h31, file$3, 29, 8, 894);
    			attr_dev(h51, "class", "position svelte-1fzsups");
    			add_location(h51, file$3, 30, 8, 935);
    			attr_dev(div3, "class", "nEtPos svelte-1fzsups");
    			add_location(div3, file$3, 28, 6, 864);
    			attr_dev(section1, "class", "innerShell svelte-1fzsups");
    			add_location(section1, file$3, 18, 4, 538);
    			if (!src_url_equal(img2.src, img2_src_value = "./image-jennie.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			attr_dev(img2, "class", "svelte-1fzsups");
    			add_location(img2, file$3, 36, 10, 1101);
    			attr_dev(span2, "class", "svelte-1fzsups");
    			add_location(span2, file$3, 35, 8, 1083);
    			attr_dev(div4, "class", "pfp svelte-1fzsups");
    			add_location(div4, file$3, 34, 6, 1056);
    			attr_dev(p2, "class", "svelte-1fzsups");
    			add_location(p2, file$3, 39, 6, 1179);
    			attr_dev(h32, "class", "name svelte-1fzsups");
    			add_location(h32, file$3, 44, 8, 1354);
    			attr_dev(h52, "class", "position svelte-1fzsups");
    			add_location(h52, file$3, 45, 8, 1395);
    			attr_dev(div5, "class", "nEtPos svelte-1fzsups");
    			add_location(div5, file$3, 43, 6, 1324);
    			attr_dev(section2, "class", "innerShell svelte-1fzsups");
    			add_location(section2, file$3, 33, 4, 1020);
    			attr_dev(div6, "class", "testimonialShell svelte-1fzsups");
    			add_location(div6, file$3, 4, 2, 63);
    			attr_dev(main, "class", "svelte-1fzsups");
    			add_location(main, file$3, 2, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, h2);
    			append_dev(main, t1);
    			append_dev(main, div6);
    			append_dev(div6, section0);
    			append_dev(section0, div0);
    			append_dev(div0, span0);
    			append_dev(span0, img0);
    			append_dev(section0, t2);
    			append_dev(section0, p0);
    			append_dev(section0, t4);
    			append_dev(section0, div1);
    			append_dev(div1, h30);
    			append_dev(div1, t6);
    			append_dev(div1, h50);
    			append_dev(div6, t8);
    			append_dev(div6, section1);
    			append_dev(section1, div2);
    			append_dev(div2, span1);
    			append_dev(span1, img1);
    			append_dev(section1, t9);
    			append_dev(section1, p1);
    			append_dev(section1, t11);
    			append_dev(section1, div3);
    			append_dev(div3, h31);
    			append_dev(div3, t13);
    			append_dev(div3, h51);
    			append_dev(div6, t15);
    			append_dev(div6, section2);
    			append_dev(section2, div4);
    			append_dev(div4, span2);
    			append_dev(span2, img2);
    			append_dev(section2, t16);
    			append_dev(section2, p2);
    			append_dev(section2, t18);
    			append_dev(section2, div5);
    			append_dev(div5, h32);
    			append_dev(div5, t20);
    			append_dev(div5, h52);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$3.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$3($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Testimonial', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Testimonial> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Testimonial extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$3, create_fragment$3, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Testimonial",
    			options,
    			id: create_fragment$3.name
    		});
    	}
    }

    /* src\FlexBox.svelte generated by Svelte v3.59.2 */

    const file$2 = "src\\FlexBox.svelte";

    function create_fragment$2(ctx) {
    	let main;
    	let div2;
    	let div0;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div1;
    	let img1;
    	let img1_src_value;
    	let t1;
    	let div5;
    	let div3;
    	let img2;
    	let img2_src_value;
    	let t2;
    	let div4;
    	let img3;
    	let img3_src_value;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div2 = element("div");
    			div0 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div1 = element("div");
    			img1 = element("img");
    			t1 = space();
    			div5 = element("div");
    			div3 = element("div");
    			img2 = element("img");
    			t2 = space();
    			div4 = element("div");
    			img3 = element("img");
    			if (!src_url_equal(img0.src, img0_src_value = "./image-gallery-milkbottles.jpg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-bw355b");
    			add_location(img0, file$2, 5, 6, 109);
    			attr_dev(div0, "class", "innerShell svelte-bw355b");
    			add_location(div0, file$2, 4, 4, 77);
    			if (!src_url_equal(img1.src, img1_src_value = "./image-gallery-orange.jpg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "");
    			attr_dev(img1, "class", "svelte-bw355b");
    			add_location(img1, file$2, 8, 6, 211);
    			attr_dev(div1, "class", "innerShell svelte-bw355b");
    			add_location(div1, file$2, 7, 4, 179);
    			attr_dev(div2, "class", "nutShell svelte-bw355b");
    			add_location(div2, file$2, 3, 2, 49);
    			if (!src_url_equal(img2.src, img2_src_value = "./image-gallery-cone.jpg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "");
    			attr_dev(img2, "class", "svelte-bw355b");
    			add_location(img2, file$2, 13, 6, 344);
    			attr_dev(div3, "class", "innerShell svelte-bw355b");
    			add_location(div3, file$2, 12, 4, 312);
    			if (!src_url_equal(img3.src, img3_src_value = "./image-gallery-sugarcubes.jpg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "");
    			attr_dev(img3, "class", "svelte-bw355b");
    			add_location(img3, file$2, 16, 6, 439);
    			attr_dev(div4, "class", "innerShell svelte-bw355b");
    			add_location(div4, file$2, 15, 4, 407);
    			attr_dev(div5, "class", "nutShell svelte-bw355b");
    			add_location(div5, file$2, 11, 2, 284);
    			attr_dev(main, "class", "mainShell svelte-bw355b");
    			add_location(main, file$2, 2, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div2);
    			append_dev(div2, div0);
    			append_dev(div0, img0);
    			append_dev(div2, t0);
    			append_dev(div2, div1);
    			append_dev(div1, img1);
    			append_dev(main, t1);
    			append_dev(main, div5);
    			append_dev(div5, div3);
    			append_dev(div3, img2);
    			append_dev(div5, t2);
    			append_dev(div5, div4);
    			append_dev(div4, img3);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$2.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$2($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('FlexBox', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<FlexBox> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class FlexBox extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$2, create_fragment$2, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "FlexBox",
    			options,
    			id: create_fragment$2.name
    		});
    	}
    }

    /* src\Footer.svelte generated by Svelte v3.59.2 */

    const file$1 = "src\\Footer.svelte";

    function create_fragment$1(ctx) {
    	let main;
    	let div1;
    	let img0;
    	let img0_src_value;
    	let t0;
    	let div0;
    	let a0;
    	let t2;
    	let a1;
    	let t4;
    	let a2;
    	let t6;
    	let div2;
    	let img1;
    	let img1_src_value;
    	let t7;
    	let img2;
    	let img2_src_value;
    	let t8;
    	let img3;
    	let img3_src_value;
    	let t9;
    	let img4;
    	let img4_src_value;

    	const block = {
    		c: function create() {
    			main = element("main");
    			div1 = element("div");
    			img0 = element("img");
    			t0 = space();
    			div0 = element("div");
    			a0 = element("a");
    			a0.textContent = "About";
    			t2 = space();
    			a1 = element("a");
    			a1.textContent = "Services";
    			t4 = space();
    			a2 = element("a");
    			a2.textContent = "Projects";
    			t6 = space();
    			div2 = element("div");
    			img1 = element("img");
    			t7 = space();
    			img2 = element("img");
    			t8 = space();
    			img3 = element("img");
    			t9 = space();
    			img4 = element("img");
    			if (!src_url_equal(img0.src, img0_src_value = "./logo.svg")) attr_dev(img0, "src", img0_src_value);
    			attr_dev(img0, "alt", "");
    			attr_dev(img0, "class", "svelte-14kw0bc");
    			add_location(img0, file$1, 4, 4, 83);
    			attr_dev(a0, "href", "#");
    			attr_dev(a0, "class", "svelte-14kw0bc");
    			add_location(a0, file$1, 6, 6, 151);
    			attr_dev(a1, "href", "#");
    			attr_dev(a1, "class", "svelte-14kw0bc");
    			add_location(a1, file$1, 7, 6, 180);
    			attr_dev(a2, "href", "#");
    			attr_dev(a2, "class", "svelte-14kw0bc");
    			add_location(a2, file$1, 8, 6, 212);
    			attr_dev(div0, "class", "linkShell svelte-14kw0bc");
    			add_location(div0, file$1, 5, 4, 120);
    			attr_dev(div1, "class", "innerShell iS1 svelte-14kw0bc");
    			add_location(div1, file$1, 3, 2, 49);
    			if (!src_url_equal(img1.src, img1_src_value = "./icon-facebook.svg")) attr_dev(img1, "src", img1_src_value);
    			attr_dev(img1, "alt", "facebook logo");
    			attr_dev(img1, "class", "svelte-14kw0bc");
    			add_location(img1, file$1, 12, 4, 296);
    			if (!src_url_equal(img2.src, img2_src_value = "./icon-instagram.svg")) attr_dev(img2, "src", img2_src_value);
    			attr_dev(img2, "alt", "facebook logo");
    			attr_dev(img2, "class", "svelte-14kw0bc");
    			add_location(img2, file$1, 13, 4, 355);
    			if (!src_url_equal(img3.src, img3_src_value = "./icon-twitter.svg")) attr_dev(img3, "src", img3_src_value);
    			attr_dev(img3, "alt", "facebook logo");
    			attr_dev(img3, "class", "svelte-14kw0bc");
    			add_location(img3, file$1, 14, 4, 415);
    			if (!src_url_equal(img4.src, img4_src_value = "./icon-pinterest.svg")) attr_dev(img4, "src", img4_src_value);
    			attr_dev(img4, "alt", "facebook logo");
    			attr_dev(img4, "class", "svelte-14kw0bc");
    			add_location(img4, file$1, 15, 4, 473);
    			attr_dev(div2, "class", "innerShell iS2 svelte-14kw0bc");
    			add_location(div2, file$1, 11, 2, 262);
    			attr_dev(main, "class", "mainShell svelte-14kw0bc");
    			add_location(main, file$1, 2, 0, 21);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			append_dev(main, div1);
    			append_dev(div1, img0);
    			append_dev(div1, t0);
    			append_dev(div1, div0);
    			append_dev(div0, a0);
    			append_dev(div0, t2);
    			append_dev(div0, a1);
    			append_dev(div0, t4);
    			append_dev(div0, a2);
    			append_dev(main, t6);
    			append_dev(main, div2);
    			append_dev(div2, img1);
    			append_dev(div2, t7);
    			append_dev(div2, img2);
    			append_dev(div2, t8);
    			append_dev(div2, img3);
    			append_dev(div2, t9);
    			append_dev(div2, img4);
    		},
    		p: noop,
    		i: noop,
    		o: noop,
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment$1.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance$1($$self, $$props) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('Footer', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<Footer> was created with unknown prop '${key}'`);
    	});

    	return [];
    }

    class Footer extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance$1, create_fragment$1, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "Footer",
    			options,
    			id: create_fragment$1.name
    		});
    	}
    }

    /* src\App.svelte generated by Svelte v3.59.2 */
    const file = "src\\App.svelte";

    function create_fragment(ctx) {
    	let main;
    	let hero;
    	let t0;
    	let grid;
    	let t1;
    	let testimonial;
    	let t2;
    	let flexbox;
    	let t3;
    	let footer;
    	let current;
    	hero = new Hero({ $$inline: true });
    	grid = new Grid({ $$inline: true });
    	testimonial = new Testimonial({ $$inline: true });
    	flexbox = new FlexBox({ $$inline: true });
    	footer = new Footer({ $$inline: true });

    	const block = {
    		c: function create() {
    			main = element("main");
    			create_component(hero.$$.fragment);
    			t0 = space();
    			create_component(grid.$$.fragment);
    			t1 = space();
    			create_component(testimonial.$$.fragment);
    			t2 = space();
    			create_component(flexbox.$$.fragment);
    			t3 = space();
    			create_component(footer.$$.fragment);
    			attr_dev(main, "class", "svelte-hz0lfk");
    			add_location(main, file, 8, 0, 223);
    		},
    		l: function claim(nodes) {
    			throw new Error("options.hydrate only works if the component was compiled with the `hydratable: true` option");
    		},
    		m: function mount(target, anchor) {
    			insert_dev(target, main, anchor);
    			mount_component(hero, main, null);
    			append_dev(main, t0);
    			mount_component(grid, main, null);
    			append_dev(main, t1);
    			mount_component(testimonial, main, null);
    			append_dev(main, t2);
    			mount_component(flexbox, main, null);
    			append_dev(main, t3);
    			mount_component(footer, main, null);
    			current = true;
    		},
    		p: noop,
    		i: function intro(local) {
    			if (current) return;
    			transition_in(hero.$$.fragment, local);
    			transition_in(grid.$$.fragment, local);
    			transition_in(testimonial.$$.fragment, local);
    			transition_in(flexbox.$$.fragment, local);
    			transition_in(footer.$$.fragment, local);
    			current = true;
    		},
    		o: function outro(local) {
    			transition_out(hero.$$.fragment, local);
    			transition_out(grid.$$.fragment, local);
    			transition_out(testimonial.$$.fragment, local);
    			transition_out(flexbox.$$.fragment, local);
    			transition_out(footer.$$.fragment, local);
    			current = false;
    		},
    		d: function destroy(detaching) {
    			if (detaching) detach_dev(main);
    			destroy_component(hero);
    			destroy_component(grid);
    			destroy_component(testimonial);
    			destroy_component(flexbox);
    			destroy_component(footer);
    		}
    	};

    	dispatch_dev("SvelteRegisterBlock", {
    		block,
    		id: create_fragment.name,
    		type: "component",
    		source: "",
    		ctx
    	});

    	return block;
    }

    function instance($$self, $$props, $$invalidate) {
    	let { $$slots: slots = {}, $$scope } = $$props;
    	validate_slots('App', slots, []);
    	const writable_props = [];

    	Object.keys($$props).forEach(key => {
    		if (!~writable_props.indexOf(key) && key.slice(0, 2) !== '$$' && key !== 'slot') console.warn(`<App> was created with unknown prop '${key}'`);
    	});

    	$$self.$capture_state = () => ({ Hero, Grid, Testimonial, FlexBox, Footer });
    	return [];
    }

    class App extends SvelteComponentDev {
    	constructor(options) {
    		super(options);
    		init(this, options, instance, create_fragment, safe_not_equal, {});

    		dispatch_dev("SvelteRegisterComponent", {
    			component: this,
    			tagName: "App",
    			options,
    			id: create_fragment.name
    		});
    	}
    }

    const app = new App({
      target: document.body,
      props: {},
    });

    return app;

})();
//# sourceMappingURL=bundle.js.map
