<template>
  <nav>
    <img alt="Vue logo" class="logo" src="../assets/logoDDfixe.png"/>
    <div class="menu-icon" @click="toggleMenu">Menu</div>
    <div class="nav-links" :class="{ 'show-menu': isMenuOpen }" @mouseleave="closeMenu">
      <router-link to="/connexion">Connexion</router-link>
      <router-link to="/inscription">Inscription</router-link>
      <router-link to="/histogramme">Histogramme</router-link>
      <router-link to="/diagramme">Diagramme</router-link>
      <router-link to="/carte">Carte</router-link>
      <router-link to="/info-perso">Informations personnelles</router-link>
      <router-link to="/gestion-utilisateur">Gestion utilisateurs</router-link>
      <router-link to="/validation-donnee">Validation données</router-link>
      <a href="" class="logout-link" onclick="return confirm('Are you sure?')">Déconnexion</a>
      <router-link to="/">Accueil</router-link>
    </div>
  </nav>
</template>

<script>
export default {
  name: "NavBar",
  data() {
    return {
      isMenuOpen: false,
    };
  },
  methods: {
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
  },
};
</script>

<style scoped>


button:hover {
  color: red;
  background-color: white;
  border: 2px solid red;
}

nav {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
}

.logo{
  margin-top: 1px;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  margin-right: 5%;
}

nav a {
  margin-right: 20px;
  padding: 6px 12px;
}

.menu-icon {
  cursor: pointer;
  display: none; /* Initially hide the menu icon */
  color: white;
}

.logout-link {
  margin-right: 20px;
  color: white;
  text-decoration: none;
  padding: 6px 12px;
  border: 2px solid rgb(255, 255, 255);
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s, color 0.3s, border 0.3s;
}

.logout-link:hover {
  background-color: white;
  color: rgb(163, 4, 4);
}


@media (max-width: 1100px) {
  .logo{
    margin-top: auto;
    margin-left: 0%;
  }
  nav{
    flex-direction: column;
  }

  .router-link {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .menu-icon {
    display: block; /* Show the menu icon on smaller screens */
  }
  .nav-links {
    display: none; /* Initially hide the menu */
    flex-direction: column;
    position: absolute;
    top: 140px; /* Adjust as needed based on your layout */
    background-color: #383838;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
  }

  .show-menu {
    display: flex; /* Show the menu when isMenuOpen is true */
  }
}
</style>
