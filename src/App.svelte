<script>
	import Hero from "./Hero.svelte";
  import Grid from "./Grid.svelte";
  import Testimonial from "./Testimonial.svelte";
  import FlexBox from "./FlexBox.svelte";
  import Footer from "./Footer.svelte";
</script>

<main>
	<Hero />
  <Grid />
  <Testimonial />
  <FlexBox />
  <Footer />
</main>

<style>
  main {
    text-align: center;
    margin: 0 auto;
    max-width: none;
  }

  @media (max-width: 1020px) {
    main {
      width: 100vw;
    }
  }
</style>
