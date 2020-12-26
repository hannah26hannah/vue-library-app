<template>
  <div class="home">Hello, {{ isLoggedIn ? useremail : "Visitor" }}!</div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      useremail: ""
    };
  },
  mounted() {
    this.init();
  },
  computed: {
    isLoggedIn() {
      if (sessionStorage.getItem("user")) return true;
      else return false;
    }
  },
  methods: {
    init() {
      const user = JSON.parse(sessionStorage.getItem("user"));
      if (user != null) {
        this.useremail = user.email;
      } else {
        this.useremail = "test@test.com";
      }
    }
  }
};
</script>
