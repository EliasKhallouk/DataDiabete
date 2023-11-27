import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import usersService from "@/services/users.service";
import cartesService from "@/services/carte.service";

export default new Vuex.Store({
  state: {
    users : [],
    cartes : [],
  },
  getters: {
  },
  mutations: {
    updateUsers(state, user){
      state.users = user;
    },
    updateCartes(state, carte){
      state.cartes = carte;
    }
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
  },
  modules: {
  }
})
