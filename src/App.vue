<template>
  <div id="app">
    <the-header />
    <router-view />
    <ScrollUp :scroll-duration="1000" :scroll-y="250" />
  </div>
</template>

<script>
import theHeader from "@/components/header.vue";
import ScrollUp from "vue-scroll-up";

export default {
  components: {
    theHeader,
    ScrollUp
  }
};
</script>
