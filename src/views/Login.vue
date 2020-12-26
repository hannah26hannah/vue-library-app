<template>
  <div>
    <h1>Login</h1>
    <form action="" name="loginForm" id="login">
      <input
        type="text"
        name="usermail"
        v-model="loginForm.useremail"
        placeholder="write proper email"
      />
      <input
        type="password"
        name="password"
        v-model="loginForm.password"
        placeholder="password"
      />
      <button type="button" @click="login()">Login/Register</button>
      <button type="button" @click="showModal()">Or Connect With</button>
    </form>
  </div>
</template>
<script>
import { authService } from "@/firebase";

export default {
  name: "Login",
  data() {
    return {
      loginForm: {
        useremail: "",
        password: ""
      }
    };
  },
  methods: {
    async login() {
      event.preventDefault();
      try {
        let data;
        data = await authService.createUserWithEmailAndPassword(
          this.loginForm.useremail,
          this.loginForm.password
        );
        console.log("data", data);
      } catch (err) {
        console.log(err);
      }
    },
    showModal() {
      console.log("social login clicked");
    }
  }
};
</script>
<style lang="scss" scoped>
#login {
  width: 40%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;

  input,
  button {
    margin-bottom: 10px;
    padding: 5px;
    text-align: center;
  }
}
</style>
