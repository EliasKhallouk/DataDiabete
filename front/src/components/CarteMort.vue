<template>
  <div class="body-carte">
    <!-- PREMIERE PARTIE-->
      <highcharts :constructor-type="'mapChart'" :options="chartOptions" style="height: 694px"  />
    <form>
      <input id="annee" name="annee" v-model="annee"/>
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
      <button @click.prevent="getter" class="button" >FILTRER</button>
    </form>

    <p>
      Explorez notre carte interactive qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte
      vous montre le nombre de décès attribués au diabète dans chaque pays, vous permettant ainsi de comprendre
      l'ampleur du problème à l'échelle internationale. Les données sont régulièrement mises à jour pour vous fournir
      des informations actuelles.
    </p>

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
        <th>Pays</th><th>Nombre de personnes mortes</th><th>Continents</th><th>Développement</th>
      </tr>
      </thead>
      <tbody v-if="!showTable">
      <div v-if="cartes.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in cartes" :key="index">
        <td data-title="Id">{{ligne.name_pays}}</td>
        <td data-title="Id">{{ligne.nbr_morts}}</td>
        <td data-title="Id">
          {{ ligne.continent_id === 1 ? 'Afrique' : (ligne.continent_id === 2 ? 'Antarctique' : (ligne.continent_id === 3 ? 'Asie' : (ligne.continent_id === 4 ? 'Europe' : (ligne.continent_id === 5 ? 'Amérique du Nord' : (ligne.continent_id === 6 ? 'Océanie' : (ligne.continent_id === 7 ? 'Amérique du Sud' : 'Tous les continents')))))) }}
        </td>
        <td data-title="Id">
          {{ ligne.développement_non_oui === false ? 'non développé' : (ligne.développement_non_oui === true ? 'développé' : (ligne.développement_non_oui === undefined   ? 'tous les développement' : '')) }}
        </td>
      </tr>
      </tbody>

      <tbody v-if="showTable">
      <div v-if="cartes.length <=0">pas de pays</div>
      <tr v-for="(ligne, index) in cartes.slice(0,5)" :key="index">
        <td data-title="Id">{{ligne.name_pays}}</td>
        <td data-title="Id">{{ligne.nbr_morts}}</td>
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
import worldMap from "@highcharts/map-collection/custom/world.topo.json";
import {Chart} from "highcharts-vue";
import {ref} from "vue";


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
  name: "CarteTouche",
  //name: 'ChartDisplay',
  components: { highcharts: Chart },
  props: {
    msg: String,
  },
  data: () => ({
    annee:2021,
    moyenne:null,
    ecartType:null,
    plusGrand:null,
    plusPetit:null,
    showTable: true,
    developpement: 2,
    codeCont:8,
    chartOptions: ref({
      chart: {
        map: worldMap,
      },
      /*colorAxis: {
        min: 0,
        tickPixelInterval: 60,
        max: 10000,
        minColor: '#deb5b5',
        maxColor: '#ff0000',
      },*/
      colorAxis: {
        dataClasses: [
          {
            from: 0,
            to: 10000,
            color: '#FFF5F5', // Couleur pour les valeurs de 0 à 10 000
            name: '0-10,000'
          },
          {
            from: 10001,
            to: 20000,
            color: '#FFCCCC', // Couleur pour les valeurs de 10 001 à 20 000
            name: '10,001-20,000'
          },
          {
            from: 20001,
            to: 30000,
            color: '#FFB2B2', // Couleur pour les valeurs de 20 001 à 30 000
            name: '20,001-30,000'
          },
          {
            from: 30001,
            to: 40000,
            color: '#FF9999', // Couleur pour les valeurs de 30 001 à 40 000
            name: '30,001-40,000'
          },
          {
            from: 40001,
            to: 50000,
            color: '#FF7F7F', // Couleur pour les valeurs de 40 001 à 50 000
            name: '40,001-50,000'
          },
          {
            from: 50001,
            to: 60000,
            color: '#FF6666', // Couleur pour les valeurs de 50 001 à 60 000
            name: '50,001-60,000'
          },
          {
            from: 60001,
            to: 70000,
            color: '#FF4C4C', // Couleur pour les valeurs de 60 001 à 70 000
            name: '60,001-70,000'
          },
          {
            from: 70001,
            to: 80000,
            color: '#FF3333', // Couleur pour les valeurs de 70 001 à 80 000
            name: '70,001-80,000'
          },
          {
            from: 80001,
            to: 90000,
            color: '#FF1919', // Couleur pour les valeurs de 80 001 à 90 000
            name: '80,001-90,000'
          },
          {
            from: 90001,
            to: 100000,
            color: '#FF0000', // Couleur pour les valeurs de 90 001 à 100 000
            name: '90,001-100,000'
          },
          {
            from: 100001,
            to: 100000000,
            color: '#CC0000', // Couleur pour les valeurs de 100 001 à 1 000 000
            name: '100,001-100,000,000'
          },
        ],
      },
      title: {
        text: 'Carte Mondiale de la Mortalité due au Diabète en 2021',
        margin: 50,
        style: {
          color: '#000000',
          fontWeight: 'bold',
          fontSize: '36px',
          fontFamily: 'Poppins'
        }
      },
      subtitle: {
        text: 'Données mises à jour le '+dateLocale+
            '<br> Astuce : double-cliquez sur un pays pour zoomer',
        margin: 50,
        style: {
          color: '#BABABA',
          fontSize: '18px',
          fontFamily: 'Poppins'
        }
      },
      mapNavigation: {
        enabled: true,
        buttonOptions: {
          verticalAlign: 'bottom'
        },
        enableDoubleClickZoomTo: true,
      },
      legend: {
        title: {
          text: 'Nombre de morts en millier'
        },
        backgroundColor: '#FFFFFF',
        align: 'right',
        verticalAlign: 'top',
        layout: 'vertical',
        x: 0,
        y: 100
      },
      series: [
        {
          animation: true,
          name: "MORTS",
          states: {
            hover: {
              color: "#F8EDEB ",
            },
          },
          dataLabels: {
            enabled: false,
            format: "{point.name}",
          },
          nullColor: '#EFEFEF',
          allAreas: true,
          data:[],
        },
      ],
    }),
  }),
  computed: {
    ...mapState(['cartes'])
  }, methods : {
    ...mapActions(['getCarte','getInfoCarte']),
    toggleTable() {
      this.showTable = !this.showTable;
    },
    getter(){
      this.getCarte({ annee: this.annee, codeCont: this.codeCont, developpement: this.developpement}).
      then( () => {
        //console.log("RES : "+res);
        this.chartOptions.series[0].data= [];
        this.chartOptions.title.text ='';
        this.cartes.forEach((item) => {
          //console.log(item.iso_pays_car, item.nbr_morts);
          const tabTemp = [item.iso_pays_car, item.nbr_morts]
          this.chartOptions.series[0].data.push(tabTemp);
        })
        this.chartOptions.title.text='Carte Mondiale de la Mortalité due au Diabète en '+this.annee;
        //console.log(this.chartOptions.series[0].data);
      }).catch((error) => console.log(error));
      console.log("+"+this.chartOptions.series[0].data);
      this.getInfoCarte({ annee: this.annee, codeCont: this.codeCont, developpement: this.developpement})
          .then(result => {
            console.log("result :"+ result);
            this.moyenne = result.moyenne;
            this.ecartType = result.ecartType;
            this.plusGrand = result.paysMaxMorts.name_pays;
            this.plusPetit = result.paysMinMorts.name_pays;
            console.log("moyenne :"+ result.moyenne)
          })
          .catch(error => {
            console.log(error);
            this.moyenne = null;
            this.ecartType = null;
            this.plusGrand = null;
            this.plusPetit = null;
          });
    }
  },
  mounted() {
    this.getCarte({ annee: this.annee, codeCont: this.codeCont, developpement: this.developpement}).
    then( () => {
      this.cartes.forEach((item) => {
        //console.log(item);
        //console.log(item.iso_pays_car, item.nbr_morts);
        const tabTemp = [item.iso_pays_car, item.nbr_morts]
        this.chartOptions.series[0].data.push(tabTemp);
      })
      //console.log(this.chartOptions.series[0].data);
      //console.log(this.testData);
    }).catch((error) => console.log(error))
    console.log("+"+this.chartOptions.series[0].data);
    this.getInfoCarte({ annee: this.annee, codeCont: this.codeCont, developpement: this.developpement})
        .then(result => {
          console.log("result :"+ result);
          this.moyenne = result.moyenne;
          this.ecartType = result.ecartType;
          this.plusGrand = result.paysMaxMorts.name_pays;
          this.plusPetit = result.paysMinMorts.name_pays;
          console.log("moyenne :"+ result.moyenne)
        })
        .catch(error => {
          console.log(error);
          this.moyenne = null;
          this.ecartType = null;
          this.plusGrand = null;
          this.plusPetit = null;
        });
  }
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
