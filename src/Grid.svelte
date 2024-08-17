<script>
</script>

<main>
  <div class="gridShell">
    <section class="gridInnerShell content">
      <h1 class="transform">Tranform your brand</h1>
      <p>
        We are a full-service creative agency specializing in helping brands
        grow fast. Engage your clients through compelling visuals that do most
        of the marketing for you.
      </p>

      <h3>LEARN MORE</h3>
    </section>
    <section class="gridInnerShell">
      <img src="./image-transform.jpg" alt="" />
    </section>
  </div>
  <div class="gridShell">
    <section class="gridInnerShell">
      <img src="./image-stand-out.jpg" alt="" />
    </section>
    <section class="gridInnerShell content">
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
  .gridShell {
    width: 100%;
    height: 90vh;
    display: flex;
    flex-direction: row;
  }
  .gridInnerShell {
    width: 50%;
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
    /* align-items: center; */
  }
  .transform {
    width: 80%;
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
  h3 {
    height: fit-content;
    color: #24303d;
    /* font-size: 30px; */
    text-align: left;
    display: flex;
    justify-content: left;
    align-items: center;
    letter-spacing: 1px;
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
  .card {
    /* border: 2px dashed red; */
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

  .firstCard h1 {
    color: #295951;
  }
  .firstCard p {
    color: #397366;
  }
  .secondCard {
    background-color: #58c7ff;
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
  .cardContent h1 {
    font-size: xx-large;
  }
  .cardContent p {
    text-align: center;
    width: 60%;
    font-size: larger;
    line-height: 30px;
    font-weight: 550;
  }
</style>
