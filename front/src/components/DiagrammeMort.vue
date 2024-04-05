<template>
  <div class="body-diagramme-bare">
    <figure class="highcharts-figure">
      <div id="container2"></div>
    </figure>
    <form>
      <input id="annee" name="annee" v-model="annee" />
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
      <select v-model="developpement">
        <option value="2">Tous les développement</option>
        <option value="1">Développé</option>
        <option value="0">Non développé</option>
      </select>
      <button @click.prevent="getter" class="button">FILTRER</button>
    </form>
    <p>
      Explorez ces graphiques interactifs qui vous permettent de comparer
      diverses informations liées au diabète. Ces graphiques comprennent des
      données sur le nombre de décés par rapport au diabète
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
        <th>Nombre de personnes mort</th>
        <th>Continent</th>
        <th>Développement</th>
      </tr>
      </thead>
      <tbody v-if="!showTable">
      <div v-if="diagrammemort.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in diagrammemort" :key="index">
        <td data-title="Id">{{ ligne.libelle_pays_fr }}</td>
        <td data-title="Id">{{ ligne.nbr_morts }}</td>
        <td data-title="Id">
          {{ ligne.continent_id === 1 ? 'Afrique' : (ligne.continent_id === 2 ? 'Antarctique' : (ligne.continent_id === 3 ? 'Asie' : (ligne.continent_id === 4 ? 'Europe' : (ligne.continent_id === 5 ? 'Amérique du Nord' : (ligne.continent_id === 6 ? 'Océanie' : (ligne.continent_id === 7 ? 'Amérique du Sud' : 'Tous les continents')))))) }}
        </td>
        <td data-title="Id">
          {{ ligne.développement_non_oui === false ? 'non développé' : (ligne.développement_non_oui === true ? 'développé' : (ligne.développement_non_oui === undefined   ? 'tous les développement' : '')) }}
        </td>
      </tr>
      </tbody>

      <tbody v-if="showTable">
      <div v-if="diagrammemort.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in diagrammemort.slice(0,5)" :key="index">
        <td data-title="Id">{{ ligne.libelle_pays_fr }}</td>
        <td data-title="Id">{{ ligne.nbr_morts }}</td>
        <td data-title="Id">
          {{ ligne.continent_id === 1 ? 'Afrique' : (ligne.continent_id === 2 ? 'Antarctique' : (ligne.continent_id === 3 ? 'Asie' : (ligne.continent_id === 4 ? 'Europe' : (ligne.continent_id === 5 ? 'Amérique du Nord' : (ligne.continent_id === 6 ? 'Océanie' : (ligne.continent_id === 7 ? 'Amérique du Sud' : 'Tous les continents')))))) }}
        </td>
        <td data-title="Id">
          {{ ligne.développement_non_oui === false ? 'non développé' : (ligne.développement_non_oui === true ? 'développé' : (ligne.développement_non_oui === undefined   ? 'tous les développement' : '')) }}
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
  name: "DiagrammeMort.vue",
  computed: {
    ...mapState(["diagrammemort"]),
  },
  data: () => ({
    annee: 2011,
    developpement: 2,
    codeCont:8,
    showTable: true,
    moyenne: null,
    ecartType: null,
    max: null,
    min: null,
    chartOptions: {
      chart: {
        type: "column",
        renderTo: "container2",
      },
      title: {
        text: "(TOP 10) Diagramme du nombre de mort de diabète en 2021",
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
          name: "non développé",
          color: "#FF69B4", // Rose
          data: [],
        },
        {
          name: "développé",
          color: "#6495ED", // Bleu
          data: [],
        },
        {
          name: "Tout les développement",
          color: "orange",
          data: [],
        },
      ],
    },
  }),
  methods: {
    ...mapActions(["getDiagrammeMort", "getInfoDiagrammeMort"]),
    toggleTable() {
      this.showTable = !this.showTable;
    },
    getter() {
      console.log("annee", this.annee);
      console.log("developpement", this.developpement);
      console.log("code continent", this.codeCont);
      this.getDiagrammeMort({ annee: this.annee,codeCont: this.codeCont, developpement: this.developpement })
          .then(() => {
            // Destroy the existing chart if it exists
            if (this.chart) {
              this.chart.destroy();
            }

            // Define colors based on codeSexe
            const colors = {
              0: "#FF69B4", // Rose for Femme
              1: "#6495ED", // Bleu for Homme
              undefined: "orange", // No specific color for Homme et Femme
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
                this.diagrammemort.map((item) => ({
                  name: item.libelle_pays_fr,
                  y: parseFloat(item.nbr_morts),
                  color: colors[this.developpement],
                }))
            );

            this.chart.setTitle({
              text:
                  "(TOP 10) Diagramme du nombre de décés diabète en " +
                  this.annee,
            });

          })
          .catch((error) => console.log(error));
      this.getInfoDiagrammeMort({ annee: this.annee, codeCont: this.codeCont, developpement: this.developpement})
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
    console.log("developpement==", this.developpement);
    console.log("code continent==", this.codeCont);
    this.getDiagrammeMort({ annee: this.annee,codeCont: this.codeCont, developpement: this.developpement })
        .then(() => {
          this.chart = new Highcharts.Chart({
            ...this.chartOptions,
            accessibility: {
              enabled: false, // Disable accessibility module
            },
          });

          this.chart.series[0].setData(
              this.diagrammemort.map((item) => ({
                name: item.libelle_pays_fr,
                y: parseFloat(item.nbr_morts),
                color: "orange",
              }))
          );
        })
        .catch((error) => console.log(error));
    this.getInfoDiagrammeMort({ annee: this.annee, codeCont: this.codeCont,developpement: this.developpement})
        .then(result => {
          console.log ("diagrammeresult==", this.annee, this.developpement, this.codeCont, result);
          this.moyenne = result.moyenne;
          this.ecartType = result.ecartType;
          this.max = result.max;
          this.min = result.min;
        })
        .catch((error) => console.log(error));
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

.body-diagramme-bare{
  margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;
}

.deuxieme{
  text-align: justify;

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

input{
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
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
