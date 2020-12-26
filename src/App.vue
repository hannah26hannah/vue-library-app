<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">About</router-link> |
      <router-link to="/login">{{
        isLoggedIn ? "My Page" : "Login"
      }}</router-link>
      <button v-if="isLoggedIn" @click="logout">Logout</button>
    </div>
    <router-view />
  </div>
</template>

<script>
import { authService } from "@/firebase";

export default {
  data() {
    return {
      isLoggedIn: false
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user != null) {
        this.isLoggedIn = true;
      }
    },
    async logout() {
      try {
        await authService.signOut();
        this.$router.push("/");
      } catch (err) {
        console.log(err);
      }
    }
  }
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
