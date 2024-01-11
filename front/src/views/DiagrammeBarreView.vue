<template>
  <div class="body-diagramme-bare">
    <canvas ref="barChart"></canvas>
    <form>
      <input id="annee" name="annee" v-model="annee" />
      <button @click.prevent="getDiagramme(annee)" class="button">CHOISIR L'ANNÉE</button>
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
import Chart from "chart.js/auto"; // Import Chart.js

let date1 = new Date();
let dateLocale = date1.toLocaleDateString("Fr-FR", {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
  hour: "numeric",
  minute: "numeric",
  second: "numeric",
});

export default {
  name: "DiagrammeBarreView",
  data: () => ({
    annee: 2021,
  }),
  computed: {
    ...mapState(["diagrammes"]),
  },
  methods: {
    ...mapActions(["getDiagramme"]),
    async renderChart() {
      const labels = this.diagrammes.map((item) => item.iso_pays_car);
      const data = this.diagrammes.map((item) => item.nbr_diabetique);

      const ctx = this.$refs.barChart.getContext("2d");

      if (this.barChart) {
        this.barChart.destroy(); // Destroy previous chart instance if exists
      }

      this.barChart = new Chart(ctx, {
        type: "bar",
        data: {
          labels: labels,
          datasets: [
            {
              label: "Nombre de personnes atteintes",
              data: data,
              backgroundColor: "#ca2b30",
            },
          ],
        },
        options: {
          responsive: true,
          maintainAspectRatio: false,
          scales: {
            x: {
              title: {
                display: true,
                text: "Pays",
              },
            },
            y: {
              title: {
                display: true,
                text: "Nombre de personnes atteintes",
              },
            },
          },
          plugins: {
            legend: {
              display: false,
            },
            title: {
              display: true,
              text: "Diagramme du nombre de personnes atteintes de diabète",
              font: {
                size: 20,
                weight: "bold",
                family: "Poppins",
              },
            },
            subtitle: {
              display: true,
              text: "Données mises à jour le " + dateLocale,
              font: {
                size: 14,
                family: "Poppins",
              },
            },
          },
        },
      });
    },
    async getDiagramme() {
      await this.$store.dispatch("getDiagramme", this.annee);
      this.renderChart();
    },
  },
  mounted() {
    this.getDiagramme();
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

.button {
  background-color: #ca2b30;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}

.button:hover {
  background-color: #f25c54;
}

.hc {
  margin-top: 50px;
}

input {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}
</style>
