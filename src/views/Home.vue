<template>
  <div class="home">Hello, {{ isLoggedIn ? username : "Visitor!" }}</div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      isLoggedIn: false,
      username: "test name"
    };
  }
};
</script>
