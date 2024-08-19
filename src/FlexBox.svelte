<script></script>

<main class="mainShell">
  <div class="nutShell">
    <div class="innerShell">
      <img src="./image-gallery-milkbottles.jpg" alt="Milk Bottles" />
    </div>
    <div class="innerShell">
      <img src="./image-gallery-orange.jpg" alt="Orange" />
    </div>
  </div>
  <div class="nutShell">
    <div class="innerShell">
      <img src="./image-gallery-cone.jpg" alt="Ice Cream Cone" />
    </div>
    <div class="innerShell">
      <img src="./image-gallery-sugarcubes.jpg" alt="Sugar Cubes" />
    </div>
  </div>
</main>

<style>
  .mainShell {
    display: flex;
    flex-direction: row;
    width: 100%;
    height: 66vh;
  }

  @media (max-width: 855px) {
    .mainShell {
      flex-direction: column;
      height: auto;
    }
  }

  .nutShell {
    display: flex;
    flex-direction: row;
    width: 50%;
    height: 100%;
  }

  @media (max-width: 855px) {
    .nutShell {
      width: 100%;
      height: 50vh;
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
