<template>
  <div class="home">
    <h1>
      어서오세요,
      <span style="color: #ffd04b;"
        >{{ isMember ? userName : "Visitor" }}님!</span
      >
    </h1>
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
