<template>
  <div id="app">
    <el-menu
      :default-active="activeIndex"
      class="el-menu-demo"
      mode="horizontal"
      @select="handleSelect"
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
      <router-link to="/login" v-if="isLoginShow">
        <el-menu-item index="3">
          <font-awesome-icon class="navIcon" icon="sign-in-alt" />Login
        </el-menu-item></router-link
      >
      <el-submenu index="4" v-else>
        <template slot="title">My Page</template>
        <router-link to="/myPage">
          <el-menu-item index="4-1">
            <font-awesome-icon class="navIcon" icon="user-cog" />My Page
          </el-menu-item>
        </router-link>
        <el-menu-item index="4-2" @click="logout"
          ><font-awesome-icon icon="sign-out-alt" class="navIcon" />
          Logout</el-menu-item
        >
      </el-submenu>
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
    handleSelect(key, keyPath) {
      console.log(key, keyPath);
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

.navIcon {
  margin-right: 10px;
  font-size: 16px;
  text-align: center;
}
</style>
