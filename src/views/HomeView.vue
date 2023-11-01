<template>
  <div class="home">
    <h1 class="elegantshadow">Data Diabete</h1>
    <p style="text-align: center;">
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
    <p>Le diabète est une condition médicale mondiale en constante croissance, affectant des millions de personnes de tous âges, de tous sexes et de tous horizons. Pour mieux comprendre et combattre cette maladie, nous sommes fiers de vous présenter un site dédié à la collecte et à la visualisation de données ouvertes sur le diabète.
    </p>
    <p style="font-size:xx-large">Ce que nous faisons :</p>
<p>
      1. Carte Mondiale de la Mortalité due au Diabète
      Explorez notre carte interactive qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte vous montre le nombre de décès attribués au diabète dans chaque pays, vous permettant ainsi de comprendre l'ampleur du problème à l'échelle internationale. Les données sont régulièrement mises à jour pour vous fournir des informations actuelles.
</p><p>
      2. Graphiques Comparatifs sur le Diabète
      Nous avons créé des graphiques interactifs qui vous permettent de comparer diverses informations liées au diabète. Ces graphiques comprennent des données sur l'âge des personnes touchées par le diabète, leur pays de résidence, leur sexe, et bien plus encore. Ces visualisations vous aident à identifier les tendances et les disparités dans la prévalence du diabète à travers le monde.
  </p><p>
      3. Graphique d'Histogramme du Prix de l'Insuline par Pays
      L'accès à l'insuline est crucial pour de nombreuses personnes atteintes de diabète. Notre graphique en histogramme vous permet de comparer les prix de l'insuline dans différents pays. Cette information peut être vitale pour les personnes atteintes de diabète qui doivent gérer les coûts de leur traitement. Nous nous efforçons de maintenir ces données à jour pour vous aider à prendre des décisions éclairées.
</p>

    <p style="font-size: xx-large">Pourquoi nous le faisons :</p>
    <p>
      Notre objectif est de sensibiliser le public au problème mondial du diabète en fournissant des informations précises et actuelles. Nous croyons que l'accès à ces données est essentiel pour lutter contre le diabète, encourager la recherche et améliorer la vie des personnes touchées par cette maladie.
    </p><p>
      Nous espérons que notre site vous aidera à mieux comprendre le diabète, à identifier les tendances mondiales et à prendre des décisions éclairées pour vous-même ou vos proches. Rejoignez-nous dans notre mission pour faire reculer le diabète et améliorer la qualité de vie de millions de personnes dans le monde.
  </p><p>
      Explorez nos graphiques et découvrez le monde du diabète sous un nouvel éclairage. Nous vous remercions de votre visite et espérons que vous trouverez ces informations utiles et informatives. N'hésitez pas à nous contacter si vous avez des questions ou des commentaires.
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
  text-align: justify;
}
h1 {
  font-family: "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
  font-size: 92px;
  padding: 80px 50px;
  text-align: center;
  text-transform: uppercase;
  text-rendering: optimizeLegibility;
}

h1.elegantshadow {
  color: #131313;
  background-color: #e7e5e4;
  letter-spacing: 0.15em;
  text-shadow: 1px -1px 0 #767676, -1px 2px 1px #737272, -2px 4px 1px #767474, -3px 6px 1px #787777, -4px 8px 1px #7b7a7a, -5px 10px 1px #7f7d7d, -6px 12px 1px #828181, -7px 14px 1px #868585, -8px 16px 1px #8b8a89, -9px 18px 1px #8f8e8d, -10px 20px 1px #949392, -11px 22px 1px #999897, -12px 24px 1px #9e9c9c, -13px 26px 1px #a3a1a1, -14px 28px 1px #a8a6a6, -15px 30px 1px #adabab, -16px 32px 1px #b2b1b0, -17px 34px 1px #b7b6b5, -18px 36px 1px #bcbbba, -19px 38px 1px #c1bfbf, -20px 40px 1px #c6c4c4, -21px 42px 1px #cbc9c8, -22px 44px 1px #cfcdcd, -23px 46px 1px #d4d2d1, -24px 48px 1px #d8d6d5, -25px 50px 1px #dbdad9, -26px 52px 1px #dfdddc, -27px 54px 1px #e2e0df, -28px 56px 1px #e4e3e2;
}

</style>

