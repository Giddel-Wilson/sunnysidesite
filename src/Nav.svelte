<script></script>

<main>
  <div class="logoShell">
    <img src="./logo.svg" alt="sunnyside" class="logo" />
  </div>
  <div class="linkShell">
    <a href="#">About</a>
    <a href="#">Services</a>
    <a href="#">Projects</a>
    <a href="#">CONTACT</a>
  </div>
  <div class="burger">
    <img src="./icon-hamburger.svg" alt="" />
  </div>
</main>

<style>
  main {
    padding: 50px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: 20vh;
    width: 100%;
  }
  
  @media (max-width: 855px) {
    main {
      padding: 50px 35px 50px 35px;
    }
  }

  .linkShell {
    width: 30vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
  }

  @media (max-width: 1070px) {
    .linkShell {
      width: 35vw;
    }
  }

  @media (max-width: 1026px) {
    .linkShell {
      font-size: small;
    }
  }

  @media (max-width: 855px) {
    .linkShell {
      display: none;
    }
  }

  .burger {
    display: none;
  }

  @media (max-width: 855px) {
    .burger {
      display: block;
    }
  }

  a {
    color: white;
  }
  a:last-child {
    color: black;
    background-color: white;
    border-radius: 30px;
    padding: 12px;
    font-family: "Abril Fatface";
    font-weight: 100;
    /* font-weight: 600; */
  }
</style>
