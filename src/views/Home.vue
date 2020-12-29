<template>
  <div class="home">
    <h1>어서오세요, {{ isMember ? userName : "Visitor" }}님!</h1>
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
    ...mapGetters(["isLoggedIn", "user"]),
    isMember() {
      return this.isLoggedIn;
    },
    userName() {
      return this.user.displayName;
    }
  }
};
</script>
