<template>
  <el-menu
    :default-active="activeIndex"
    class="header-container"
    mode="horizontal"
    @select="handleSelect"
    background-color="#FBFBFD"
    text-color="#37447E"
    active-text-color="#B33771"
  >
    <el-menu-item index="1">
      <router-link to="/">Home</router-link>
    </el-menu-item>
    <el-menu-item index="2">
      <router-link to="/challenge">Challenge</router-link>
    </el-menu-item>
    <el-menu-item index="3">
      <router-link to="/book">Book</router-link>
    </el-menu-item>
    <el-menu-item index="4">
      <router-link to="/timeline">Timeline</router-link>
    </el-menu-item>
    <router-link to="/login" v-if="isLoginShow">
      <el-menu-item index="5">
        <font-awesome-icon class="mr10" icon="sign-in-alt" />Login
      </el-menu-item></router-link
    >
    <el-submenu index="6" v-else>
      <template slot="title">My Library</template>
      <router-link to="/myPage" style="text-decoration: none;">
        <el-menu-item index="6-1">
          <font-awesome-icon class="mr10" icon="user-cog" />My
          Page</el-menu-item
        >
      </router-link>
      <el-menu-item index="6-2" @click="logout"
        ><font-awesome-icon icon="sign-out-alt" class="mr10" />
        Logout</el-menu-item
      >
    </el-submenu>
  </el-menu>
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
