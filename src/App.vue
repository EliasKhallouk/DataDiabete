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
  </div>
</template>

<style lang="scss">
body {
  margin: 0;
}
$color-text: #212529;
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
  padding-top: 30px;
  height: 58px;
  background-color: #f8edeb;
  a {
    font-weight: bold;
    color: $color-text;
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
</style>
