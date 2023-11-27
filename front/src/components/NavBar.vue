<template>
  <nav>
    <img alt="Vue logo" class="logo" @click="toggleMenu" src="../assets/logoDDfixe.png"/>
    <div class="nav-links" :class="{ 'show-menu': isMenuOpen }" @mouseleave="closeMenu">
      
    <router-link to="/">Accueil</router-link>
    <router-link to="/histogramme">Histogramme</router-link>
    <router-link to="/diagramme">Diagramme</router-link>
    <router-link to="/carte">Carte</router-link>
    <div class="dropdown">
      <div class="dropbtn">User</div>
      <div class="dropdown-content">
        <router-link to="/connexion">Connexion</router-link>
        <router-link to="/inscription">Inscription</router-link>
        <router-link to="/info-perso">Informations personnelles</router-link>
        <router-link to="/gestion-utilisateur">Gestion utilisateurs</router-link>
        <router-link to="/validation-donnee">Validation données</router-link>
        <a href="" class="logout-link" onclick="return confirm('Are you sure?')">Déconnexion</a>
      </div>
    </div>
      
      
      
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
  cursor: pointer;
}

.nav-links {
  display: flex;
  flex-wrap: wrap;
  margin-right: 5%;
}

nav a {
  margin-right: 20px;
  padding: 12px;
}



.dropdown-content a{
  margin: 0;

}

.dropdown-content a:hover{
  color: #af4c4c;
}

.dropdown-content .logout-link {
  margin: 0;
  color: rgb(0, 0, 0);
  text-decoration: none;
  padding: 12px;
  border-radius: 8%;
  cursor: pointer;
  transition: 0.3s, color 0.3s, border 0.3s;
}

.dropdown-content .logout-link:hover {
  border-radius: 2%;
  background-color: #f25c54;
  color: rgb(255, 255, 255);
}

/* Style The Dropdown Button */
.dropbtn {
  border-radius: 8%;
  background-color: #ca2b30;
  color: white;
  margin-right: 20px;
  padding: 12px;
  font-size: 20px;
  border: none;
  cursor: pointer;
}

/* The container <div> - needed to position the dropdown content */
.dropdown {
  position: relative;
  display: inline-block;
}

/* Dropdown Content (Hidden by Default) */
.dropdown-content {
  display: none;
  position: absolute;
  background-color: #f9f9f9;
  width: fit-content;
  box-shadow: 0px 8px 16px 0px rgba(0,0,0,0.2);
  z-index: 1;
  align-items: center;
}

/* Links inside the dropdown */
.dropdown-content a {
  color: black;
  padding: 16px 12px;
  text-decoration: none;
  display: block;
}

/* Change color of dropdown links on hover */
.dropdown-content a:hover {
  background-color: #ffffff;
  color: #f25c54;
}

/* Show the dropdown menu on hover */
.dropdown:hover .dropdown-content {
  display: block;
}

/* Change the background color of the dropdown button when the dropdown content is shown */
.dropdown:hover .dropbtn {
  background-color: #ca2b30;
}


@media (max-width: 1100px) {
  .logo{
    margin-top: auto;
    margin: 0%;
    display: block; /* Show the menu icon on smaller screens */
    width: 100px;
    height: 80px;
  }
  
  nav {
    margin: 0;
    flex-direction: column;
  }

  nav a{
    margin-right: 0;
    margin-bottom: 10px;
  }

  .router-link {
    margin-right: 0;
    margin-bottom: 10px;
  }

  .nav-links {
    display: none; /* Initially hide the menu */
    flex-direction: column;
    position: absolute;
    background-color: #383838;
    box-shadow: 0 2px 5px rgba(0, 0, 0, 0.1);
    width: 100%;
    text-align: center;
    top: 100%;
    margin: 0;
    padding: 0;
  }

  .show-menu {
    display: flex; /* Show the menu when isMenuOpen is true */
  }

  .dropbtn{
    border-radius: 2%;
  }
  .dropbtn:hover{
    background-color: #ffffff;
    color: #f25c54;
  }
  .dropbtn:hover .dropdown-content{
    display: block;
    margin: 0;
    padding: 0;
  }
  .dropdown-content{
    width: 100%;
    margin: 0;
    padding: 0;
  }
  .dropdown-content a{
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
  }
  .dropdown-content a:hover{
    background-color: #ffffff;
    color: #f25c54;
  }
  .dropdown-content .logout-link{
    margin: 0;
    padding: 0;
    margin-bottom: 5px;
    background-color: #ca2b30;
    margin-bottom: 0;
    border-radius: 0;
    color: #ffffff;
    padding: 8px;
  }
  .dropdown-content .logout-link:hover{
    background-color: #f25c54;
    color: #ffffff;
    margin-bottom: 0;
    padding: 8px;
  }

}
</style>
