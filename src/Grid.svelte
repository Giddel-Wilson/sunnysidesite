<script>
</script>

<main>
  <div class="gridShell gsEX">
    <section class="gridInnerShell content">
      <h1 class="transform">Tranform your brand</h1>
      <p>
        We are a full-service creative agency specializing in helping brands
        grow fast. Engage your clients through compelling visuals that do most
        of the marketing for you.
      </p>

      <h3>LEARN MORE</h3>
    </section>
    <section class="gridInnerShell transformImg">
      <img class="desktop" src="./image-transform.jpg" alt="" />
      <img class="mobile" src="./image-transform-mobile.jpg" alt="" />
    </section>
  </div>
  <div class="gridShell">
    <section class="gridInnerShell">
      <img class="desktop" src="./image-stand-out.jpg" alt="" />
      <img class="mobile" src="./image-stand-out-mobile.jpg" alt="" />
    </section>
    <section class="gridInnerShell content gridShellContent2">
      <h1 class="standOut">Stand out to the right audience</h1>
      <p>
        Using a collaborative formula of designers, researchers, photographers,
        videographers, and copywriters, we’ll build and extend your brand in
        digital places.
      </p>

      <h3>LEARN MORE</h3>
    </section>
  </div>
  <div class="gridShell">
    <section class="gridInnerShell card firstCard">
      <img src="./image-graphic-design.jpg" alt="cherry" />
      <article class="cardContent">
        <h1>Graphic design</h1>
        <p>
          Great design makes you memorable. We deliver artwork that underscores
          your brand message and captures potential clients’ attention.
        </p>
      </article>
    </section>
    <section class="gridInnerShell card secondCard">
      <img src="./image-photography.jpg" alt="orange" />
      <article class="cardContent">
        <h1>Photography</h1>
        <p>
          Increase your credibility by getting the most stunning, high-quality
          photos that improve your business image.
        </p>
      </article>
    </section>
  </div>
</main>

<style>
  main {
    display: flex;
    flex-direction: column;
    flex-wrap: nowrap;
  }

  @media (max-width: 855px) {
    main {
      height: max-content;
    }
  }

  @media (max-width: 380px) {
    main {
      margin: 170px 0 0 0;
    }
  }

  .gridShell {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: row;
  }

  @media (max-width: 855px) {
    .gridShell {
      height: 100vh;
    }
  }

  @media (max-width: 855px) {
    .gridShell {
      flex-direction: column;
    }
  }

  @media (max-width: 380px) {
    .gridShellContent2 {
      height: 120vh;
    }
  }

  .gsEX {
    flex-direction: row;
  }

  @media (max-width: 855px) {
    .gsEX {
      flex-direction: column-reverse;
    }
  }

  .transformImg {
    padding: 0 0 0 0;
  }

  /* @media (max-width: 855px) {
    .transformImg {
      margin: 300px 0 0 0;
    }
  } */

  .mobile {
    display: none;
  }

  @media (max-width: 855px) {
    .mobile {
      display: block;
    }
  }

  .desktop {
    display: block;
  }

  @media (max-width: 855px) {
    .desktop {
      display: none;
    }
  }

  .gridInnerShell {
    width: 50%;
  }

  @media (max-width: 855px) {
    .gridInnerShell {
      width: 100%;
      height: 50vh;
    }
  }

  .gridInnerShell img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .content {
    padding: 120px;
    display: flex;
    flex-direction: column;
    justify-content: center;
  }

  @media (max-width: 855px) {
    .content {
      padding: 0 30px 0 30px;
      height: 100vh;
    }
  }

  .transform {
    width: 90%;
  }

  @media (max-width: 855px) {
    .transform {
      text-align: center;
    }
  }

  h1 {
    width: 100%;
    height: fit-content;
    color: #24303d;
    font-size: 50px;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 1026px) {
    h1 {
      width: 100%;
      font-size: 40px;
    }
  }

  @media (max-width: 855px) {
    h1 {
      padding: 50px 0 0 0;
    }
  }

  @media (max-width: 855px) {
    .transform {
      font-size: xx-large;
    }
  }

  .standOut {
    width: 35vw;
  }

  @media (max-width: 855px) {
    .standOut {
      width: 100%;
      text-align: center;
      font-size: xx-large;
    }
  }

  h3 {
    height: fit-content;
    color: #24303d;
    text-align: left;
    display: flex;
    justify-content: left;
    align-items: center;
    letter-spacing: 1px;
  }

  @media (max-width: 1026px) {
    h3 {
      width: 100%;
      font-size: medium;
    }
  }

  @media (max-width: 855px) {
    h3 {
      justify-content: center;
      padding: 0 0 50px 0;
    }
  }

  p {
    color: #84828c;
    width: 90%;
    height: fit-content;
    text-align: left;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: medium;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 25px;
    margin: 40px 0 40px 0;
  }

  @media (max-width: 1026px) {
    p {
      width: 100%;
      font-size: 15px;
      margin: 20px 0 20px 0;
    }
  }

  @media (max-width: 855px) {
    p {
      text-align: center;
    }
  }

  .card {
    /* border: 2px dashed red; */
    height: 100%;
    display: flex;
    flex-direction: column-reverse;
    justify-content: end;
    align-items: center;
    position: relative;
  }

  .card img {
    position: absolute;
  }

  .firstCard {
    background-color: #9adbcb;
  }

  @media (max-width: 855px) {
    .firstCard {
      height: 120vh;
    }
  }

  .firstCard h1 {
    color: #295951;
  }
  .firstCard p {
    color: #397366;
  }
  .secondCard {
    background-color: #58c7ff;
  }

  @media (max-width: 855px) {
    .secondCard {
      height: 120vh;
    }
  }
  .secondCard h1 {
    color: #22566f;
  }
  .secondCard p {
    color: #14638c;
  }
  .cardContent {
    display: flex;
    flex-direction: column;
    justify-content: end;
    align-items: center;
    position: absolute;
    /* z-index: 1; */
  }

  /* @media (max-width: 855px) {
    .cardContent {
      margin: 0 0 -30px 0;
    }
  } */

  .cardContent h1 {
    font-size: xx-large;
  }

  @media (max-width: 1026px) {
    .cardContent h1 {
      font-size: x-large;
    }
  }

  @media (max-width: 855px) {
    .cardContent h1 {
      font-size: larger;
    }
  }

  .cardContent p {
    text-align: center;
    width: 60%;
    font-size: larger;
    line-height: 30px;
    font-weight: 550;
  }

  @media (max-width: 1026px) {
    .cardContent p {
      width: 70%;
      font-size: 15px;
    }
  }

  @media (max-width: 855px) {
    .cardContent p {
      font-size: small;
      line-height: 20px;
    }
  }
</style>
