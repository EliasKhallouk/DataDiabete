<template>
  <div style="margin-top: 150px;">
    <h1 style="font-size: 40px;">Gestion d'utilisateurs</h1>
    <div class="centered-container">


        <p>{{ getFirstNameFromLocalStorage.token }}</p>
        <p>{{ getFirstNameFromLocalStorage.firstname }}</p>
        <p>{{ getFirstNameFromLocalStorage.lastname }}</p>
        <p>{{ getFirstNameFromLocalStorage.mail }}</p>
        <p>{{ getFirstNameFromLocalStorage.group_id }}</p>


    </div>
  </div>
</template>

<script>
export default {
  computed: {
    getFirstNameFromLocalStorage() {
      const storedToken = localStorage.getItem('token');
      // Vérifiez si le token existe dans le localStorage
      if (storedToken) {
          return JSON.parse(storedToken);
      }
      return 'Aucun Token trouvé';
    },
  },
};

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
