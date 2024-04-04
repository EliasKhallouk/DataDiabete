<template>
  <div style="margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;">
    <figure class="highcharts-figure">
      <div id="containerLine"></div>
    </figure>
    <div class="stats-group">
      <div id="gauche">
        <p>Moyenne : {{ moyenne }}</p>
        <p>Ecart-type : {{ ecartType }}</p>
      </div>
      <div id="droite">
        <p>Plus grand: {{plusGrand}}</p>
        <p>Plus petit: {{plusPetit}}</p>
      </div>
    </div>
    <button @click="toggleTable" class="button">{{ showTable ? 'Afficher le tableau' : 'Rétrécir le tableau'  }}</button>
    <table>
      <thead>
      <tr>
        <th>Année</th>
        <th>Nombre de personne diabétique</th>
      </tr>
      </thead>
      <tbody v-if="!showTable">
      <div v-if="lines.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in lines" :key="index">
        <td data-title="Id">{{ligne.annee}}</td>
        <td data-title="Id">{{ligne.total_diabetique}}</td>
      </tr>
      </tbody>

      <tbody v-if="showTable">
        <div v-if="lines.length <=0">pas de pays</div>
        <tr v-for="(ligne, index) in lines.slice(0, 5)" :key="index">
          <td data-title="Id">{{ligne.annee}}</td>
          <td data-title="Id">{{ligne.total_diabetique}}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";
import Highcharts from "highcharts";

export default {
  name: "LineTouche.vue",
  computed: {
    ...mapState(["lines"]),
  },
  data: () => ({
    showTable: true,
    moyenne:null,
    ecartType:null,
    plusGrand:null,
    plusPetit:null,
    chartOptions: {
      chart: {
        type: "line",
        renderTo: "containerLine",
      },
      title: {
        text: "Population mondiale atteintes de diabète depuis l'an 1980",
        margin: 50,
        style: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: '36px',
          fontFamily: 'Poppins'
        }
      },
      xAxis: {
        accessibility: {
          rangeDescription: 'Range: 1980 to 2014'
        }
      },
      yAxis: {
        title: {
          text: "Nombre de personnes atteintes",
        },
      },
      series: [
        {
          name: "Nombre personnes atteintes",
          color: "#FF69B4", // Rose
          data:[],
        }
      ],
      plotOptions: {
        series: {
          label: {
            connectorAllowed: false
          },
          pointStart: 1980
        }
      },
    },
  }),
  methods: {
    ...mapActions(["getLineTouche","getInfoLineTouche"]),
    toggleTable() {
      this.showTable = !this.showTable;
    },
  },
  mounted() {
    this.getLineTouche()
        .then(() => {
          if (this.chart) {
            this.chart.destroy();
          }
          this.chart = new Highcharts.Chart({
            ...this.chartOptions,
            accessibility: {
              enabled: false,
            },
          });
          let data = [];
          for (let year = 1980; year <= 2014; year++) {
            let found = false;
            this.lines.forEach((item) => {
              if (item.annee === year) {
                data.push({
                  name: item.annee,
                  y: parseFloat(item.total_diabetique),
                  color: "orange",
                });
                found = true;
              }
            });
            if (!found) {
              data.push({
                name: "",
                y: 0,
                color: "orange",
              });
            }
          }

          this.chart.series[0].setData(data);

          this.chart.setTitle({
            text:
                "Population mondiale atteintes de diabète depuis l'an 1980"
          });

          //this.chartOptions.title.text='Carte Mondiale de la Mortalité due au Diabète en '+this.annee;
        })
        .catch((error) => console.log(error));

    this.getInfoLineTouche()
        .then(result => {
          console.log("result :"+ result);
          this.moyenne = result.moyenne;
          this.ecartType = result.ecartType;
          this.plusGrand = result.paysMaxMorts.annee;
          this.plusPetit = result.paysMinMorts.annee;
          console.log("moyenne :"+ result.moyenne)
        })
        .catch(error => {
          console.log(error);
          this.moyenne = null;
          this.ecartType = null;
          this.plusGrand = null;
          this.plusPetit = null;
        });
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
