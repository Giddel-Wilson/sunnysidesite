<script>
  import Nav from "./Nav.svelte";
</script>

<main>
  <Nav />
  <section class="creativeShell">
    <h1>WE ARE CREATIVE</h1>
    <img src="./image-header.jpg" alt="orange slice with blue background" />
  </section>
</main>

<style>
  main {
    width: 100%;
    height: 100vh;
    background-color: #3dbeff;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    overflow-x: hidden;
  }
  .creativeShell {
    width: 100vw;
    height: 80vh;
    position: relative;
    background-color: transparent;
  }
  h1 {
    width: 100%;
    height: fit-content;
    color: white;
    font-size: 70px;
    letter-spacing: 5px;
    display: flex;
    justify-content: center;
    align-items: center;
    position: absolute;
    top: 0;
    left: 0;
    z-index: 1;
  }

  @media (max-width: 679px) {
    h1 {
      font-size: 60px;
    }
  }

  img {
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    object-fit: cover;
    object-position: bottom;
    position: absolute;
  }
</style>
