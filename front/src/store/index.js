import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import usersService from "@/services/users.service";
import cartesService from "@/services/carte.service";

export default new Vuex.Store({
  state: {
    users : [],
    cartes : [],
    token: localStorage.getItem('token') || '',
  },
  getters: {
  },
  mutations: {
    updateUsers(state, user){
      state.users = user;
    },
    updateCartes(state, carte){
      state.cartes = carte;
    },
    setToken(state, token) {
      state.token = token;
    },
  },
  actions: {
    async getAllUsers({commit}){
      let response = await usersService.getAllUsers();
      if(response.status === 200){
        commit('updateUsers',response.data)
      } else{
        console.log("Erreur Get User Store");
      }
    },
    async deleteUsers({commit},id){
      let response = await usersService.deleteUsers(id);
      if(response.status === 200){
        const result = this.state.users.filter(user => user.user_id !== id)
        commit('updateUsers',result)
      } else{
        console.log("Erreur Delete User Store");
      }
    },
    async deleteUsersAddData({commit},id){
      let response = await usersService.deleteUsersAddData(id);
      if(response.status === 200){
        const result = this.state.users.filter(user => user.id_user_want_add !== id)
        commit('updateUsers',result)
      } else{
        console.log("Erreur Delete User Store");
      }
    },
    async insertUsers({commit},{nom,prenom,email,password}){
      console.log(nom,prenom,email,password);
      let response = await usersService.insertUsers(nom,prenom,email,password);
      if(response.status === 200){
        commit('updateUsers',response.data)
      } else{
        console.log("Erreur Insert User Store");
      }
    },
    async getCarte({commit},annee){
      console.log("--------",annee);
      let response = await cartesService.getCarte(annee);
      if(response.status === 200){
        commit('updateCartes',response.data)
      } else{
        console.log("Erreur Get Carte Store");
      }
    },
    async getUserInsertData({commit}){
      let response = await usersService.getUserInsertData();
      if(response.status === 200){
        commit('updateUsers',response.data)
      } else{
        console.log("Erreur Get User Insert Data Store");
      }
    },
    // ...
    async verifUsers({ commit }, conf) {
      console.log(conf);
      let response = await usersService.verifUsers(conf);
      if (response.status === 200) {
        console.log("okkkkktoken " + response.data);

        // Ajoutez la propriété firstname à l'objet token
        const tokenWithFirstName = { ...response.data, firstname: response.data.firstname };

        commit('setToken', tokenWithFirstName);

        // Enregistrez la chaîne JSON valide dans le localStorage
        localStorage.setItem('token', JSON.stringify(tokenWithFirstName));
      } else {
        console.log("Erreur verifUsers User Store");
      }
    },
// ...

  },
  modules: {
  }
})
