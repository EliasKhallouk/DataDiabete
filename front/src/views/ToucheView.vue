<template>
  <div>
    <CarteTouche />
    <DiagrammeTouche />
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



