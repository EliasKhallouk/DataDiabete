<template>
  <div>
    <CarteTouche />
    <br><br><br>
    <hr>
    <DiagrammeTouche />
    <br><br><br>
    <hr>
    <LineTouche />
  </div>
</template>

<script>
import CarteTouche from "../components/CarteTouche";
import DiagrammeTouche from "../components/DiagrammeTouche"
import LineTouche from "../components/LineTouche";

export default {
  components: {
    DiagrammeTouche,
    CarteTouche,
    LineTouche
  },
};
</script>



