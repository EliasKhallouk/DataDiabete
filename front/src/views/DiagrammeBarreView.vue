<template>
  <div class="body-diagramme-bare">
    <highcharts class="hc" :options="chartOptions" ref="chart"></highcharts>
    <form>
      <input id="annee" name="annee" v-model="annee"/>
      <button @click.prevent="getter" class="button" >CHOISIR L'ANNÉE</button>
    </form>
    <p>
      Explorez ces graphiques interactifs qui vous permettent de comparer diverses informations liées au diabète. Ces graphiques
      comprennent des données sur l'âge des personnes touchées par le diabète, leur pays de résidence, leur sexe, et
      bien plus encore. Ces visualisations vous aident à identifier les tendances et les disparités dans la prévalence
      du diabète à travers le monde.
    </p>
    <table>
      <thead>
      <tr>
        <th>Année</th>
        <th>Nombre de personnes atteints</th>
        <th>tranche d'age</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="item in diagramme" :key="item.id">
        <td>{{ item.annee }}</td>
        <td>{{ item.nbr_diabetes }}</td>
        <td>{{ item.id_tranche }}</td>
      </tr>
      </tbody>
    </table>
  </div>

</template>

<script>
import {mapActions, mapState} from "vuex";
//import Highcharts from 'highcharts';
import {Chart} from "highcharts-vue";
//import {ref} from "vue";
import diagrammeService from "@/services/diagramme.service";

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
  components: {
    highcharts: Chart
  },
  data: () => ({
  annee:2021,
  chartOptions: {
    chart: {
      type: 'column' // Définir le type de graphique sur 'column' pour un histogramme
    },
    colorAxis: {
      min: 0,
      tickPixelInterval: 60,
      max: 10000,
      minColor: '#deb5b5',
      maxColor: '#ff0000',
    },
    title: {
      text: 'Diagramme du nombre de personnes atteintes de diabète par tranche d\'age',
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
    series: [
      {
      animation: true,
      name: 'diagramme en barre',
      data:[],
      },
    ],
  },
  }),
  computed: {
    ...mapState(["diagramme"]),
  },methods: {
    ...mapActions(["getDiagramme"]),
    getter() {
      this.getDiagramme(this.annee).
      then( () => {
        this.chartOptions.series[0].data = [];
        this.chartOptions.title.text = '';
        this.diagramme.forEach((item) => {
          const tabTemp = [item.iso_pays_car, item.nbr_diabetes]
          this.chartOptions.series[0].data.push(tabTemp);
        });
        this.chartOptions.title.text = 'Diagramme du nombre de personnes atteintes de diabète par tranche d\'age de l\'année ' + this.annee;
      }).catch((error) => console.log(error))
    },
    /*async fetchDiagramme(annee) {
      try {
        // Utilise la fonction du service
        const diagrammeData = await diagrammeService.getDiagramme(annee);
        console.log(diagrammeData);
        // Fais quelque chose avec les données, par exemple, commit à une mutation Vuex
        // this.$store.commit('SET_DIAGRAMME_DATA', diagrammeData);
      } catch (error) {
        console.error(error);
      }
    },*/
  },
  mounted() {
    this.getDiagramme(this.annee).
    then( () => {
      this.diagramme.forEach((item) => {
        const tabTemp = [item.iso_pays_car, item.nbr_diabetes]
        this.chartOptions.series[0].data.push(tabTemp);
      });
    }).catch((error) => console.log(error))
    console.log(this.chartOptions.series[0].data);

  }
};
</script>

<style scoped>
.body-diagramme-bare{
  margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 50px;
}

th, td {
//text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #ca2b30;
  color: white;
}
</style>