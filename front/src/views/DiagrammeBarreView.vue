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
        <td data-title="Id">{{ ligne.iso_pays_car }}</td>
        <td data-title="Id">{{ ligne.nbr_diabetique }}</td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { mapActions, mapState } from "vuex";
import Highcharts from "highcharts";

export default {
  computed: {
    ...mapState(["diagrammes"]),
  },
  data: () => ({
    annee: 2022,
    chartOptions: {
      chart: {
        type: "column",
        renderTo: "container",
      },
      title: {
        text: "Diagramme du nombre de personnes atteintes de diabète de l'année 2022",
        align: "left",
      },
      xAxis: {
        type: "category",
      },
      yAxis: {
        title: {
          text: "Nombre de personnes atteintes",
        },
      },
      series: [
        {
          name: "Pays",
          colorByPoint: true,
          data: [],
        },
      ],
    },
  }),
  methods: {
    ...mapActions(["getDiagramme"]),
    getter() {
      this.getDiagramme(this.annee)
          .then(() => {
            // Destroy the existing chart if it exists
            if (this.chart) {
              this.chart.destroy();
            }

            // Create a new chart
            this.chart = new Highcharts.Chart({
              ...this.chartOptions,
              accessibility: {
                enabled: false, // Disable accessibility module
              },
            });

            // Update the new chart with new data
            this.chart.series[0].setData(
                this.diagrammes.map((item) => ({
                  name: item.iso_pays_car,
                  y: parseFloat(item.nbr_diabetique),
                }))
            );

            this.chart.setTitle({
              text:
                  "Diagramme du nombre de personnes atteintes de diabète de l'année " +
                  this.annee,
            });
          })
          .catch((error) => console.log(error));
    },
  },
  mounted() {
    this.getDiagramme(this.annee)
        .then(() => {
          this.chart = new Highcharts.Chart({
            ...this.chartOptions,
            accessibility: {
              enabled: false, // Disable accessibility module
            },
          });

          this.chart.series[0].setData(
              this.diagrammes.map((item) => ({
                name: item.iso_pays_car,
                y: parseFloat(item.nbr_diabetique),
              }))
          );
        })
        .catch((error) => console.log(error));
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
