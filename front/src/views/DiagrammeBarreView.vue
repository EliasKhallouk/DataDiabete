<template>
  <div class="body-diagramme-bare">
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
        series: [
          {
            data: [1, 2, 3]
          }
        ],
        title: {
          text: 'Carte Mondiale de la Mortalité due au Diabète',
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
      }
    };
  }
};
</script>

<style scoped>

.body-diagramme-bare{
  margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;
}
</style>