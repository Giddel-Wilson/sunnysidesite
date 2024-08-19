<script>
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;

    if (menuOpen) {
      document.body.style.overflow = "hidden"; // Prevent scrolling
    } else {
      document.body.style.overflow = ""; // Restore scrolling
    }
  }
</script>

<main>
  <div class="logoShell">
    <img src="./logo.svg" alt="sunnyside" class="logo" />
  </div>
  <div class="pointer {menuOpen ? 'open' : ''}"></div>
  <div class="linkShell {menuOpen ? 'open' : ''}">
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Projects</a>
    <a href="#">Contact</a>
  </div>
  <div class="burger" on:click={toggleMenu}>
    <img src="./icon-hamburger.svg" alt="Menu" />
  </div>
</main>

<style>
  main {
    padding: 50px 40px 20px 40px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 10vh;
    width: 100%;
  }

  .linkShell {
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
    gap: 20px;
  }

  @media (max-width: 1024px) {
    .linkShell {
      gap: 15px;
      font-size: small;
    }
  }

  @media (max-width: 768px) {
    main {
      padding: 40px 20px 20px 20px;
    }
    .pointer {
      width: 90vw;
      border: solid 20px transparent;
      border-right-color: #fff;
      position: absolute;
      margin: 10vh auto 0 0;
      z-index: 999;
    }

    .linkShell {
      display: none;
      position: absolute;
      top: 11vh;
      right: 30;
      background: white;
      flex-direction: column;
      align-items: flex-start;
      width: 90vw;
      height: max-content;
      padding: 40px 30px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      z-index: 99;
      align-items: center;
      gap: 20px;
    }

    .pointer {
      display: none;
    }

    .linkShell.open,
    .pointer.open {
      display: flex;
    }

    .burger {
      display: block;
      cursor: pointer;
    }

    .linkShell a {
      margin-bottom: 10px;
    }
  }

  @media only screen and (width <= 380px) {
    .pointer {
      margin: 10vh auto 0 0;
    }
  }

  @media (min-width: 769px) {
    .burger {
      display: none;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  a:hover {
    /* color: whitesmoke; */
    opacity: 90%;
    scale: 1.15;
    gap: 3px;
  }

  @media (max-width: 768px) {
    a {
      text-align: center;
      color: gray;
      font-size: medium;
    }
  }

  a:last-child {
    color: black;
    background-color: white;
    border-radius: 30px;
    padding: 10px 8px;
    font-family: "Abril Fatface";
    font-weight: 100;
    text-transform: uppercase;
    transition: filter 0.3s ease;
  }

  @media (max-width: 768px) {
    a:last-child {
      border-bottom: none;
      background-color: #ffd600;
    }
  }
  a:last-child:hover {
    background-color: #70CFFF;
    color: whitesmoke;
    scale: 1;
    margin: 0;
  }
</style>
