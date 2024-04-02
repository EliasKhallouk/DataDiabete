<template>
  <div class="body-diagramme-bare">
    <figure class="highcharts-figure">
      <div id="container"></div>
    </figure>
    <form>
      <input id="annee" name="annee" v-model="annee" />
      <select v-model="codeSexe">
        <option value="2">Homme et Femme</option>
        <option value="1">Homme</option>
        <option value="0">Femme</option>
        <!-- Ajoutez d'autres options selon votre modèle de données -->
      </select>
      <button @click.prevent="getter" class="button">FILTRER LES DONNÉES</button>
    </form>
    <p>
      Explorez ces graphiques interactifs qui vous permettent de comparer
      diverses informations liées au diabète. Ces graphiques comprennent des
      données sur la nationnalité des personnes touchées par le diabète, leur sexe,
      et bien plus encore, sur les pays les plus touché. Ces visualisations vous aident à identifier les
      tendances et les disparités dans la prévalence  du diabète à travers le monde.
    </p>
    <table>
      <thead>
      <tr>
        <th>Pays</th>
        <th>Nombre de personnes atteints</th>
        <th>Sexe</th>
      </tr>
      </thead>
      <tbody>
      <tr v-for="(ligne, index) in diagrammes" :key="index">
        <td data-title="Id">{{ ligne.iso_pays_car }}</td>
        <td data-title="Id">{{ ligne.nbr_diabetique }}</td>
        <td data-title="Id">
          {{ ligne.code_sexe === 0 ? 'femme' : (ligne.code_sexe === 1 ? 'homme' : '') }}
        </td>
      </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Highcharts from "highcharts";

export default {
  name: "DiagrammeTouche.vue",
  computed: {
    ...mapState(["diagrammes"]),
  },
  data: () => ({
    annee: 2014,
    codeSexe: 0,
    chartOptions: {
      chart: {
        type: "column",
        renderTo: "container",
      },
      title: {
        text: "Diagramme du nombre de personnes atteintes de diabète en 2014",
        margin: 50,
        style: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: '36px',
          fontFamily: 'Poppins'
        }
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
          name: "Femme",
          color: "#FF69B4", // Rose
          data: [],
        },
        {
          name: "Homme",
          color: "#6495ED", // Bleu
          data: [],
        },
      ],
    },
  }),
  methods: {
    ...mapActions(["getDiagramme"]),
    getter() {
      console.log("annee", this.annee);
      console.log("code sexe", this.codeSexe);
      this.getDiagramme({ annee: this.annee, codeSexe: this.codeSexe })
          .then(() => {
            // Destroy the existing chart if it exists
            if (this.chart) {
              this.chart.destroy();
            }

            // Define colors based on codeSexe
            const colors = {
              0: "#FF69B4", // Rose for Femme
              1: "#6495ED", // Bleu for Homme
              2: "orange", // No specific color for Homme et Femme
            };

            // Create a new chart
            this.chart = new Highcharts.Chart({
              ...this.chartOptions,
              accessibility: {
                enabled: false, // Disable accessibility module
              },
            });

            // Update the new chart with new data and colors
            this.chart.series[0].setData(
                this.diagrammes.map((item) => ({
                  name: item.iso_pays_car,
                  y: parseFloat(item.nbr_diabetique),
                  color: colors[this.codeSexe],
                }))
            );

            this.chart.setTitle({
              text:
                  "Diagramme du nombre de personnes atteintes de diabète en " +
                  this.annee,
            });
          })
          .catch((error) => console.log(error));
    },
  },
  mounted() {
    console.log("annee==", this.annee);
    console.log("code sexe==", this.codeSexe);
    this.getDiagramme({ annee: this.annee, codeSexe: this.codeSexe })
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
                color: "#FF69B4", // Default color if codeSexe is not specified
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

select {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}

input{
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}


.button{
  background-color: #ca2b30;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}

.button:hover{
  background-color: #f25c54;
}


</style>