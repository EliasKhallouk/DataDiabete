<template>
  <div id="app">
    <NavBar />
    <router-view style="min-height: 54vh;"/>
    <Footer/>
  </div>
</template>

<script>
import NavBar from "./components/NavBar";
import Footer from "./components/Footer";

export default {
  components: {
    NavBar,
    Footer
  },
}
</script>

<style lang="scss">
body {
  margin: 0;
  overflow-x: clip;
}
/*$color-text: #212529;
$color-text-titre: white;*/
$color-active: #ca2b30;
//$color-hover: #f25c54;

$color-text: #212529;
$color-text-titre: white;
//$color-active: #A93F55;
$color-hover: #F2545B;
$color-background-black :#212529;
$color-background-broune :#8C5E58;
$color-background-white :#F3F7F0;


.logo {
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
  height: 72px;
  z-index: 100;

  background-color: rgba(33, 37, 41, 0.7);
  backdrop-filter: blur(8px);

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
    padding-top: 25px;
    height: 58px;
    z-index: 100;

    background-color: rgba(25, 50, 60, 0.7);
    backdrop-filter: blur(8px);
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
  background-color: $color-background-black;
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
  color: $color-hover;
}
.button:last-of-type {
  margin-right: 0;
}
.footer-call-to-action-button {
  background-color: $color-active;
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

@media screen and (max-width: 767px) {
}
</style>
