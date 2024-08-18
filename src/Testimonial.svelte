<script></script>

<main>
  <h2>Client testimonials</h2>
  <div class="testimonialShell">
    <section class="innerShell">
      <div class="pfp">
        <span><img src="./image-emily.jpg" alt="" /></span>
      </div>
      <p>
        We put our trust in Sunnyside and they delivered, making sure our needs
        were met and deadlines were always hit.
      </p>
      <div class="nEtPos">
        <h3 class="name">Emily R.</h3>
        <h5 class="position">Marketing Director</h5>
      </div>
    </section>
    <section class="innerShell">
      <div class="pfp">
        <span>
          <img src="./image-thomas.jpg" alt="" />
        </span>
      </div>
      <p>
        Sunnyside’s enthusiasm coupled with their keen interest in our brand’s
        success made it a satisfying and enjoyable experience.
      </p>
      <div class="nEtPos">
        <h3 class="name">Thomas S.</h3>
        <h5 class="position">Chief Operating Officer</h5>
      </div>
    </section>
    <section class="innerShell">
      <div class="pfp">
        <span>
          <img src="./image-jennie.jpg" alt="" />
        </span>
      </div>
      <p>
        Incredible end result! Our sales increased over 400% when we worked with
        Sunnyside. Highly recommended!
      </p>
      <div class="nEtPos">
        <h3 class="name">Jennie F.</h3>
        <h5 class="position">Business Owner</h5>
      </div>
    </section>
  </div>
</main>

<style>
  @import url("https://fonts.googleapis.com/css2?family=Abril+Fatface&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,100;1,200;1,300;1,400;1,500;1,600;1,700;1,800;1,900&display=swap");
  main {
    width: 100%;
    height: 100vh;
    padding: 150px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  @media (max-width: 855px) {
    main {
      padding: 30px 20px 20px 20px;
      height: max-content;
    }
  }

  h2 {
    text-transform: uppercase;
    color: #a5a7a8;
    letter-spacing: 5px;
    margin: 0 0 50px 0;
  }

  @media (max-width: 855px) {
    h2 {
      font-size: x-large;
    }
  }

  .testimonialShell {
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  @media (max-width: 1026px) {
    .testimonialShell {
      flex-direction: column;
    }
  }
  .innerShell {
    width: 33vw;
    height: 100%;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    align-items: center;
    padding: 40px;
  }

  @media (max-width: 1020px) {
    .innerShell {
      width: 10%;
    }
  }

  @media (max-width: 855px) {
    .innerShell {
      width: 100%;
    }
  }

  .innerShell p {
    color: #6d7073;
    font-family: Arial, Helvetica, sans-serif;
    line-height: 1.5em;
    letter-spacing: 1px;
    font-size: medium;
    font-weight: 550;
  }

  @media (max-width: 1026px) {
    .innerShell p {
      font-size: small;
      margin: 20px 0 20px 0;
    }
  }
  .pfp span {
    width: fit-content;
    height: fit-content;
    margin: 10px 0 10px 0;
  }
  .pfp span img {
    border-radius: 100%;
    width: 100px;
    height: auto;
  }
  .nEtPos {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  .name {
    letter-spacing: 1.5px;
  }
  .position {
    font-family: Arial, Helvetica, sans-serif;
    color: #d7d5d2;
    margin: 10px 0 10px 0;
  }
</style>
