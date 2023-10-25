<template>
  <div class="home">
    <img alt="Vue logo" src="../assets/image.png">
    <HelloWorld msg="Bienvenue sue le site de visualisation de données concernant le diabète"/>
  </div>
</template>

<script>
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'HomeView',
  components: {
    HelloWorld
  }
}
</script>

<style scoped lang="scss">

  img{
    width: 300px;
    height: 200px;
  }

</style>