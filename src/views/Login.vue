<template>
  <div>
    <section v-if="isLoggedIn">
      <h1>
        My Page
        <form name="userForm" id="userInfo">
          <div>
            <label for="username">Name :</label>
            <input
              type="text"
              name="username"
              v-model="this.$store.state.user.displayName"
              placeholder="update your name to use"
            />
          </div>
          <div>
            <label for="useremail">Email :</label>
            <input
              type="text"
              name="useremail"
              v-model="this.$store.state.user.email"
              readonly
            />
          </div>
        </form>
      </h1>
    </section>
    <section v-else>
      <h1>
        <span @click="toggleMode" :class="{ currentStatus: !isLoginMode }"
          >Sign In</span
        >
        Or
        <span @click="toggleMode" :class="{ currentStatus: isLoginMode }"
          >Log in</span
        >
      </h1>
      <form action="" name="signInForm" id="signIn">
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
        <button type="button" @click="signIn()">
          {{ isLoginMode ? "Log In" : "Sign In" }}
        </button>
        <button type="button" @click="showModal()">Or Connect With</button>
      </form>
    </section>
  </div>
</template>
<script>
import { authService } from "@/firebase";
import { mapMutations, mapActions } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isLoggedIn: false,
      isLoginMode: false,
      loginForm: {
        useremail: "",
        password: ""
      }
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
    ...mapMutations(["setUserInfo"]),
    ...mapActions(["setUserInfo"]),
    toggleMode() {
      this.isLoginMode = !this.isLoginMode;
    },
    async signIn() {
      try {
        if (!this.isLoginMode) {
          await authService.createUserWithEmailAndPassword(
            this.loginForm.useremail,
            this.loginForm.password
          );
        } else {
          await authService.signInWithEmailAndPassword(
            this.loginForm.useremail,
            this.loginForm.password
          );
          this.$router.push("/");
        }
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
#signIn,
#userInfo {
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

.currentStatus {
  color: lightcoral;
  font-style: italic;
}
</style>
