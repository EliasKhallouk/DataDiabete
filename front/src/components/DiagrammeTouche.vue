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
      </select>
      <select v-model="codeCont">
        <option value="8">Tous les continents</option>
        <option value="1">Afrique</option>
        <option value="2">Antartique</option>
        <option value="3">Asie</option>
        <option value="4">Europe</option>
        <option value="5">Amerique du Nord</option>
        <option value="6">Oceanie</option>
        <option value="7">Amerique du Sud</option>
      </select>
      <button @click.prevent="getter" class="button">FILTRER</button>
    </form>
    <p>
      Explorez ces graphiques interactifs qui vous permettent de comparer
      diverses informations liées au diabète. Ces graphiques comprennent des
      données sur la nationnalité des personnes touchées par le diabète, leur sexe,
      et bien plus encore, sur les pays les plus touché. Ces visualisations vous aident à identifier les
      tendances et les disparités dans la prévalence  du diabète à travers le monde.
    </p>
    <div class="stats-group">
      <div id="gauche">
        <p>Moyenne : {{ moyenne }}</p>
        <p>Ecart-type : {{ ecartType }}</p>
      </div>
      <div id="droite">
        <p>Plus grand: {{max}}</p>
        <p>Plus petit: {{min}}</p>
      </div>
    </div>
    <button @click="toggleTable" class="button">{{ showTable ? 'Afficher le tableau' : 'Rétrécir le tableau'  }}</button>
    <table>
      <thead>
      <tr>
        <th>Pays</th>
        <th>Nombre de personnes atteints</th>
        <th>Sexe</th>
        <th>Continent</th>
      </tr>
      </thead>
      <tbody v-if="!showTable">
      <div v-if="diagrammes.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in diagrammes" :key="index">
        <td data-title="Id">{{ ligne.iso_pays_car }}</td>
        <td data-title="Id">{{ ligne.nbr_diabetique }}</td>
        <td data-title="Id">
          {{ ligne.code_sexe === '[Homme, Femme]' ? 'homme et femme' : (ligne.code_sexe === '0' ? 'femme' : (ligne.code_sexe === '1' ? 'homme' : '')) }}
        </td>
        <td data-title="Id">
          {{ ligne.continent_id === 1 ? 'Afrique' : (ligne.continent_id === 2 ? 'Antarctique' : (ligne.continent_id === 3 ? 'Asie' : (ligne.continent_id === 4 ? 'Europe' : (ligne.continent_id === 5 ? 'Amérique du Nord' : (ligne.continent_id === 6 ? 'Océanie' : (ligne.continent_id === 7 ? 'Amérique du Sud' : 'Tous les continents')))))) }}
        </td>
      </tr>
      </tbody>

      <tbody v-if="showTable">
      <div v-if="diagrammes.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in diagrammes.slice(0,5)" :key="index">
        <td data-title="Id">{{ ligne.iso_pays_car }}</td>
        <td data-title="Id">{{ ligne.nbr_diabetique }}</td>
        <td data-title="Id">
          {{ ligne.code_sexe === '[Femme, Homme]' ? 'homme et femme' : (ligne.code_sexe === '[Femme]' ? 'femme' : (ligne.code_sexe === '[Homme]' ? 'homme' : '')) }}
        </td>
        <td data-title="Id">
          {{ ligne.continent_id === 1 ? 'Afrique' : (ligne.continent_id === 2 ? 'Antarctique' : (ligne.continent_id === 3 ? 'Asie' : (ligne.continent_id === 4 ? 'Europe' : (ligne.continent_id === 5 ? 'Amérique du Nord' : (ligne.continent_id === 6 ? 'Océanie' : (ligne.continent_id === 7 ? 'Amérique du Sud' : 'Tous les continents')))))) }}
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
    codeSexe: 2,
    codeCont:8,
    showTable: true,
    moyenne: null,
    ecartType: null,
    max: null,
    min: null,
    chartOptions: {
      chart: {
        type: "column",
        renderTo: "container",
      },
      title: {
        text: "(TOP 10) Diagramme du nombre de personnes atteintes de diabète en 2014",
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
        {
          name: "Homme et Femme",
          color: "orange",
          data: [],
        },
      ],
    },
  }),
  methods: {
    ...mapActions(["getDiagramme", "getInfoDiagramme"]),
    toggleTable() {
      this.showTable = !this.showTable;
    },
    getter() {
      console.log("annee", this.annee);
      console.log("code sexe", this.codeSexe);
      console.log("code continent", this.codeCont);
      this.getDiagramme({ annee: this.annee, codeSexe: this.codeSexe, codeCont: this.codeCont })
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
                  "(TOP 10) Diagramme du nombre de personnes atteintes de diabète en " +
                  this.annee,
            });

          })
          .catch((error) => console.log(error));
      this.getInfoDiagramme({ annee: this.annee, codeSexe: this.codeSexe, codeCont: this.codeCont })
          .then(result => {
            console.log ("diagrammeresult==", result);
            this.moyenne = result.moyenne;
            this.ecartType = result.ecartType;
            this.max = result.max;
            this.min = result.min;
          })
          .catch((error) => console.log(error));
    },

  },
  mounted() {
    console.log("annee==", this.annee);
    console.log("code sexe==", this.codeSexe);
    console.log("code continent==", this.codeCont);
    this.getDiagramme({ annee: this.annee, codeSexe: this.codeSexe , codeCont: this.codeCont})
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
                color: "orange", // Default color if codeSexe is not specified
              }))
          );
        })
        .catch((error) => console.log(error));
    this.getInfoDiagramme({ annee: this.annee, codeSexe: this.codeSexe, codeCont: this.codeCont })
        .then(result => {
          console.log ("diagrammeresult==", this.annee, this.codeSexe, this.codeCont, result);
          this.moyenne = result.moyenne;
          this.ecartType = result.ecartType;
          this.max = result.max;
          this.min = result.min;
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

.stats-group {
  --b: .5em; /* border width */
  --c: 3em; /* corner size */
  --r: 2em; /* corner rounding */
  position: relative;
  margin: 1em auto;
  border: solid var(--b) transparent;
  padding: 1em;
  max-width: 804px;
  font: 1.25em ubuntu, sans-serif;

  &::before {
     position: absolute;
     z-index: -1;
     inset: calc(-1*var(--b));
     border: inherit;
     border-radius: var(--r);
     background: linear-gradient(orange, deeppink, purple) border-box;
     --corner:
         conic-gradient(from -90deg at var(--c) var(--c), red 25%, #0000 0)
         0 0/ calc(100% - var(--c))  calc(100% - var(--c)) border-box;
     --inner: conic-gradient(red 0 0 ) padding-box;
     -webkit-mask: var(--corner), var(--inner);
     -webkit-mask-composite: source-out;
     mask: var(--corner) subtract, var(--inner);
     content: ''
   }
}

.stats-group #gauche {
  float:left;
  width:60%;
}
.stats-group #droite {
  margin-left:60%
}

select {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}
</style>