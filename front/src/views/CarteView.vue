<script setup>
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
      data: [
        ["fo", 0],
        //["um", 1],
        ["us", 2],
        ["jp", 3],
        //["sc", 4],
        ["in", 5],
        //["fr", 6],
        ["fm", 7],
        ["cn", 8],
        ["pt", 9],
        ["sw", 10],
        ["sh", 11],
        ["br", 12],
        //["ki", 13],
        ["ph", 14],
        ["mx", 15],
        ["es", 16],
        ["bu", 17],
        ["mv", 18],
        ["sp", 19],
        ["gb", 20],
        ["gr", 21],
        //["as", 22],
        ["dk", 23],
        ["gl", 24],
        //["gu", 25],
        ["mp", 26],
        ["pr", 27],
        ["vi", 28],
        ["ca", 29],
        ["st", 30],
        //["cv", 31],
        //["dm", 32],
        ["nl", 33],
        ["jm", 34],
        //["ws", 35],
        ["om", 36],
        ["vc", 37],
        ["tr", 38],
        ["bd", 39],
        //["lc", 40],
        //["nr", 41],
        ["no", 42],
        //["kn", 43],
        ["bh", 44],
        //["to", 45],
        ["fi", 46],
        ["id", 47],
        ["mu", 48],
        ["se", 49],
        ["tt", 50],
        ["my", 51],
        ["pa", 52],
        ["pw", 53],
        //["tv", 54],
        //["mh", 55],
        ["cl", 56],
        ["th", 57],
        //["gd", 58],
        ["ee", 59],
        ["ag", 60],
        ["tw", 61],
        ["bb", 62],
        ["it", 63],
        ["mt", 64],
        //["vu", 65],
        ["sg", 66],
        ["cy", 67],
        ["lk", 68],
        ["km", 69],
        //["fj", 70],
        ["ru", 71],
        ["va", 72],
        ["sm", 73],
        ["kz", 74],
        ["az", 75],
        ["tj", 76],
        ["ls", 77],
        ["uz", 78],
        ["ma", 79],
        ["co", 80],
        ["tl", 81],
        ["tz", 82],
        ["ar", 83],
        ["sa", 84],
        ["pk", 85],
        ["ye", 86],
        ["ae", 87],
        ["ke", 88],
        ["pe", 89],
        ["do", 90],
        ["ht", 91],
        ["pg", 92],
        ["ao", 93],
        ["kh", 94],
        ["vn", 95],
        ["mz", 96],
        ["cr", 97],
        ["bj", 98],
        ["ng", 99],
        ["ir", 100],
        ["sv", 101],
        ["sl", 102],
        ["gw", 103],
        ["hr", 104],
        ["bz", 105],
        ["za", 106],
        ["cf", 107],
        ["sd", 108],
        ["cd", 109],
        ["kw", 110],
        ["de", 111],
        ["be", 112],
        ["ie", 113],
        ["kp", 114],
        ["kr", 115],
        ["gy", 116],
        ["hn", 117],
        ["mm", 118],
        ["ga", 119],
        ["gq", 120],
        ["ni", 121],
        ["lv", 122],
        ["ug", 123],
        ["mw", 124],
        ["am", 125],
        ["sx", 126],
        ["tm", 127],
        ["zm", 128],
        ["nc", 129],
        ["mr", 130],
        ["dz", 131],
        ["lt", 132],
        ["et", 133],
        ["er", 134],
        ["gh", 135],
        ["si", 136],
        ["gt", 137],
        ["ba", 138],
        ["jo", 139],
        ["sy", 140],
        ["mc", 141],
        ["al", 142],
        ["uy", 143],
        ["cnm", 144],
        ["mn", 145],
        ["rw", 146],
        ["so", 147],
        ["bo", 148],
        ["cm", 149],
        ["cg", 150],
        ["eh", 151],
        ["rs", 152],
        ["me", 153],
        ["tg", 154],
        ["la", 155],
        ["af", 156],
        ["ua", 157],
        ["sk", 158],
        ["jk", 159],
        ["bg", 160],
        ["qa", 161],
        ["li", 162],
        ["at", 163],
        ["sz", 164],
        ["hu", 165],
        ["ro", 166],
        ["ne", 167],
        ["lu", 168],
        ["ad", 169],
        ["ci", 170],
        ["lr", 171],
        ["bn", 172],
        ["iq", 173],
        ["ge", 174],
        ["gm", 175],
        ["ch", 176],
        ["td", 177],
        ["kv", 178],
        ["lb", 179],
        ["dj", 180],
        ["bi", 181],
        ["sr", 182],
        ["il", 183],
        ["ml", 184],
        ["sn", 185],
        ["gn", 186],
        ["zw", 187],
        ["pl", 188],
        ["mk", 189],
        ["py", 190],
        ["by", 191],
        ["cz", 192],
        ["bf", 193],
        ["na", 194],
        ["ly", 195],
        ["tn", 196],
        ["bt", 197],
        ["md", 198],
        ["ss", 199],
        ["bw", 200],
        ["bs", 201],
        ["nz", 202],
        ["cu", 203],
        ["ec", 204],
        ["au", 205],
        ["ve", 206],
        ["sb", 207],
        ["mg", 208],
        ["is", 209],
        ["eg", 210],
        ["kg", 211],
        ["np", 212],
      ],
    },
  ],
});
</script>
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
        <th>iso_pays_car</th><th>nbr_morts</th><th>annee</th>
      </tr>
      </thead>
      <tbody>
      <div v-if="cartes.length <=0">pas d'utilisateur</div>
      <tr v-for="(ligne, index) in cartes" :key="index">
        <td data-title="Id">{{ligne.iso_pays_car}}</td>
        <td data-title="Id">{{ligne.nbr_morts}}</td>
        <td data-title="Id">{{ligne.annee}}</td>
      </tr>
      </tbody>
    </table>


  </div>
</template>

<script>
import {mapActions, mapState} from "vuex";

export default {
  name: "connexion-form",
  props: {
    msg: String,
  },
  data: () => ({
    annee:'',
  }),
  computed: {
    ...mapState(['cartes'])
  }, methods : {
    ...mapActions(['getCarte']),
    getter(){
      this.getCarte(this.annee)
    }
  },
  mounted() {
    this.getCarte(this.annee).
    then( () => {
      console.log("POPO")
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
  text-align: left;
  padding: 8px;
}

tr:nth-child(even){background-color: #f2f2f2}

th {
  background-color: #ca2b30;
  color: white;
}


</style>
