<template>
  <div id="app">
    <nav>
      <router-link to="/">Accueil</router-link> |
      <router-link to="/connexion">Connexion</router-link>
    </nav>
    <router-view/>
  </div>
</template>

<style lang="scss">
  $font-family: Helvetica, Arial, sans-serif;
  $color-text: #212529;
  $color-active: #CA2B30;
  $color-hover: #F25C54;

  #app{
      font-family: $font-family;
      color: $color-text;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
      text-align: center;
  }

  nav {
      padding: 30px;

      a{
          font-weight: bold;
          color: $color-text;
          text-decoration: none;
          font-size: 20px;
      }

      a:hover{
          color: $color-hover;
      }

      a.router-link-exact-active{
          color: $color-active;
      }
  }
</style>