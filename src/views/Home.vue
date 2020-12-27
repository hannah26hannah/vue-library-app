<template>
  <div class="home">
    <h1>Hello, {{ isMember ? "Member" : "Visitor" }}!</h1>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Home",
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    isMember() {
      return this.isLoggedIn;
    }
  }
};
</script>
