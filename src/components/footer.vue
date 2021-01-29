<template>
  <el-footer class="el-footer">
    <ul class="company-desc">
      <li>
        <router-link to="/">
          <logo class="logo" />
        </router-link>
      </li>
      <li>&copy; {{ new Date().getFullYear() }} 週間讀書</li>
    </ul>
    <section class="site-detail">
      <ul>
        <li>
          <router-link to="/challenge">Challenge</router-link>
        </li>
        <li>
          <router-link to="/book">Book</router-link>
        </li>
        <li>
          <router-link to="/timeline">Timeline</router-link>
        </li>
      </ul>
      <ul>
        <li>logo</li>
        <li>logo</li>
        <li>logo</li>
      </ul>
    </section>
  </el-footer>
</template>

<script>
import logo from "@/components/logo";
export default {
  components: {
    logo
  }
};
</script>

<style></style>
