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
        <th>iso_pays_car</th><th>nbr_morts</th>
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
      colorAxis: {
        min: 0,
        tickPixelInterval: 60,
        minColor: '#F8EDEB',
        maxColor: '#F25C54',
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
        //console.log(item.iso_pays_car, item.nbr_morts);
        const tabTemp = [item.iso_pays_car, item.nbr_morts]
        this.chartOptions.series[0].data.push(tabTemp);

      })
      //console.log(this.chartOptions.series[0].data);
      //console.log(this.testData);
    }).catch((error) => console.log(error))
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
