<template>
  <div class="challenge">
    <dash-board />
  </div>
</template>
<script>
import dashBoard from "@/components/slices/DashBoard.vue";
export default {
  name: "Challenge",
  components: {
    dashBoard
  }
};
</script>
