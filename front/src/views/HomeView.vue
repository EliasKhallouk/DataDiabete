<template>
  <div class="home">
    <div style="position: relative; height: 1164px">
      <div style="position: absolute; z-index: 0; width: 100%">
        <video autoplay muted playsinline loop id="VideoAccueil" class="base-image">
          <source src="../assets/Medical_Background.mp4" type="video/mp4" />
        </video>
      </div>
      <div style="position: relative; top: 320px; height: 400px; z-index: 1; font-size: 200%">
        <p style="text-align: center; color: #f8edeb;font-size: 64px;" >Le diabète, un problème humain représenté en chiffres</p>
        <p style="text-align: center; color: #f8edeb; margin-bottom: 20px" id="text2" onload="ecritur"></p>
        <a class="a" @click.prevent="scrollToCarousel"> En savoir plus </a>
      </div>
    </div>

    <p>
    Data Diabete est un site internet qui offre des données clés sur le diabète, 
    regroupées en graphique afin de mieux les visualiser :
      <ul>
        <li>Une carte</li>
        <li>Un diagramme</li>
        <li>Un histogramme</li>
        <li>Un questionnaire</li>
      </ul>
    </p>

    <div class="gallery" id="carousel">
      <div class="gallery-container">
        <img class="gallery-item gallery-item-1" src="../assets/carte2.jpg" data-index="1">
        <img class="gallery-item gallery-item-2" src="../assets/diagramme.png" data-index="2">
        <img class="gallery-item gallery-item-3" src="../assets/histogramme.png" data-index="3">
      </div>
      <div class="gallery-controls" >
      </div>
    </div>

    <!--<p>
    Dans le monde, <b>10.5%</b> de la population est atteinte du diabète et ce pourcentage ne cesse d’augmenter. 
    En effet, les spécialistes prévoient <b>12.2%</b> de diabétique d’ici <b>2045</b>. Cette maladie, si elle n’est pas traitée, 
    peut s’avérer mortelle peu importe l’âge, le sexe ou la nationalité. 
    </p>-->
    <!-- <p style="font-size: xx-large">Ce que nous faisons :</p>-->
    <!--<p>
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
    </p>-->
  </div>
</template>

<script>
import Typewriter from "typewriter-effect/dist/core";

class Carousel{
  constructor(container, items, controls){
    this.carouselContainer = container;
    this.carouselControls = controls;
    this.carouselArray = [...items];
  }
  scrollToPrevious() {
    this.carouselArray.unshift(this.carouselArray.pop());
    this.updateGallery();
  }

  scrollToNext() {
    this.carouselArray.push(this.carouselArray.shift());
    this.updateGallery();
  }
  updateGallery(){
    this.carouselArray.forEach(el => {
      el.classList.remove("gallery-item-1");
      el.classList.remove("gallery-item-2");
      el.classList.remove("gallery-item-3");
    });
    this.carouselArray.slice(0, 3).forEach((el, i) => {
      el.classList.add(`gallery-item-${i + 1}`);
    });
  }
  // setCurrentState(direction){
  //   if (direction.className == 'gallery-controls-previous'){
  //     this.carouselArray.unshift(this.carouselArray.pop());
  //   }else{
  //     this.carouselArray.push(this.carouselArray.shift());
  //   }
  //   this.updateGallery();
  // }
  setCurrentState(direction) {
  const controlClass = direction.className;
  if (controlClass.includes('gallery-controls-previous')) {
    this.carouselArray.unshift(this.carouselArray.pop());
  } else if (controlClass.includes('gallery-controls-next')) {
    this.carouselArray.push(this.carouselArray.shift());
  }
  this.updateGallery();
}

  setControls(galleryControlsContainer){
    this.carouselControls.forEach(control => {
      galleryControlsContainer.appendChild(document.createElement("button")).className = `gallery-controls-${control}`;
      document.querySelector(`.gallery-controls-${control}`).innerText = control;
    });
  }
  useControls(galleryControlsContainer){
    const triggers = [...galleryControlsContainer.childNodes];
    triggers.forEach(control => {
      control.addEventListener("click", e => {
        e.preventDefault();
        this.setCurrentState(control);
      });
    });
  }
  handleImageClick(index) {
    if (index === 1) {
      this.carouselArray.unshift(this.carouselArray.pop());
    } else if (index === 3) {
      this.carouselArray.push(this.carouselArray.shift());
    }
    this.updateGallery();
  }

  useImageClicks() {
    this.carouselArray.forEach((el, i) => {
      el.addEventListener("click", () => {
        this.handleImageClick(i + 1);
      });
    });
  }
}

export default {
  mounted() {
    this.ecritur();

    const galleryContainer = document.querySelector(".gallery-container");
    const galleryControlsContainer = document.querySelector(".gallery-controls")
    const galleryControls = ["previous", "next"];
    const galleryItems = document.querySelectorAll(".gallery-item");

    const exampleCarousel = new Carousel(galleryContainer, galleryItems, galleryControls);

    exampleCarousel.setControls(galleryControlsContainer);
    exampleCarousel.useControls(galleryControlsContainer);

    exampleCarousel.useImageClicks();

  },
  data() {
  return {
    carousel: null,
  };
},
  methods: {
    scrollToCarousel() {
      const carouselElement = document.getElementById("carousel");
      if (carouselElement) {
        carouselElement.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      }
    },
    ecritur() {
      var app = document.getElementById("text2");

      var typewriter = new Typewriter(app, {
        //loop: true,
        delay: 50,
      });

      typewriter
        .typeString("Dans le monde, 10.5% de la population est atteinte du diabète et ce pourcentage ne cesse d’augmenter. En effet, les spécialistes prévoient 12.2% de diabétique d’ici 2045. Cette maladie, si elle n’est pas traitée, peut s’avérer mortelle peu importe l’âge, le sexe ou la nationalité.")
        /*.pauseFor(500)
        .deleteChars(8)
        .typeString("DIABÈTE !")
        .pauseFor(500)
        .typeString(
          "Explorez les chiffres, les tendances et les informations cruciales pour mieux comprendre cette condition et prendre des décisions éclairées pour votre santé."
        )*/
        .pauseFor(100)
        .start();
    },
  },
};




  
</script>

<style scoped lang="scss">

.base-image {
  width: 100%;
  //border-bottom-right-radius: 824px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 45px 45px 90px #808080, -45px -45px 90px #ffffff;
  margin-top: -4%;
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

.gallery{
  padding-top: 128px;
  width: 100%;
}

.gallery-container{
  align-items: center;
  display: flex;
  height: 400px;
  margin: 0 auto;
  max-width: 1000px;
  position: relative;
}

.gallery-item{
  height: 200px;
  opacity: 0;
  position: absolute;
  transition: all 0.3s ease-in-out;
  width: 330px;
  z-index: 0;
  border-radius: 15px;
  background-size: contain;
}

.gallery-item-1, .gallery-item-3{
  height: 250px;
  opacity: 0.8;
  width: 380px;
  z-index: 1;
}
.gallery-item-1{
  left: 30%;
  transform: translateX(-50%);
}

.gallery-item-2{
  box-shadow: -2px 5px 33px 6px rgba(0,0,0,0.35);
  height: 300px;
  opacity: 1;
  left: 50%;
  transform: translateX(-50%);
  width: 430px;
  z-index: 2;
}

.gallery-item-3{
  left: 70%;
  transform: translateX(-50%);
}

.gallery-controls{
  display: flex;
  justify-content: center;
  margin: 25px 0;
  height: 100px;
}

.gallery-controls ::v-deep button {
  background-color: transparent;
    border: 2px solid #8b2c2c; // Border color
    border-radius: 5px;
    color: #8b2c2c; // Text color
    cursor: pointer;
    font-size: 20px; // Adjust font size as needed
    margin: 0 20px; // Adjust spacing as needed
    padding: 6px 8px; // Adjust padding as needed
    text-transform: capitalize;
    width: 28%;

  &:hover {
    background-color: #8b2c2c; // Background color on hover
    color: #ffffff; // Text color on hover
  }
}

.gallery-controls button:focus {
  outline: none;
}


.gallery-controls-previous{
  position: relative;
}

.gallery-controls-previous::before{
  border: solid #8b2c2c;
  border-width: 0 5px 5px 0;
  content: "";
  display: inline-block;
  height: 5px;
  left: -30px;
  padding: 10px;
  position: absolute;
  top: 25%;
  transform: rotate(135deg) translateY(-50%);
  transition: left 0.15s ease-in-out;
  width: 5px;
}

.gallery-controls-previous:hover::before{
  border: solid #fff; 
  left: -40px;
}

.gallery-controls-next{
  position: relative;
}

.gallery-controls-next::before{
  border: solid #8b2c2c;
  border-width: 0 5px 5px 0;
  content: "";
  display: inline-block;
  height: 5px;
  padding: 10px;
  position: absolute;
  right: -30px;
  top: 45;
  transform: rotate(-45deg) translateY(-50%);
  transition: right 0.15s ease-in-out;
  width: 5px;
}

.gallery-controls-next:hover::before{
  border: solid #fff; 
  right: -40px;
}

.gallery-nav{
  bottom: -15px;
  display: flex;
  justify-content: center;
  list-style: none;
  padding: 0;
  position: absolute;
  width: 100%;
}

.gallery-nav li{
  background-color: #8b2c2c;
  border-radius: 50%;
  height: 10px;
  margin: 0 16px;
  width: 10px;
}

.gallery-nav li.gallery-item-selected{
  background-color: #555;
}


@media screen and (max-width: 1500px) {
  p {
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 20px;
    //text-align: justify;
  }
}
</style>
