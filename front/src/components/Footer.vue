<template>
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

            <!--img alt="Vue logo"  class="logo" src="../assets/image.png" style="padding-top: 27px;"/>-->
            <video autoplay muted playsinline loop class="logo">
              <source src="../assets/logoDDvague.mp4" type="video/mp4" >
            </video>
          </div>

          <div class="footer-menu">
            <h2 class="footer-menu-name">AUTRE</h2>
            <ul id="menu-company" class="footer-menu-list">
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <router-link to="/APropos" rel="noopener noreferrer" >À propos</router-link>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-content-column">
          <div class="footer-menu">
            <h2 class="footer-menu-name">SOURCE</h2>
            <ul id="menu-company" class="footer-menu-list">
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <a target="_blank" href="https://www.who.int/fr/news-room/fact-sheets/detail/diabetes">OMS</a>
              </li>
              <li class="menu-item menu-item-type-taxonomy menu-item-object-category">
                <a target="_blank" href="https://ourworldindata.org/grapher/death-rate-from-diabetes?time=latest">Our World in Data</a>
              </li>
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <a target="_blank" href="https://wisevoter.com/country-rankings/cost-of-insulin-by-country/">Wisevoter</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-content-column">
          <div class="footer-menu">
            <h2 class="footer-menu-name">NOTRE ÉQUIPE</h2>
            <ul id="menu-quick-links" class="footer-menu-list">
              <li class="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/EliasKhallouk">Khallouk Elias</a>
              </li>
              <li class="menu-item menu-item-type-custom menu-item-object-custom">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/diarrathiamm">Thiam Mame Diarra</a>
              </li>
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/amajoure-iut90">Majourel Ambre</a>
              </li>
              <li class="menu-item menu-item-type-post_type menu-item-object-page">
                <a target="_blank" rel="noopener noreferrer" href="https://github.com/TheoIUTBM">Vievill Théo</a>
              </li>
            </ul>
          </div>
        </div>
        <div class="footer-content-column">
          <div class="footer-call-to-action">
            <h2 class="footer-call-to-action-title">Voulez-vous voir notre code ?</h2>
            <p class="footer-call-to-action-description"></p>
            <a class="footer-call-to-action-button button" href="https://github.com/EliasKhallouk/DataDiabete" target="_blank">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  </div>
</template>

<script>
export default {
  // eslint-disable-next-line vue/multi-word-component-names
  name: "Footer"
}
</script>

<style scoped>

</style>