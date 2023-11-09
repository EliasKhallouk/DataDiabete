<template>
  <div class="body-carte">
    <!-- PREMIERE PARTIE-->
    <p style="font-size:xx-large">Carte Mondiale de la Mortalité due au Diabète</p>
    <img style="height: 350px;width: 800px" src="../assets/carte2.jpg" alt="Image 1" />
    <p>
      Explorez notre carte interactive qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte vous montre le nombre de décès attribués au diabète dans chaque pays, vous permettant ainsi de comprendre l'ampleur du problème à l'échelle internationale. Les données sont régulièrement mises à jour pour vous fournir des informations actuelles.
    </p>

    <!-- PREMIERE PARTIE-->
    <div class="deuxieme" >

      <p style="font-size:xx-large">Ce que nous faisons :</p>
      <div style="text-align: justify;padding-right: 38%;">
      <p>
        1. Carte Mondiale de la Mortalité due au Diabète
        Explorez notre carte interactive qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte vous montre le nombre de décès attribués au diabète dans chaque pays, vous permettant ainsi de comprendre l'ampleur du problème à l'échelle internationale. Les données sont régulièrement mises à jour pour vous fournir des informations actuelles.
      </p><p>
        2. Graphiques Comparatifs sur le Diabète
        Nous avons créé des graphiques interactifs qui vous permettent de comparer diverses informations liées au diabète. Ces graphiques comprennent des données sur l'âge des personnes touchées par le diabète, leur pays de résidence, leur sexe, et bien plus encore. Ces visualisations vous aident à identifier les tendances et les disparités dans la prévalence du diabète à travers le monde.
      </p><p>
        3. Graphique d'Histogramme du Prix de l'Insuline par Pays
        L'accès à l'insuline est crucial pour de nombreuses personnes atteintes de diabète. Notre graphique en histogramme vous permet de comparer les prix de l'insuline dans différents pays. Cette information peut être vitale pour les personnes atteintes de diabète qui doivent gérer les coûts de leur traitement. Nous nous efforçons de maintenir ces données à jour pour vous aider à prendre des décisions éclairées.
      </p>
      </div>
      <div style="float: right;position: absolute;"><img style="height: 510px;width: 352px;margin-left: 228%;margin-top: -492px;" src="../assets/carte.png" alt="Image 1" /></div>
      deeeee
    </div>
    azazzaza



  </div>
</template>

<script>
export default {
  name: "connexion-form",
  props: {
    msg: String,
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

.body-carte{
  margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;
}

.deuxieme{
  text-align: justify;

}
</style>
