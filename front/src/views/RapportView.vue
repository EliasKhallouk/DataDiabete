<template>
  <div style="margin-top: 150px;
  padding-right: 8%;
  padding-left: 8%;">
    <h1>This is an about page</h1>
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
