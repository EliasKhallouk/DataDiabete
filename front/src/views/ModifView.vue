<template>
    <div style="margin-top: 150px;">
      <h1>Modification admin</h1>
      <div class="centered-container">
        <table>
          <thead>
          <tr>
            <th>Id caroussel</th> <th>chemin</th> <th>utilisateur</th> <th>opérations</th>
          </tr>
          </thead>
          <tbody>
          <tr v-for="(caroussel, index) in modifs" :key="index">
            <td data-title="Id_url">{{caroussel.id_url}}</td>
            <td data-title="chemin">{{caroussel.chemin}}</td>
            <td data-title="id_user_add">{{caroussel.id_user_add}}</td>
            <td data-title="opérations">
              <a @click="updateModif(caroussel.id_url)">Editer</a>
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
</template>
  
<script>
  import {mapState,mapActions} from "vuex";
  export default {
    computed: {
      ...mapState(['modifs'])
    }, methods :{
      ...mapActions(['getAllModif','updateModif']),
    }, mounted() {
      this.getAllModif().
      then( () => {
        console.log("SISI")
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
  