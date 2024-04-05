<template>
  <div style="margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;">
    <h1>Rapport Visualisation</h1>
    <p>
      Tous les graphiques et diagrammes ont été fait avec python
    </p>
    <div class="stats-group">
      <div id="gauche1">
        <img src="../assets/graphique1.png" width="600" height="450">
      </div>
      <div id="droite1">
        <p>
          L’année 2011 a été choisie car c’est l’année qui comporte le plus de données.
          <br>
          On peut noter que l’Asie est le continent qui comporte le plus de diabétiques dans le monde entier tandis que l’Océanie et l’Afrique sont les continents avec le moins. Cependant, l’Asie est le continent avec le plus d’habitants dans le monde, en comparaison, l’Afrique est un continent avec de nombreux pays en voie de développement. Il va donc falloir fouiller un peu plus.
        </p>
      </div>
    </div>
    <br>
    <div class="stats-group">
      <div id="gauche2">
        <p>
          En prenant en compte cette fois ci le taux de diabétiques, on se rend compte que l’Asie n’est finalement pas si touchée que ça en comparaison de l’Europe, de l’Amérique du Sud et surtout de l’Amérique du Nord.
        </p>

      </div>
      <div id="droite2">
        <img src="../assets/graphique2.png" width="750" height="450">
      </div>
    </div>
    <br>
    <div class="stats-group">
      <div id="gauche3">
        <img src="../assets/graphique3.png" width="750" height="450">
      </div>
      <div id="droite3">
        <p>
          Lorsque l’on compare au taux d’obèses, on peut voir une corrélation : l’Afrique et l’Asie se retrouvent une nouvelle fois derniers tandis que l’Amérique du Nord est en tête de loin. On peut ainsi pointer une des causes : la malbouffe. En effet, l’Amérique du Nord et en particulier les Etats Unis sont connus pour les produits ultra transformés et l’hyper consommation de fast food.
          <br>
          En revanche, le classement des décès est bien différent.
        </p>
      </div>
    </div>

    <br>
    <div class="stats-group">
      <div id="gauche4">
        <p>
          L’Amérique du Nord est cette fois ci avant dernière en nombre de décès, au contraire de l’Asie et de l’Afrique qui sont bien au-dessus des autres continents.
        </p>
      </div>
      <div id="droite4">
        <img src="../assets/graphique4.png" width="750" height="450">
      </div>
    </div>

    <div class="stats-group">
      <div id="gauche">
        <img src="../assets/graphique5.png" width="450" height="600">
      </div>
      <div id="droite">
        <p>
          En observant la part de pays développés (en bleu) par rapport aux pays en voie de développement (en rouge). On peut noter que l’Asie et l’Afrique ont un pourcentage de pays développés très faible. On peut ainsi justifier le nombre de décès élevé : les pays en voie de développement n’ont pas les moyens de soigner les malades.
        </p>
        <br>
        <p>
          Observons maintenant l’évolution du nombre de diabètes par an, et comparons-le avec le nombre d’obèses par an (le tout dans le monde entier) :
        </p>
      </div>
    </div>

    <div class="stats-group">
      <div id="gauche">
        <img src="../assets/graphique7.png" width="900" height="600">
      </div>
      <div id="droite">
        <p>
          Cette carte de chaleur nous permet de déduire que les hommes sont plus touchés que les femmes en général dans le monde. A noter que l’échelle choisie étant continentale, il y a parfois des cas ou les femmes sont plus touchées que les hommes, selon la région. Mis à part des différences biologiques, rien ne permet de justifier cette différence.
        </p>
        <br>
        <p>
          Et enfin, on peut observer les pays les plus touchés au monde :
        </p>
      </div>
    </div>

    <div class="stats-group">
      <div id="gauche">
        <img src="../assets/graphique6.png" width="1050" height="600">
      </div>
      <div id="droite">
        <p>
          Il est intéressant de noter que ces pays ne sont pas systématiquement dans les continents les plus touchés par le diabète, ce qui confirme que selon l’échelle les statistiques peuvent varier..
        </p>
        <br>
        <p>
          Mais nous pouvons nous attarder sur Nauru, qui est, en plus d’être le quatrième pays le plus touché par le diabète, le troisième pays touché par l’obésité. Cette île a connu une augmentation de richesses rapide vers la fin du XXème siècle, ce qui la classait parmi les pays les plus riches du monde. Cette augmentation de richesses soudaine a amené les habitants à vouloir adopter un mode de vie « occidental ». C’est-à-dire avoir une sédentarité plus prononcée et des habitudes alimentaires largement moins saines (les habitants sont passés de la pêche aux fast foods et aux plats préparés). La consommation d’alcool a elle aussi largement augmentée. L’aspect néfaste a été amplifié par le changement brutal de mode de vie. Au final, Nauru était, durant ses pires, années, le pays avec le plus d’obèses dans le monde (90%) et de diabétiques de type II (40%).
          <br>
          Cette exemple nous montre qu’il est primordial pour nous d’avoir une activité physique régulière ainsi que des habitudes alimentaires saines.
        </p>
      </div>
    </div>


  </div>
</template>


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
  padding: 5em;
  text-align: justify;
}

.stats-group #gauche1 {
  float:left;
  width:60%;
}
.stats-group #droite1 {
  margin-left:60%;
  padding-top: 50px;

}

.stats-group #gauche2 {
  float: left;
  width: 39%;
  padding-top: 197px;
}
.stats-group #droite2 {
  margin-left: 51%;
  padding-top: 50px;
}

.stats-group #gauche3 {
  float: left;
  width: 39%;
  margin-top: -53px;
}
.stats-group #droite3 {
  margin-left: 60%;
  padding-top: 50px;
}

.stats-group #droite4 {
  float: left;
  width: 51%;
  padding-top: 50px;
}

.stats-group #gauche4 {
  float: left; width: 49%; padding-top: 208px;
}

select {
  padding: 10px 20px;
  border: 1px solid #ccc;
  border-radius: 4px;
  font-size: 18px;
  margin-left: 10px;
}
</style>
