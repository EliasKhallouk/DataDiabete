<template>
  <div class="home">
    <div style="position: relative;">
      <div style="position: absolute; z-index: 0; width: 100%">
        <video autoplay muted playsinline loop id="VideoAccueil" class="base-image">
          <source src="../assets/Medical_Background.mp4" type="video/mp4" />
        </video>
      </div>
      <!-- <div style="position: relative; top: 320px; height: 400px; z-index: 1; font-size: 200%">
        <p style="text-align: center; color: #f8edeb;font-size: 64px;" >Le diabète, un problème humain représenté en chiffres</p>
        <p style="text-align: center; color: #f8edeb; margin-bottom: 20px" id="text2" onload="ecritur"></p>
        <a class="a" @click.prevent="scrollToCarousel"> En savoir plus </a>
      </div> -->

      <div style="position:absolute; top: 15vw; z-index: 1;">
        <h1 style="text-align: center; color: white;">Le diabète, un problème humain représenté en chiffres</h1>
        <p class="par1" style="text-align: center; color: #f8edeb; margin-bottom: 20px" id="text2" onload="ecritur"></p>
        <a class="a" @click.prevent="scrollToCarousel"> En savoir plus </a>
      </div>
    </div>

    <div class="gallery" id="carousel">
      <div class="gallery-container" id="gallery-anchor">
        <router-link to="/carte">
        <div class="gallery-item gallery-item-1">
          <img src="../assets/carte2.jpg" alt="Image 1" />
          <span class="image-title">Carte</span>
          <span class="image-text">nombre de décés/pays/année</span>
        </div>
      </router-link>
      <router-link to="/diagramme">
        <div class="gallery-item gallery-item-2">
          <img src="../assets/diagramme.png" alt="Image 2" />
          <span class="image-title">Diagramme</span>
          <span class="image-text">nombre de diabetique/age/pays/sexe</span>
        </div>
      </router-link>
      <router-link to="/histogramme">
        <div class="gallery-item gallery-item-3">
          <img src="../assets/histogramme.jpg" alt="Image 3" />
          <span class="image-title">Histogramme</span>
          <span class="image-text">prix de l'insuline et de l'assurance/pays</span>
        </div>
      </router-link>


      </div>
      <div class="gallery-controls" >
      </div>
    </div>

    <!--<p>
      Dans le monde, <b>10.5%</b> de la population est atteinte du diabète et ce pourcentage ne cesse d’augmenter.
      En effet, les spécialistes prévoient <b>12.2%</b> de diabétique d’ici <b>2045</b>. Cette maladie, si elle n’est pas
      traitée, peut s’avérer mortelle peu importe l’âge, le sexe ou la nationalité.
    </p>-->
    <p class="tete">
      <b style="font-size: 50px;font-style: italic;">10.5%</b> de la population mondiale est atteinte du diabète et ce pourcentage ne cesse d’augmenter.

      En effet, les spécialistes prévoient <b>12.2%</b> de diabétique d’ici <b>2045</b>. Cette maladie, si elle n’est pas
      traitée, peut s’avérer mortelle peu importe l’âge, le sexe ou la nationalité.
    </p>
    <p style="font-size: 44px; margin-top: 150px; margin-bottom: -34px;">Ce que nous proposons :</p>

    <h2>1. Carte mondiale de la mortalité due au diabète</h2>
    <p>
      Explorez notre carte interactive qui illustre visuellement l'impact du diabète à 
      l'échelle mondiale. Cette carte vous montre le nombre de décès attribués au diabète 
      dans chaque pays, vous permettant ainsi de comprendre l'ampleur du problème à l'échelle 
      internationale. Les données sont régulièrement mises à jour pour vous fournir des informations 
      actuelles.
    </p>
    <h2>2. Graphiques comparatifs sur le diabète</h2>
    <p>
      Nous avons créé des graphiques interactifs qui vous permettent de comparer diverses 
      informations liées au diabète. Ces graphiques comprennent des données sur l'âge des 
      personnes touchées par le diabète, leur pays de résidence, leur sexe, et bien plus 
      encore. Ces visualisations vous aident à identifier les tendances et les disparités 
      dans la prévalence du diabète à travers le monde.
    </p>
    <h2>3. Graphique d'histogramme du prix de l'insuline par pays</h2>
    <p>
      L'accès à l'insuline est crucial pour de nombreuses personnes atteintes de diabète. Notre graphique en
      histogramme vous permet de comparer les prix de l'insuline dans différents pays. Cette information peut 
      être vitale pour les personnes atteintes de diabète qui doivent gérer les coûts de leur traitement. Nous 
      nous efforçons de maintenir ces données à jour pour vous aider à prendre des décisions éclairées.
    </p>
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
  //   if (direction.className == 'gallery-controls-précédent'){
  //     this.carouselArray.unshift(this.carouselArray.pop());
  //   }else{
  //     this.carouselArray.push(this.carouselArray.shift());
  //   }
  //   this.updateGallery();
  // }
  setCurrentState(direction) {
  const controlClass = direction.className;
  if (controlClass.includes('gallery-controls-précédent')) {
    this.carouselArray.unshift(this.carouselArray.pop());
  } else if (controlClass.includes('gallery-controls-suivant')) {
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
        const galleryControlsContainer = document.querySelector(".gallery-controls");
        const galleryControls = ["précédent", "suivant"];
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
            const carouselElement = document.getElementById("gallery-anchor ");
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
                .typeString("Bienvenue sur notre plateforme de visualisation de données sur le diabète, regroupées en 3 types de graphique.")
                .pauseFor(500)
                //.deleteChars(8)
                //.typeString("DIABÈTE !")
                /*.pauseFor(500)
                .typeString(
                  "Explorez les chiffres, les tendances et les informations cruciales pour mieux comprendre cette condition et prendre des décisions éclairées pour votre santé."
                )*/
                .pauseFor(100)
                .start();
            app.style.fontSize = "1.5vw";
        },
    },
};




  
</script>

<style scoped lang="scss">

.tete{
  border-radius: 102px;
  background: linear-gradient(225deg, #f0f0f0, #cacaca);
  box-shadow: -37px 37px 47px #8b8b8b, 37px -37px 47px #ffffff;
  line-height: 44px;
  padding: 76px;
}
.base-image {
  height: calc(75vw - 100px);
  position: relative;
  //border-bottom-right-radius: 824px;
  background: linear-gradient(145deg, #e6e6e6, #ffffff);
  box-shadow: 45px 45px 90px #808080, -45px -45px 90px #ffffff;
  margin-top: -4%;
}
.par1 {
  font-size : 3vw;
  margin-top: 45px;
  margin-left: 15%;
  margin-right: 15%;
  text-align: justify;
}

p{
  font-size : 1.5vw;
  margin-top: 45px;
  margin-left: 15%;
  margin-right: 15%;
  text-align: justify;
}
@media screen and (max-width: 1000px) {
  p {
    font-size: 18px; /* Taille de police en pixels pour les écrans plus petits */
  }
}

b{
  font-size : 30px;
  font-weight: bold;
}

h1 {
  font-size : 4vw;
  margin-left : 15%;
  margin-right : 15%;
  font-family : "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic", sans-serif;
}

h2{
  font-size : 2.5vw;
  margin-top: 80px;
  margin-left: 15%;
  margin-right: 15%;
  margin-bottom: -20px;
  text-align: justify;
  font-family : "Avant Garde", Avantgarde, "Century Gothic", CenturyGothic, "AppleGothic",
  sans-serif;
  text-rendering : optimizeLegibility;
}
@media screen and (max-width: 1000px) {
  h2 {
    font-size: 24px; /* Taille de police en pixels pour les écrans plus petits */
  }
}


a {
  text-decoration: none;
  font-size : 2vw;
}
.a {
  --font-color: #fefefe;
  --bg-color: #111;
  --main-color: #fefefe;
  width: 5vw;
  height: 5vw;
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
  width: 100%;
  padding-top: 50vw;
}

.gallery-container{
  align-items: center;
  display: flex;
  height: 600px;
  min-height: 300px;
  margin: 0 auto; 
  max-width: 100%;
  position: relative;
  margin-top:250px;
  z-index: 2;
  overflow: hidden;
}

.gallery-item{
  height: 300px;
  opacity: 0;
  position: absolute;
  overflow: hidden;
  transition:  0.3s ease-in-out;
  width: 330px;
  z-index: 0;
  border-radius: 15px;
  background-size: contain;
  top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
  transform: translate(-50%, -50%);
}

@media only screen and (max-width: 767px) {
.gallery-container{
  margin-top: -100px;
}
}

.gallery-item-1, .gallery-item-3{
  height:70%;
  opacity: 0.8;
  width: 30%;
  z-index: 1;
}
.gallery-item-1{
  left: 20%;
}

.gallery-item-2{
  box-shadow: -2px 5px 30px 6px rgba(0,0,0,0.35);
  height: 85%;
  opacity: 1;
  left: 50%;
  transform: translateX(-50%, -50%);
  width:40%;
  z-index: 2;
  top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
}

.gallery-item-3{
  left: 80%;
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

.gallery-item router-link {
  width: 100%;
  height: 100%;
  object-fit: cover; /* ou 'contain' selon vos besoins */
  border-radius: 15px; /* ajustez selon vos besoins */
  position: relative;
  overflow: hidden;
}


.gallery-controls button:focus {
  outline: none;
}


.gallery-controls-précédent{
  position: relative;
}

.gallery-controls-précédent::before{
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

.gallery-controls-précédent:hover::before{
  border: solid #fff; 
  left: -40px;
}

.gallery-controls-suivant{
  position: relative;
}

.gallery-controls-suivant::before{
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

.gallery-controls-suivant:hover::before{
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

.gallery-item img {
  width: 100%;
  height: 100%;
}

.gallery-item:hover img {
  filter: blur(4px); /* Ajustez la valeur du flou au survol */
}

.image-title {
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 2;
  color: #fff; /* Couleur du texte du titre */
  font-size: 40px; /* Ajustez la taille du texte du titre */
  text-shadow: #3a3939 5px 5px 5px; /* Ombre portée du texte du titre */
}

.image-text {
  margin-top: 50px;
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  opacity: 0;
  transition: opacity 0.3s ease-in-out;
  z-index: 3;
  color: #fff; /* Couleur du texte du titre */
  font-size: 20px; /* Ajustez la taille du texte du titre */
  text-shadow: #3a3939 5px 5px 5px ; /* Ombre portée du texte du titre */
}

.gallery-item:hover .image-title {
  opacity: 1;
}

.gallery-item:hover .image-text {
  opacity: 1;
}


@media (max-width: 1500px) {
  p {
    margin-top: 50px;
    margin-left: 10%;
    margin-right: 10%;
    font-size: 20px;
    //text-align: justify;
  }
  .image-text{
    font-size: 18px;
  }
  .image-title{
    font-size: 30px;
  }
}

@media  (max-width: 1300px) {
  .gallery-item-1, .gallery-item-3{
    height: 50%;
    opacity: 0.8;
    width: 30%;
    z-index: 1;
  }
  .gallery-item-1{
    left: 20%;
  }
  
  .gallery-item-2{
    box-shadow: -2px 5px 33px 6px rgba(0,0,0,0.35);
    height: 60%;
    opacity: 1;
    left: 50%;
    transform: translateX(-50%, -50%);
    width:40%;
    z-index: 2;
    top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
  }
  
  .gallery-item-3{
    left: 80%;
  }
  
}

@media  (max-width: 1100px) {
  .gallery-item-1, .gallery-item-3{
    height: 40%;
    opacity: 0.8;
    width: 30%;
    z-index: 1;
  }
  .gallery-item-1{
    left: 20%;
  }
  
  .gallery-item-2{
    box-shadow: -2px 5px 33px 6px rgba(0,0,0,0.35);
    height: 50%;
    opacity: 1;
    left: 50%;
    transform: translateX(-50%, -50%);
    width:40%;
    z-index: 2;
    top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
  }
  
  .gallery-item-3{
    left: 80%;
  }
  
}

@media  (max-width: 900px) {
  .gallery-item-1, .gallery-item-3{
    height: 30%;
    opacity: 0.8;
    width: 30%;
    z-index: 1;
  }
  .gallery-item-1{
    left: 20%;
  }
  
  .gallery-item-2{
    box-shadow: -2px 5px 33px 6px rgba(0,0,0,0.35);
    height: 40%;
    opacity: 1;
    left: 50%;
    transform: translateX(-50%, -50%);
    width:40%;
    z-index: 2;
    top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
  }
  
  .gallery-item-3{
    left: 80%;
  }

  .image-text{
    font-size: 16px;
  }
  
}

@media  (max-width: 700px) {
  .gallery-item-1, .gallery-item-3{
    height: 20%;
    opacity: 0.8;
    width: 30%;
    z-index: 1;
  }
  .gallery-item-1{
    left: 20%;
  }
  
  .gallery-item-2{
    box-shadow: -2px 5px 33px 6px rgba(0,0,0,0.35);
    height: 30%;
    opacity: 1;
    left: 50%;
    transform: translateX(-50%, -50%);
    width:40%;
    z-index: 2;
    top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
  }
  
  .gallery-item-3{
    left: 80%;
  }

  .image-text{
    font-size: 13px;
    margin-top: 32px;
  }

  .image-title{
    font-size: 20px;
  }
  
}

@media  (max-width: 500px) {
  .gallery-item-1, .gallery-item-3{
    height: 10%;
    opacity: 0.8;
    width: 30%;
    z-index: 1;
  }
  .gallery-item-1{
    left: 20%;
  }
  
  .gallery-item-2{
    box-shadow: -2px 5px 33px 6px rgba(0,0,0,0.35);
    height: 20%;
    opacity: 1;
    left: 50%;
    transform: translateX(-50%, -50%);
    width:40%;
    z-index: 2;
    top: 50%; /* Ajustement de la position verticale à 50% pour centrer */
  }
  
  .gallery-item-3{
    left: 80%;
  }

  .image-text{
    font-size: 12px;
    margin-top: 28px;
  }

  .image-title{
    font-size: 16px;
  }

  .gallery-controls ::v-deep button {
    font-size: 12px;
    margin: 0 10px;
    padding: 6px 8px;
    width: 28%;
  }
}
</style>
