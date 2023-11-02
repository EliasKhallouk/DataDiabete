<template>
  <div id="app">
    <nav>
      <img alt="Vue logo" src="./assets/image.png" />
      <router-link to="/connexion" style="margin-right: 10%; float: right"
        >Connexion</router-link
      >
      <router-link to="/histogramme" style="margin-right: 50px; float: right"
        >Histogramme</router-link
      >
      <router-link to="/diagramme" style="margin-right: 50px; float: right"
        >Diagramme</router-link
      >
      <router-link to="/carte" style="margin-right: 50px; float: right"
        >Carte</router-link
      >
      <router-link to="/" style="margin-right: 50px; float: right">Accueil</router-link>
    </nav>
    <router-view />
    <div class="pg-footer">
      <footer class="footer">
        <svg
          class="footer-wave-svg"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1200 100"
          preserveAspectRatio="none"
        >
          <path
            class="footer-wave-path"
            d="M851.8,100c125,0,288.3-45,348.2-64V0H0v44c3.7-1,7.3-1.9,11-2.9C80.7,22,151.7,10.8,223.5,6.3C276.7,2.9,330,4,383,9.8 c52.2,5.7,103.3,16.2,153.4,32.8C623.9,71.3,726.8,100,851.8,100z"
          ></path>
        </svg>
        <div class="footer-content">
          <div class="footer-content-column">
            <div class="footer-menu">
              <img alt="Vue logo" src="./assets/image.png" style="padding-top: 27px" />
            </div>
          </div>
          <div class="footer-content-column">
            <div class="footer-menu">
              <h2 class="footer-menu-name">SOURCE</h2>
              <ul id="menu-company" class="footer-menu-list">
                <li class="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">OMS</a>
                </li>
                <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                  <a href="#">Our World in Data</a>
                </li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Wisevoter</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-content-column">
            <div class="footer-menu">
              <h2 class="footer-menu-name">NOTRE EQUIPE</h2>
              <ul id="menu-quick-links" class="footer-menu-list">
                <li class="menu-item menu-item-type-custom menu-item-object-custom">
                  <a target="_blank" rel="noopener noreferrer" href="#">Elias Khallouk</a>
                </li>
                <li class="menu-item menu-item-type-custom menu-item-object-custom">
                  <a target="_blank" rel="noopener noreferrer" href="#">Mame Diarra</a>
                </li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Ambre</a>
                </li>
                <li class="menu-item menu-item-type-post_type menu-item-object-page">
                  <a href="#">Théo</a>
                </li>
              </ul>
            </div>
          </div>
          <div class="footer-content-column">
            <div class="footer-call-to-action">
              <h2 class="footer-call-to-action-title">Vous voulez voir notre code?</h2>
              <p class="footer-call-to-action-description"></p>
              <a class="footer-call-to-action-button button" href="#" target="_self">
                GitHub
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
  overflow-x: clip;
}
$color-text: #212529;
$color-text-titre: white;
$color-active: #ca2b30;
$color-hover: #f25c54;
img {
  width: 150px;
  height: 100px;
  margin-top: -33px;
  margin-left: 10%;
  float: left;
}

@font-face {
  font-family: Poppins;
  src: url(assets/Poppins/Poppins-Medium.ttf);
  font-weight: bold;
}
#app {
  font-family: Poppins;
  color: $color-text;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
}

nav {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  padding-top: 30px;
  height: 58px;
  z-index: 100;
  background-color: #333;
  a {
    font-weight: bold;
    color: $color-text-titre;
    text-decoration: none;
    font-size: 20px;
  }

  a:hover {
    color: $color-hover;
  }

  a.router-link-exact-active {
    color: $color-active;
  }
}

@media screen and (max-width: 1000px) {
  nav {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    padding-top: 30px;
    height: 58px;
    z-index: 100;
    background-color: #333;
    a {
      font-weight: bold;
      color: $color-text-titre;
      text-decoration: none;
      font-size: 20px;
      display: block;
    }

    a:hover {
      color: $color-hover;
    }

    a.router-link-exact-active {
      color: $color-active;
    }
  }
}

.pg-footer {
  font-family: "Roboto", sans-serif;
  bottom: 0;
  width: 100%;
}

.footer {
  background-color: #333;
  color: #fff;
}
.footer-wave-svg {
  background-color: transparent;
  display: block;
  height: 30px;
  position: relative;
  top: -1px;
  width: 100%;
}
.footer-wave-path {
  fill: white;
}

.footer-content {
  margin-left: auto;
  margin-right: auto;
  max-width: 1230px;
  padding: 40px 15px 255px;
  position: relative;
}

.footer-content-column {
  box-sizing: border-box;
  float: left;
  padding-left: 15px;
  padding-right: 15px;
  width: 100%;
  color: #fff;
}

.footer-content-column ul li a {
  color: #fff;
  text-decoration: none;
}

.footer-logo-link {
  display: inline-block;
}
.footer-menu {
  margin-top: 30px;
}

.footer-menu-name {
  color: #f8edeb;
  font-size: 15px;
  font-weight: 900;
  letter-spacing: 0.1em;
  line-height: 18px;
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
}
.footer-menu-list {
  list-style: none;
  margin-bottom: 0;
  margin-top: 10px;
  padding-left: 0;
}
.footer-menu-list li {
  margin-top: 5px;
}

.footer-call-to-action-description {
  color: #fffff2;
  margin-top: 10px;
  margin-bottom: 20px;
}
.footer-call-to-action-button:hover {
  background-color: #fffff2;
  color: #f25c54;
}
.button:last-of-type {
  margin-right: 0;
}
.footer-call-to-action-button {
  background-color: #ca2b30;
  border-radius: 21px;
  color: #fffff2;
  display: inline-block;
  font-size: 11px;
  font-weight: 900;
  letter-spacing: 0.1em;
  line-height: 18px;
  padding: 12px 30px;
  margin: 0 10px 10px 0;
  text-decoration: none;
  text-transform: uppercase;
  transition: background-color 0.2s;
  cursor: pointer;
  position: relative;
}
.footer-call-to-action {
  margin-top: 30px;
}
.footer-call-to-action-title {
  color: #fffff2;
  font-size: 14px;
  font-weight: 900;
  letter-spacing: 0.1em;
  line-height: 18px;
  margin-bottom: 0;
  margin-top: 0;
  text-transform: uppercase;
}
.footer-call-to-action-link-wrapper {
  margin-bottom: 0;
  margin-top: 10px;
  color: #fff;
  text-decoration: none;
}
.footer-call-to-action-link-wrapper a {
  color: #fff;
  text-decoration: none;
}

.footer-social-links {
  bottom: 0;
  height: 54px;
  position: absolute;
  right: 0;
  width: 236px;
}

.footer-social-amoeba-svg {
  height: 54px;
  left: 0;
  display: block;
  position: absolute;
  top: 0;
  width: 236px;
}

.footer-social-amoeba-path {
  fill: #ca2b30;
}

.footer-social-link.linkedin {
  height: 26px;
  left: 3px;
  top: 11px;
  width: 26px;
}

.footer-social-link {
  display: block;
  padding: 10px;
  position: absolute;
}

.hidden-link-text {
  position: absolute;
  clip: rect(1px 1px 1px 1px);
  clip: rect(1px, 1px, 1px, 1px);
  -webkit-clip-path: inset(0px 0px 99.9% 99.9%);
  clip-path: inset(0px 0px 99.9% 99.9%);
  overflow: hidden;
  height: 1px;
  width: 1px;
  padding: 0;
  border: 0;
  top: 50%;
}

.footer-social-icon-svg {
  display: block;
}

.footer-social-icon-path {
  fill: #fffff2;
  transition: fill 0.2s;
}

.footer-social-link.twitter {
  height: 28px;
  left: 62px;
  top: 3px;
  width: 28px;
}

.footer-social-link.youtube {
  height: 24px;
  left: 123px;
  top: 12px;
  width: 24px;
}

.footer-social-link.github {
  height: 34px;
  left: 172px;
  top: 7px;
  width: 34px;
}

/* Media Query For different screens */
@media (min-width: 320px) and (max-width: 479px) {
  /* smartphones, portrait iPhone, portrait 480x320 phones (Android) */
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1230px;
    padding: 40px 15px 1050px;
    position: relative;
  }
}
@media (min-width: 480px) and (max-width: 599px) {
  /* smartphones, Android phones, landscape iPhone */
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1230px;
    padding: 40px 15px 1050px;
    position: relative;
  }
}
@media (min-width: 600px) and (max-width: 800px) {
  /* portrait tablets, portrait iPad, e-readers (Nook/Kindle), landscape 800x480 phones (Android) */
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1230px;
    padding: 40px 15px 1050px;
    position: relative;
  }
}
@media (min-width: 801px) {
  /* tablet, landscape iPad, lo-res laptops ands desktops */
}
@media (min-width: 1025px) {
  /* big landscape tablets, laptops, and desktops */
}
@media (min-width: 1281px) {
  /* hi-res laptops and desktops */
}

@media (min-width: 760px) {
  .footer-content {
    margin-left: auto;
    margin-right: auto;
    max-width: 1230px;
    padding: 40px 15px 225px;
    position: relative;
  }

  .footer-wave-svg {
    height: 50px;
  }

  .footer-content-column {
    width: 24.99%;
  }
}
@media (min-width: 568px) {
  /* .footer-content-column {
      width: 49.99%;
  } */
}
</style>
