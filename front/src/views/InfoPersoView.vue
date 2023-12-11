<template>
  <div style="margin-top: 150px;">
    <h1 style="font-size: 40px;">Informations personnelles</h1>
    <div class="centered-container">
       <div class="gestion">
          <form>
            <div class="ligne">
              <label for="email">id</label>
              <input class="input" type="text" id="id" name="id" :value="getFirstNameFromLocalStorage.user_id" />
            </div>
            <div class="ligne">
              <label for="email">Nom</label>
              <input class="input" type="text" id="Nom" name="Nom" :value="getFirstNameFromLocalStorage.firstname" />
            </div>
            <div class="ligne">
              <label for="email">Prénom</label>
              <input class="input" type="text" id="Prenom" name="Prenom" :value="getFirstNameFromLocalStorage.lastname" />
            </div>
            <div class="ligne">
              <label for="email">Email</label>
              <input class="input" type="email" id="email" name="email" :value="getFirstNameFromLocalStorage.mail" />
            </div>
            <div class="ligne">
              <label for="password">Password</label>
              <input
                  class="input"
                  id="Password"
                  name="Password"
                  :value="getFirstNameFromLocalStorage.password"
                  :type="showPassword ? 'text' : 'password'"
              /><!--:type="showPassword ? 'text' : 'password'"-->
              <button class="button" @click.prevent="togglePasswordVisibility">
                {{ showPassword ? 'Cacher' : 'Voir' }}
              </button>
            </div>
            <div class="ligne">
                <label for="email">Rôle</label>
                <input class="input" type="text" id="Role" name="Role" :value="getFirstNameFromLocalStorage.groupe" />
              </div>
            <button class="button" type="submit">Changer mes coordonnées</button>
          </form>
       </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      showPassword: false,
    };
  },
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
  methods: {
    togglePasswordVisibility() {
      this.showPassword = !this.showPassword;
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

.ligne{
  display: flex;
  margin-bottom: 50px;
}
label{
  width: 40%;

}
input {
  /* border-radius: 5px; */
  border-bottom: 2px solid $color-red-soft;
  border-top: none;
  border-left: none;
  border-right: none;
  margin-top: $pixel1;
  margin-bottom: $pixel2;
  margin-left: $pixel1;
  margin-right: $pixel1;
  font-size: $pixel3;
  background-color: transparent;
}

input:focus {
  outline: none;
}

label {
  margin-top: $pixel1;
  margin-bottom: $pixel1;
  margin-left: $pixel1;
  margin-right: $pixel1;
  font-size: $pixel3;
  color: $color-black;
}
button {
  margin-top: $pixel3;
  font-size: 26px;
  background-color: $color-red;
  color: $color-red-pastel;
  border: 2px solid transparent;
  border-radius: 5px;
  padding-left: 15px;
  padding-right: 15px;
  padding-top: 4px;
  padding-bottom: 5px;
  transition-duration: 0.2s;
}
button:hover {
  color: $color-red;
  background-color: white;
  border: 2px solid $color-red;
}
.gestion {
  padding: 40px;
  margin-bottom: 60px;
  box-shadow: inset;
  border-radius: 10px;
  background-color: #f8edeb;
  //display: flex;
  //flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Center text */

}

form {
  display: flex;
  flex-direction: column;
  align-items: flex-end;

}
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
@media screen and (max-width: 600px) {
  .connexion {
    padding: 20px;
    box-shadow: inset;
    border-radius: 10px;
    background-color: #f8edeb;
    display: flex;
    flex-direction: column;
    justify-content: center; /* Center horizontally */
    align-items: center; /* Center vertically */
    text-align: center; /* Center text */
  }
  h1 {
    margin-right: 0px;
    color: $color-red;


  }
  form {
    display: flex;
    flex-direction: column;
    align-items: flex-end;
  }
  .centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
}
</style>
