<template>
  <div class="centered-container">
    <div class="inscription">
      <h1>{{ msg }}</h1>
      <form>
        <label for="nom">Nom</label>
        <input class="input" type="text" id="nom" name="nom" v-model="nom" placeholder="Nom" />
        <br />
        <label for="prenom">Prenom</label>
        <input class="input" type="text" id="prenom" name="prenom" v-model="prenom" placeholder="Prenom" />
        <br />
        <label for="email">Email</label>
        <input class="input" type="email" id="email" name="email" v-model="email" placeholder="Email" />
        <br />
        <label for="password">Mot de passe</label>
        <input
          class="input"
          type="password"
          id="password"
          name="password"
          placeholder="Mot de passe"
          v-model="password"
        />
        <br />
        <button @click="this.insert" class="button" >S'inscrire</button>
      </form>
    </div>
  </div>
</template>

<script>
import {mapState,mapActions} from "vuex";
export default {
  name: "inscription-form",
  props: {
    msg: String,
  },
  data: () => ({
    nom:'',
    prenom:'',
    email:'',
    password:''
  }),
  computed: {
    ...mapState(['users'])
  },
  methods :{
    ...mapActions(['insertUsers']),
    insert(){
      this.insertUsers({nom:this.nom,prenom:this.prenom,email:this.email,password:this.password})
    }
  }
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
.inscription {
  padding: 40px;
  box-shadow: inset;
  border-radius: 10px;
  background-color: #f8edeb;
  display: flex;
  //flex-direction: column;
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
  text-align: center; /* Center text */
}
h1 {
  margin-right: 60px;
  color: $color-red;
}
form {
  display: flex;
  flex-direction: column;
  align-items: center;
}
.centered-container {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
}
@media screen and (max-width: 600px) {
  .inscription {
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
    align-items: center;
  }
  .centered-container {
    display: flex;
    justify-content: center;
    align-items: center;
    background-color: transparent;
  }
}
</style>
