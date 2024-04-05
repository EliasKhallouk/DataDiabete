<template>
  <div>
    <CarteMort />
    <br><br><br>
    <hr>
    <DiagrammeMort />
    <br><br><br>
    <hr>
    <LineMort />
  </div>
</template>

<script>
import CarteMort from "../components/CarteMort";
import LineMort from "../components/LineMort";
import DiagrammeMort from "../components/DiagrammeMort";


export default {
  components: {
    DiagrammeMort,
    CarteMort,
    LineMort
  },
};
</script>



