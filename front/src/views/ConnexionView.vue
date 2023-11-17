<template>
    <div class="connexion">
        <h1>Connexion</h1>
        <Connexion msg="Se connecter"/>
    </div>
</template>

<script>
// @ is an alias to /src
import Connexion from '../components/Connexion.vue'

export default {
  name: 'ConnexionView',
  components: {
    Connexion
  }
}
</script>

<style scoped lang="scss">

  $color-black : #212529;
  // style to connexion msg
  h1{
    margin-top: 20px;
    margin-bottom: 20px;
    margin-left: 20px;
    margin-right: 20px;
    font-size: 40px;
    color: $color-black;
  }

  .connexion{
    margin-top: 100px;
  }

</style>
