<template>
  <div style="margin-top: 150px;">
    <h1 style="font-size: 40px;">Validation des données</h1>
    <div class="centered-container">
      <table>
        <thead>
        <tr>
          <th>Id</th><th>Nom</th><th>Prénom</th><th>Email</th><th>Fichier</th><th>Opérations</th>
        </tr>
        </thead>
        <tbody>
          <div v-if="users.length <=0">Pas d'utilisateur</div>
          <tr v-for="(user, index) in users" :key="index">
            <td data-title="Id">{{user.user_id}}</td>
            <td data-title="Nom">{{user.first_name}}</td>
            <td data-title="Prenom">{{user.last_name}}</td>
            <td data-title="Email">{{user.mail}}</td>
            <td data-title="Fichier"><a href="/home/userdepinfo/A2/SAE/DataDiabete/back/uploads/1-1701272832630.csv" download="fichierrrrr.csv">Télécharger</a></td>
            <td data-title="opération">
              <!--<a href="/admin/gestionUtilisateur/delete?id_user={{ user.Id }}" onclick="return confirm('Are you sure?')" >supprimer</a>-->
              <!--onclick="return confirm('Voulez-vous vraiment refuser ?')"-->
              <a @click="deleteUsersAddData(user.id_user_want_add)" >Refuser</a>
              <a href="" onclick="return confirm('Voulez-vous vraiment ajouter ?')" style="margin-left: 40px;">Ajouter</a>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>
<!--<script src="https://cdnjs.cloudflare.com/ajax/libs/axios/0.19.2/axios.min.js"/>-->
<script>

import {mapActions, mapState} from "vuex";

export default {
  computed: {
    ...mapState(['users'])
  }, methods :{
    ...mapActions(['getUserInsertData','deleteUsersAddData'])
  }, mounted() {
    this.getUserInsertData().
    then( () => {
      console.log("OK")
    }).catch((error) => console.log(error))
  }
}
</script>

<style scoped lang="scss">
$pixel1: 4px;
$pixel2: 10px;
$pixel3: 20px;
$color-red: #ca2b30;
$color-red-soft: #f25c54;
$color-red-pastel: #f8edeb;
$color-black: #212529;


.centered-container {
  margin-right: 10%;
  margin-left: 10%;
}

@media screen and (max-width: 600px) {

  .centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
}



///// TABLE
table{
  margin: 1rem auto;
  text-align: center;
  width: 100%;
  max-width: 100%;
  border-collapse: collapse;
  border: 1px solid
}

thead{
  background-color: #212529;
  color: white
}

th,td{padding:8px 0}

tbody tr:nth-child(even) {
  background-color: #f8edeb
}

@media only screen and (max-width: 800px) {
  table,
  thead,
  tbody,
  th,
  td,
  tr{
    display: block
  }

  thead tr {
    position: absolute;
    top: -9999px;
    left: -9999px;
  }

  td {
    position: relative;
    padding-left: 32%;
    white-space: normal;
    text-align: left
  }

  td:before {
    position: absolute;
    top: 6px;
    left: 6px;
    width: 45%;
    padding-right: 10px;
    font-weight: bold;
    white-space: nowrap;
    text-align:left;
    content: attr(data-title)
  }
}
///////FIN TABLEAU



///////BUTON OPERATION
a {
  letter-spacing: 2px;
  text-transform: uppercase;
  display: inline-block;
  text-align: center;
  font-weight: bold;
  padding: 0.4em 2em;
  border: 3px solid $color-red;
  border-radius: 2px;
  position: relative;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.10);
  color: $color-red;
  text-decoration: none;
  transition: 0.3s ease all;
  z-index: 1;
}

a:before {
  transition: 0.5s all ease;
  position: absolute;
  top: 0;
  left: 50%;
  right: 50%;
  bottom: 0;
  opacity: 0;
  content: '';
  background-color: $color-red;
  z-index: -1;
}

a:hover, a:focus {
  color: white;
}

a:hover:before, a:focus:before {
  transition: 0.5s all ease;
  left: 0;
  right: 0;
  opacity: 1;
}

a:active {
  transform: scale(0.9);
}
///////FIN BUTON OPERATION

</style>
