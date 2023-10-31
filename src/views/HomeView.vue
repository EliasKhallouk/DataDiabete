<template>
  <div class="home">
    <h1>Acceuil</h1>
    <p>
      Bienvenue sur notre plateforme de visualisation de données sur le diabète. Explorez
      les chiffres, les tendances et les informations cruciales pour mieux comprendre
      cette condition et prendre des décisions éclairées pour votre santé.
    </p>

    <carousel :per-page="1" :navigation-enabled="true">
      <slide>
        <img src="../assets/bob.png" alt="Image 1" />
      </slide>
      <slide>
        <img src="../assets/image.png" alt="Image 2" />
      </slide>
      <slide>
        <img src="../assets/logo.png" alt="Image 3" />
      </slide>
    </carousel>
    <p>
      Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
      incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud
      exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute
      irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
      pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia
      deserunt mollit anim id est laborum.
    </p>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      images: [
        { src: "@/assets/logo.png" },
        { src: "@/assets/image.png" },
        { src: "@/assets/logo.png" },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
img {
  width: 20%;
  height: 300px;
  margin-top: 50px;
  margin-left: 40%;
  margin-right: 40%;
}
p {
  margin-top: 50px;
  margin-left: 10%;
  margin-right: 10%;
  font-size: 20px;
  text-justify: auto;
}
</style>
