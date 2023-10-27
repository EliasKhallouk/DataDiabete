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
</style>
