<template>
  <div class="hello">
    <h1>accueil</h1>
    <div class="carousel">
      <div class="carousel-item" :style="carouselStyle(0)">
        <img src="../assets/logo.png" alt="Image 1">
      </div>
      <div class="carousel-item" :style="carouselStyle(1)">
        <img src="../assets/logo.png" alt="Image 2">
      </div>
      <div class="carousel-item" :style="carouselStyle(2)">
        <img src="../assets/logo.png" alt="Image 3">
      </div>
    </div>
    <button @click="prevSlide">Précédent</button>
    <button @click="nextSlide">Suivant</button>
    <p>
      Bienvenue sur notre plateforme de visualisation de données sur le diabète. Explorez les chiffres, les tendances et les informations cruciales pour mieux comprendre cette condition et prendre des décisions éclairées pour votre santé.
    </p>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props: {
    msg: String
  },
  data() {
    return {
      currentIndex: 0
    };
  },
  methods: {
    nextSlide() {
      this.currentIndex = (this.currentIndex + 1) % 3;
    },
    prevSlide() {
      this.currentIndex = (this.currentIndex - 1 + 3) % 3;
    },
    carouselStyle(index) {
      return {
        transform: `translateX(-${index * 100}%)`
      };
    }
  }
};
</script>



<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
$color-black: #212529;

p {
  font-size: 16px;
  color: $color-black;
}

.carousel {
  display: flex;
  overflow: hidden;
  width: 100%;
}

.carousel-item {
  flex: 0 0 100%; /* Permet aux éléments d'occuper toute la largeur du carrousel */
  transition: transform 0.5s; /* Animation de transition */
}

img {
  max-width: 100%;
  height: auto;
}
</style>

