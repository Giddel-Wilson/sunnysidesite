<script>
  let menuOpen = false;

  function toggleMenu() {
    menuOpen = !menuOpen;
  }
</script>

<main>
  <div class="logoShell">
    <img src="./logo.svg" alt="sunnyside" class="logo" />
  </div>
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

    .linkShell {
      display: none;
      position: absolute;
      top: 70px;
      right: 20px;
      background: white;
      flex-direction: column;
      align-items: flex-start;
      width: 40vw;
      padding: 15px;
      box-shadow: 0 8px 16px rgba(0, 0, 0, 0.1);
      border-radius: 8px;
      z-index: 99;
    }

    .linkShell.open {
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

  @media (min-width: 769px) {
    .burger {
      display: none;
    }
  }

  a {
    color: white;
    text-decoration: none;
  }

  @media (max-width: 768px) {
    a {
      width: 100%;
      text-align: left;
      color: black;
      border-bottom: 1px solid gray;
      padding: 0 0 10px 0;
    }
  }

  a:last-child {
    color: black;
    background-color: white;
    border-radius: 30px;
    padding: 12px;
    font-family: "Abril Fatface";
    font-weight: 100;
    text-transform: uppercase;
  }

  @media (max-width: 768px) {
    a:last-child {
      border-radius: 0;
      padding: 0;
      font-family: Arial, Helvetica, sans-serif;
      font-weight: 600;
      text-transform: capitalize;
      border-bottom: none;
    }
  }
</style>
