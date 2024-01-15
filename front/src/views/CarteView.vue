<!--<script setup>
import worldMap from "@highcharts/map-collection/custom/world.topo.json";
import { ref } from "vue";
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
const chartOptions = ref({
  chart: {
    map: worldMap,
  },
  colorAxis: {
    min: 0,
    tickPixelInterval: 60,
    minColor: '#ea698b',
    maxColor: '#47126b',
  },
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
});
</script>-->




<template>
  <div class="body-carte">
    <!-- PREMIERE PARTIE-->
    <highcharts :constructor-type="'mapChart'" :options="chartOptions" style="height: 694px"  />
    <form>
      <input id="annee" name="annee" v-model="annee"/>
      <button @click.prevent="getter" class="button" >CHOISIR L'ANNÉE</button>
    </form>

    <p>
      Explorez notre carte interactive qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte
      vous montre le nombre de décès attribués au diabète dans chaque pays, vous permettant ainsi de comprendre
      l'ampleur du problème à l'échelle internationale. Les données sont régulièrement mises à jour pour vous fournir
      des informations actuelles.
    </p>


    <!-- PREMIERE PARTIE-->
    <!--<div class="deuxieme" >

      <p style="font-size:xx-large">Ce que nous faisons :</p>
      <div style="text-align: justify;padding-right: 38%;">
      <p>
        1. Carte Mondiale de la Mortalité due au Diabète
        Explorez notre carte interactive qui illustre visuellement l'impact du diabète à l'échelle mondiale. Cette carte vous montre le nombre de décès attribués au diabète dans chaque pays, vous permettant ainsi de comprendre l'ampleur du problème à l'échelle internationale. Les données sont régulièrement mises à jour pour vous fournir des informations actuelles.
      </p><p>
        2. Graphiques Comparatifs sur le Diabète
        Nous avons créé des graphiques interactifs qui vous permettent de comparer diverses informations liées au diabète. Ces graphiques comprennent des données sur l'âge des personnes touchées par le diabète, leur pays de résidence, leur sexe, et bien plus encore. Ces visualisations vous aident à identifier les tendances et les disparités dans la prévalence du diabète à travers le monde.
      </p><p>
        3. Graphique d'Histogramme du Prix de l'Insuline par Pays
        L'accès à l'insuline est crucial pour de nombreuses personnes atteintes de diabète. Notre graphique en histogramme vous permet de comparer les prix de l'insuline dans différents pays. Cette information peut être vitale pour les personnes atteintes de diabète qui doivent gérer les coûts de leur traitement. Nous nous efforçons de maintenir ces données à jour pour vous aider à prendre des décisions éclairées.
      </p>
      </div>
      <div style="float: right;position: absolute;"><img style="height: 510px;width: 352px;margin-left: 228%;margin-top: -492px;" src="../assets/carte.png" alt="Image 1" /></div>
      deeeee
    </div>
    azazzaza-->

    <table>
      <thead>
      <tr>
        <th>Pays</th><th>Nombre de personnes mortes</th>
      </tr>
      </thead>
      <tbody>
      <div v-if="cartes.length <=0">pas d'utilisateur</div>
      <tr v-for="(ligne, index) in cartes" :key="index">
        <td data-title="Id">{{ligne.iso_pays_car}}</td>
        <td data-title="Id">{{ligne.nbr_morts}}</td>
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
  name: "connexion-form",
  //name: 'ChartDisplay',
  components: { highcharts: Chart },
  props: {
    msg: String,
  },
  data: () => ({
    annee:2021,
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
    ...mapActions(['getCarte']),
    getter(){
      this.getCarte(this.annee).
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
      }).catch((error) => console.log(error))
    }
  },
  mounted() {
    this.getCarte(this.annee).
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
    console.log(this.chartOptions.series[0].data);
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


</style>
