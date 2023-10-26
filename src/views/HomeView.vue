<template>
  <div class="home">
    <h1>Acceuil</h1>
    <p>
      Bienvenue sur notre plateforme de visualisation de données sur le diabète. Explorez les chiffres, les tendances et les informations cruciales pour mieux comprendre cette condition et prendre des décisions éclairées pour votre santé.
    </p>

    <carousel :per-page="1" :navigation-enabled="true">
      <slide v-for="(image, index) in images" :key="index">
        <img :src="image.src" :alt="'Image ' + (index + 1)">
      </slide>
    </carousel>
  </div>
</template>


<script>
import carousel from 'vue-carousel';

export default {
  components: {
    carousel,
  },
  data() {
    return {
      images: [
        { src: '../assets/logo.png' },
        { src: '../assets/image.png' },
        { src: '../assets/logo.png' },
      ],
    };
  },
};
</script>

<style scoped lang="scss">
img {
  width: 300px;
  height: 200px;
}
</style>
