<template>
  <div class="home">
    <div style="position: relative; height: 1164px">
      <div style="position: absolute; z-index: 1; width: -webkit-fill-available">
        <video autoplay muted playsinline loop id="VideoAccueil" class="base-image">
          <source src="../assets/Medical_Background.mp4" type="video/mp4" />
        </video>
      </div>
      <div
        style="position: absolute; top: 360px; height: 400px; z-index: 2; font-size: 200%"
      >
        <p style="text-align: center; color: #f8edeb" class="text1">
          Bienvenue sur notre plateforme de visualisation de données sur le diabète.
          Explorez les chiffres, les tendances et les informations cruciales pour mieux
          comprendre cette condition et prendre des décisions éclairées pour votre santé.
        </p>
        <a class="a" @click.prevent="scrollToCarousel"> En savoir plus </a>
      </div>
    </div>

    <div class="carousel-container">
      <carousel :per-page="1" :pagination-enabled="true" id="carousel">
        <slide v-for="(image, index) in carouselImages" :key="index">
          <img :src="image.src" :alt="image.alt" class="carousel-image" />
        </slide>
      </carousel>
    </div>
    <p>
      Le diabète est une condition médicale mondiale en constante croissance, affectant
      des millions de personnes de tous âges, de tous sexes et de tous horizons. Pour
      mieux comprendre et combattre cette maladie, nous sommes fiers de vous présenter un
      site dédié à la collecte et à la visualisation de données ouvertes sur le diabète.
    </p>
    <p style="font-size: xx-large">Ce que nous faisons :</p>
    <p>
      1. Carte Mondiale de la Mortalité due au Diabète Explorez notre carte interactive
      qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte vous
      montre le nombre de décès attribués au diabète dans chaque pays, vous permettant
      ainsi de comprendre l'ampleur du problème à l'échelle internationale. Les données
      sont régulièrement mises à jour pour vous fournir des informations actuelles.
    </p>
    <p>
      2. Graphiques Comparatifs sur le Diabète Nous avons créé des graphiques interactifs
      qui vous permettent de comparer diverses informations liées au diabète. Ces
      graphiques comprennent des données sur l'âge des personnes touchées par le diabète,
      leur pays de résidence, leur sexe, et bien plus encore. Ces visualisations vous
      aident à identifier les tendances et les disparités dans la prévalence du diabète à
      travers le monde.
    </p>
    <p>
      3. Graphique d'Histogramme du Prix de l'Insuline par Pays L'accès à l'insuline est
      crucial pour de nombreuses personnes atteintes de diabète. Notre graphique en
      histogramme vous permet de comparer les prix de l'insuline dans différents pays.
      Cette information peut être vitale pour les personnes atteintes de diabète qui
      doivent gérer les coûts de leur traitement. Nous nous efforçons de maintenir ces
      données à jour pour vous aider à prendre des décisions éclairées.
    </p>

    <p style="font-size: xx-large">Pourquoi nous le faisons :</p>
    <p>
      Notre objectif est de sensibiliser le public au problème mondial du diabète en
      fournissant des informations précises et actuelles. Nous croyons que l'accès à ces
      données est essentiel pour lutter contre le diabète, encourager la recherche et
      améliorer la vie des personnes touchées par cette maladie.
    </p>
    <p>
      Nous espérons que notre site vous aidera à mieux comprendre le diabète, à identifier
      les tendances mondiales et à prendre des décisions éclairées pour vous-même ou vos
      proches. Rejoignez-nous dans notre mission pour faire reculer le diabète et
      améliorer la qualité de vie de millions de personnes dans le monde.
    </p>
    <p>
      Explorez nos graphiques et découvrez le monde du diabète sous un nouvel éclairage.
      Nous vous remercions de votre visite et espérons que vous trouverez ces informations
      utiles et informatives. N'hésitez pas à nous contacter si vous avez des questions ou
      des commentaires.
    </p>
  </div>
</template>

<script>
import { Carousel, Slide } from "vue-carousel";
//import Typewriter from 'typewriter'; // Assurez-vous que le chemin d'importation est correct

export default {
  components: {
    Carousel,
    Slide,
  },
  data() {
    return {
      carouselImages: [
        { src: require("../assets/carte2.jpg"), alt: "Image 1" },
        { src: require("../assets/diagramme.png"), alt: "Image 2" },
        { src: require("../assets/histogramme.png"), alt: "Image 3" },
      ],
    };
  },
  /*mounted() {
    let text1 = document.querySelector(".text1");

    // utilisation de la librairie typeWhriter pour animer le texte de class 'text1'
    var animText = new Typewriter(text1, {
      deleteSpeed: 30, // initialise la vitesse entre chaque lettre de 25ms
    });

    animText
        .changeDelay(30)
        .typeString(
            "Dans une démarche ludique et éducative, notre projet a pour but de vous sensibiliser aux enjeux futurs en matière d'émissions de gaz à effet de serre.\n"
        ) // texte tapé
        .typeString("A cet effet, nous vous proposons une page interactive modélisant des solutions concrètes autour de la sylviculture.");

    // ajoute un évènement sur le scroll de telle sorte que lorsque le haut de la page est égale à la position en y de l'élément text alors l'animation peut commencer
    window.addEventListener("scroll", () => {
      if (window.scrollY >= text1.getBoundingClientRect().y) {
        animText.start();
      }
    });
  },*/
};
</script>

<style scoped lang="scss">
.base-image {
  width: 100%;
  //border-bottom-right-radius: 824px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 45px 45px 90px #808080, -45px -45px 90px #ffffff;
}
p {
  margin-top: 50px;
  margin-left: 15%;
  margin-right: 15%;
  font-size: 20px;
  text-align: justify;
}
h1 {
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic",
    sans-serif;
  font-size: 92px;
  padding: 80px 50px;
  text-align: center;
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
}

a {
  text-decoration: none;
}
.a {
  --font-color: #fefefe;
  --bg-color: #111;
  --main-color: #fefefe;
  width: 120px;
  height: 70px;
  border-radius: 5px;
  border: 2px solid var(--main-color);
  background-color: var(--bg-color);
  box-shadow: 4px 4px var(--main-color);
  font-weight: 600;
  color: var(--font-color);
  cursor: pointer;
  padding: 9px;
}

.a:active {
  box-shadow: 0px 0px var(--main-color);
  transform: translate(3px, 3px);
}

.carousel-container {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
}

.carousel-image {
  width: 100%;
  height: auto;
  border-radius: 15px;
}

/* Additional styles for pagination */
.vue-carousel-pagination {
  position: absolute;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  list-style: none;
  padding: 0;
  margin: 0;
}

.vue-carousel-pagination-item {
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background-color: #888;
  margin-right: 8px;
  cursor: pointer;
  transition: background-color 0.3s;
}

.vue-carousel-pagination-item.active {
  background-color: #333;
}

@media screen and (max-width: 1500px) {
  // img {
  //   width: 25%;
  //   height: 300px;
  //   margin-top: 50px;
  //   margin-left: 25%;
  //   margin-right: 25%;
  // }
  p {
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 20px;
    //text-align: justify;
  }
}
</style>
