<template>
  <div class="inscription">
    <h1>Inscription</h1>
    <Inscription msg="S'inscrire"/>
  </div>
</template>

<script>
// @ is an alias to /src
import Inscription from '../components/Inscription'

export default {
  name: 'InscriptionView',
  components: {
    Inscription
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

.inscription{
  margin-top: 100px;
}

</style>
