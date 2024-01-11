<template>
  <div class="body-diagramme-bare">
    <figure class="highcharts-figure">
      <div id="container"></div>
    </figure>
    <form>
      <input id="annee" name="annee" v-model="annee" />
      <button @click.prevent="getter" class="button">CHOISIR L'ANNÉE</button>
    </form>
    <p>
      Explorez ces graphiques interactifs qui vous permettent de comparer
      diverses informations liées au diabète. Ces graphiques comprennent des
      données sur l'âge des personnes touchées par le diabète, leur pays de
      résidence, leur sexe, et bien plus encore. Ces visualisations vous
      aident à identifier les tendances et les disparités dans la prévalence
      du diabète à travers le monde.
    </p>
    <table>
      <thead>
      <tr>
        <th>Pays</th>
        <th>Nombre de personnes atteints</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(ligne, index) in diagrammes" :key="index">
        <td data-title="Id">{{ligne.iso_pays_car}}</td>
        <td data-title="Id">{{ligne.nbr_diabetique}}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
//import Highcharts from "highcharts";
//import HighchartsVue from "highcharts-vue";
//import {ref} from "vue";
import Highcharts from 'highcharts';

export default {
  computed: {
    ...mapState(["diagrammes"]),
  },
  data:() =>({
    annee: 2022,
    chartOptions: {
      chart: {
        type: 'column'
      },
      title: {
        text: 'Corn vs wheat estimated production for 2020',
        align: 'left'
      },
      // ... other options
      series: [
        {
          name: "Nombre de personnes atteintes",
          data: [],
        },
      ],
    },
  }),
  methods: {
    ...mapActions(["getDiagramme"]),
    getter() {
      this.getDiagramme(this.annee).
      then(() => {
        // Rafraîchissons le graphique
        this.chartOptions.series[0].data = [];
        this.chartOptions.title.text = '';

        this.diagrammes.forEach((item) => {
          const dataPoint = { name: item.iso_pays_car, y: item.nbr_diabetique };
          this.chartOptions.series[0].data.push(dataPoint);
        });

        this.chartOptions.title.text =
            "Diagramme du nombre de personnes atteintes de diabète de l'année " +
            this.annee;
      }).catch((error) => console.log(error));
    },
  },
  mounted() {
    Highcharts.chart('container', this.chartOptions); // Call Highcharts.chart here
    this.getDiagramme(this.annee)
        .then(() => {
          this.diagrammes.forEach((item) => {
            const dataPoint = { name: item.iso_pays_car, y: item.nbr_diabetique };
            this.chartOptions.series[0].data.push(dataPoint);
          });
        })
        .catch((error) => console.log(error));
    console.log(this.chartOptions.series[0].data);
  },
};
</script>

<style scoped>
.body-diagramme-bare {
  margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;
}

table {
  border-collapse: collapse;
  width: 100%;
  margin-top: 50px;
}

th,
td {
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #f2f2f2;
}

th {
  background-color: #ca2b30;
  color: white;
}
</style>