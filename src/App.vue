<template>
  <div id="app">
    <the-header />
    <router-view class="router-section" />
    <ScrollUp :scroll-duration="1000" :scroll-y="250" />
    <the-footer />
  </div>
</template>

<script>
import theHeader from "@/components/header.vue";
import theFooter from "@/components/footer.vue";
import ScrollUp from "vue-scroll-up";

export default {
  components: {
    theHeader,
    ScrollUp,
    theFooter
  }
};
</script>
