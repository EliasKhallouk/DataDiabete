<template>
  <div class="body-histogramme">
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    <p>
      Explorez ces graphiques interactifs qui vous permettent de comparer diverses informations liées au diabète. Ces graphiques
      comprennent des données sur l'âge des personnes touchées par le diabète, leur pays de résidence, leur sexe, et
      bien plus encore. Ces visualisations vous aident à identifier les tendances et les disparités dans la prévalence
      du diabète à travers le monde.
    </p>
  </div>
</template>

<script>
import Highcharts from 'highcharts'
import exportingInit from 'highcharts/modules/exporting'

exportingInit(Highcharts)
let date1 = new Date();
let dateLocale = date1.toLocaleDateString('Fr-FR',{
  weekday: 'long',
  year: 'numeric',
  month: 'long',
  day: 'numeric',
  hour: 'numeric',
  minute: 'numeric',
  second: 'numeric'
});

export default {
  data() {
    return {
      chartOptions: {
        chart: {
          type: 'column' // Définir le type de graphique sur 'column' pour un histogramme
        },
        series: [
          {
            name: 'histogramme',
            //type :'histogram', // Définir le type de graphique sur 'histogram' pour un histogramme
            data: [1, 2, 3]
          }
        ],
        title: {
          text: 'Histogramme',
          margin: 50,
          style: {
            color: '#000000',
            fontWeight: 'bold',
            fontSize: '36px',
            fontFamily: 'Poppins'
          }
        },
        subtitle: {
          text: 'Données mises à jour le '+dateLocale,
          margin: 50,
          style: {
            color: '#BABABA',
            fontSize: '18px',
            fontFamily: 'Poppins'
          }
        },
        xAxis: {
          title: {
            text: 'Categories' // Titre de l'axe des X
          }
          // Tu peux ajouter d'autres options pour l'axe des X ici si nécessaire
        },
        yAxis: {
          title: {
            text: 'Valeurs' // Titre de l'axe des Y
          }
          // Tu peux ajouter d'autres options pour l'axe des Y ici si nécessaire
        },
      }
    };
  }
};
</script>

<style scoped>
.body-histogramme{
  margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;
}
</style>
