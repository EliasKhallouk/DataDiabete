import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import usersService from "@/services/users.service";

export default new Vuex.Store({
  state: {
    users : [],
  },
  getters: {
  },
  mutations: {
    updateUsers(state, user){
      state.users = user;
    }
  },
  actions: {
    async getAllUsers({commit}){
      let response = await usersService.getAllUsers();
      if(response.status === 200){
        commit('updateUsers',response.data)
      } else{
        console.log("Marche po");
      }
    }
  },
  modules: {
  }
})
