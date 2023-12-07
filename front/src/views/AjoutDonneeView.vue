
<template>

  <div style="margin-top: 150px;">
    <h1 style="font-size: 40px;">Ajout de donnee</h1>
    <div class="centered-container">
       <div class="gestion">
          <form>
              <vue-dropzone
                  ref="myDropzone"
                  id="dropzone"
                  :options="dropzoneOptions"
                  @vdropzone-success="onDropzoneSuccess"
                  @vdropzone-error="onDropzoneError"
              >
                <div class="fallback">
                  <input name="file" type="file" multiple />
                </div>
                <div class="dz-message" style="text-align: center;">
                  Déposer des fichiers ici pour télécharger
                </div>
              </vue-dropzone>

            <button class="button" type="submit">AJOUTER LES DONNÉES</button>
          </form>
       </div>
    </div>
  </div>

</template>

<script>
import 'vue2-dropzone/dist/vue2Dropzone.min.css';
import vueDropzone from 'vue2-dropzone';

export default {
  components: {
    vueDropzone,
  },
  data() {
    let userId=JSON.parse(localStorage.getItem('token')).user_id;
    console.log("local storage: "+userId);
    return {
      dropzoneOptions: {
        url: `http://localhost:3000/users/AjoutData/?user_id=${(userId)}`, // Remplacez par votre URL de gestion des téléchargements
        acceptedFiles: '.csv', // Types de fichiers acceptés
        addRemoveLinks: true, // Afficher les liens pour supprimer les fichiers
        label: 'Déposer des fichiers ici pour télécharger', // Message personnalisé
        headers: {
          Authorization: `Bearer ${this.userId}`, // Include user_id in the headers
        },
      },
    };
  },
  methods: {
      onDropzoneSuccess(file, response) {
      // Gérer les fichiers téléchargés avec succès
      console.log('Fichier téléchargé avec succès:', file, response);
    /*this.$notify({
        title: 'Succès',
        text: 'Le fichier a été téléchargé avec succès.',
        type: 'success', // Vous pouvez également utiliser 'warn' ou 'error'
      });*/
    },
    onDropzoneError(file, error, xhr) {
      // Gérer les erreurs de téléchargement
      console.error('Erreur de téléchargement:', file, error, xhr);
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

.dropzone {
  border: 4px solid #ca2b30;
  color: black;
  margin: 2rem 0;
}
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
