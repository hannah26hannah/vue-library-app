<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      background-color="#545c64"
      text-color="#fff"
      active-text-color="#ffd04b"
    >
      <el-menu-item index="1">
        <router-link to="/">Home</router-link>
      </el-menu-item>
      <el-menu-item index="2">
        <router-link to="/about">About</router-link>
      </el-menu-item>
      <el-menu-item index="3" v-if="isLoginShow">
        <router-link to="/login">Login</router-link>
      </el-menu-item>
      <el-menu-item index="4" v-else @click="logout">Logout</el-menu-item>
    </el-menu>

    <router-view />
  </div>
</template>

<script>
import { authService } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      activeIndex: "1"
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    isLoginShow() {
      return !this.isLoggedIn;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const activeIndex = this.$route.params.activeIndex;
      const currentPath = this.$router.currentPath;
      if (activeIndex) {
        this.activeIndex = activeIndex;
      } else if (!activeIndex && currentPath == "/login") {
        this.activeIndex = "3";
      } else this.activeIndex = "1";
    },
    async logout() {
      try {
        await authService.signOut();
        this.$message({
          message: "정상적으로 로그아웃되었습니다.",
          type: "success"
        });
      } catch (err) {
        this.$message({
          message: `Oops! ${err}`,
          type: "error"
        });
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

  .el-menu-demo {
    display: flex;
    justify-content: flex-end;
  }
  a {
    text-decoration: none;
  }
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
