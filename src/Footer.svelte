<script></script>

<main class="mainShell">
  <div class="innerShell iS1">
    <img src="./logo.svg" alt="" />
    <div class="linkShell">
      <a href="#">About</a>
      <a href="#">Services</a>
      <a href="#">Projects</a>
    </div>
  </div>
  <div class="innerShell iS2">
    <img src="./icon-facebook.svg" alt="facebook logo" />
    <img src="./icon-instagram.svg" alt="facebook logo" />
    <img src="./icon-twitter.svg" alt="facebook logo" />
    <img src="./icon-pinterest.svg" alt="facebook logo" />
  </div>
</main>

<style>
  .mainShell {
    width: 100%;
    height: 54vh;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #90d4c5;
    padding: 50px;
  }

  @media (max-width: 855px) {
    .mainShell {
      padding: 80px 50px 50px 50px;
      height: 45vh;
    }
  }

  .innerShell {
    height: 50%;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-weight: 600;
  }
  img,
  a {
    color: #2c7265;
    fill: #2c7265;
  }
  .iS1 {
    flex-direction: column;
    justify-content: space-around;
    align-items: center;
  }
  .iS1 img {
    width: 12em;
    height: auto;
    filter: invert(36%) sepia(91%) saturate(276%) hue-rotate(120deg)
      brightness(67%) contrast(60%);
  }
  .linkShell {
    width: 20vw;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  @media (max-width: 855px) {
    .linkShell {
      width: 60vw;
    }
  }

  @media (max-width: 1026px) {
    .linkShell a {
      font-size: small;
    }
  }

  .iS2 {
    width: 15vw;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
  }

  @media (max-width: 855px) {
    .iS2 {
      width: 50vw;
      font-size: small;
    }
  }

  .iS2 img {
    width: 1.4em;
    height: auto;
  }
</style>
