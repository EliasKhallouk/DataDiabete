import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import usersService from "@/services/users.service";
import mortService from "@/services/mort.service";
import toucheService from "@/services/touche.service";
import modifService from "@/services/modif.service";

export default new Vuex.Store({
  state: {
    users : [],
    cartes : [],
    diagrammes : [],
    modifs : [],
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
    updateDiagrammes(state, diagramme){
      state.diagrammes = diagramme;
    },
    setToken(state, token) {
      state.token = token;
    },
    updateUserCredentials(state, { email, password }) {
      // Mettez à jour l'état avec le nouveau courriel et mot de passe
      const userData= { email, password };

      // Mettez à jour le localStorage
      localStorage.setItem('token', JSON.stringify(userData));
    },
    updateModif(state, modif){
      state.modifs = modif;
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
      let response = await mortService.getCarte(annee);
      if(response.status === 200){
        commit('updateCartes',response.data)
      } else{
        console.log("Erreur Get Carte Store");
      }
    },
    async getInfoCarte({commit},annee) {
      console.log("--------", annee,commit);
      let response = await mortService.getInfoCarte(annee);
      return response;
    },
    async getInfoCarteTouche({commit},{ annee, codeSexe}) {
      console.log("--------", annee,commit);
      let response = await toucheService.getInfoCarteTouche(annee,codeSexe);
      return response;
    },
    async getCarteTouche({commit},{annee,codeSexe}){
      console.log("--------",annee);
      let response = await toucheService.getCarteTouche(annee,codeSexe);
      if(response.status === 200){
        commit('updateCartes',response.data)
      } else{
        console.log("Erreur Get Carte Touche Store");
      }
    },
    async getDiagramme({commit},{annee,codeSexe}){
        console.log("--------",annee);
        console.log("--------",codeSexe);
        let response = await toucheService.getDiagramme(annee,codeSexe);
        if(response.status === 200){
            commit('updateDiagrammes',response.data)
        } else{
            console.log("Erreur Get Diagramme Store");
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
    async changeInfo({commit},{id,email,password}){
      console.log('OK',id,email,password);
      let response = await usersService.changeInfo(id,email,password);
      if(response.status === 200){
        const tokenWithFirstName = { ...this.state.token, mail: email,password:password };

        commit('setToken', tokenWithFirstName)
        // Actualiser le localStorage avec push
        response.data.splice(0, 1, tokenWithFirstName);
        response.data.push(tokenWithFirstName);
        // Enregistrez la chaîne JSON valide dans le localStorage
        localStorage.setItem('token', JSON.stringify(tokenWithFirstName));

      } else{
        console.log("Erreur Change info Store");
      }
    },
// ...
    async getAllModif({commit}){
      let response = await modifService.getAllModif();
      if(response.status === 200){
        commit('updateModif',response.data)
      } else{
        console.log("Erreur Get Modif Store");
      }
    },
    // éditer une modification
    async updateModif({commit},{id,chemin,id_user_add}){
      let response = await modifService.updateModif(id,chemin,id_user_add);
      if(response.status === 200){
        const result = this.state.modifs.filter(modif => modif.id !== id)
        commit('updateModif',result)
      } else{
        console.log("Erreur Update Modif Store");
      }
    },
  },
  modules: {
  }
})
