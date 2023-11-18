<template>
  <nav>
    <img alt="Vue logo" class="logo" src="../assets/logoDDfixe.png"/>
    <router-link to="/connexion" style="margin-right: 10%; float: right">Connexion</router-link>
    <router-link to="/histogramme" style="margin-right: 50px; float: right">Histogramme</router-link>
    <router-link to="/diagramme" style="margin-right: 50px; float: right">Diagramme</router-link>
    <router-link to="/carte" style="margin-right: 50px; float: right">Carte</router-link>
    <router-link to="/info-perso" style="margin-right: 50px; float: right">Informations personnelles</router-link>
    <router-link to="/gestion-utilisateur" style="margin-right: 50px; float: right">Gestion utilisateurs</router-link>
    <router-link to="/validation-donnee" style="margin-right: 50px; float: right">Validation données</router-link>
    <router-link to="/deconnexion" style="margin-right: 50px; float: right">Déconnexion</router-link>
    <router-link to="/" style="margin-right: 50px; float: right">Accueil</router-link>
  </nav>
</template>

<script>
export default {
  name:"NavBar"
}
</script>

<style scoped>

</style>