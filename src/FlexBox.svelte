<script></script>

<main class="mainShell">
  <div class="nutShell">
    <div class="innerShell">
      <img src="./image-gallery-milkbottles.jpg" alt="" />
    </div>
    <div class="innerShell">
      <img src="./image-gallery-orange.jpg" alt="" />
    </div>
  </div>
  <div class="nutShell">
    <div class="innerShell">
      <img src="./image-gallery-cone.jpg" alt="" />
    </div>
    <div class="innerShell">
      <img src="./image-gallery-sugarcubes.jpg" alt="" />
    </div>
  </div>
</main>

<style>
  .mainShell {
    width: 100%;
    height: 66vh;
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 855px) {
    .mainShell {
      flex-direction: column;
    }
  }

  .nutShell {
    width: 50%;
    height: 100%;
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 855px) {
    .nutShell {
      width: 100%;
    }
  }

  .innerShell {
    width: 50%;
    height: 100%;
  }
  .innerShell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
