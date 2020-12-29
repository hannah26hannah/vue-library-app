<template>
  <div>
    <section v-if="isLoginShow">
      <h1>
        <span @click="toggleMode" :class="{ currentStatus: isLoginMode }"
          >Log in</span
        >
        Or
        <span @click="toggleMode" :class="{ currentStatus: !isLoginMode }"
          >Sign In</span
        >
      </h1>

      <el-form
        ref="signIn"
        :model="loginForm"
        id="signIn"
        label-width="100px"
        label-position="left"
      >
        <el-form-item label="user email">
          <el-input
            type="email"
            name="useremail"
            v-model="loginForm.useremail"
            placeholder="write proper email"
            autocomplete="on"
          ></el-input>
        </el-form-item>
        <el-form-item label="password">
          <el-input
            type="password"
            name="password"
            v-model="loginForm.password"
            placeholder="password"
          ></el-input>
        </el-form-item>
        <div class="btnBox">
          <el-button type="primary" @click="signIn()">
            {{ isLoginMode ? "Log In" : "Sign In" }}
          </el-button>
          <el-button type="primary" plain @click="showModal()"
            >Or Connect With</el-button
          >
        </div>
      </el-form>
    </section>
    <section v-else>
      <h1>
        My Page
        <form name="userForm" id="userInfo">
          <!-- <div>
            <label for="username">Name :</label>
            <input
              type="text"
              name="username"
              v-model="this.$store.state.user.displayName"
              placeholder="update your name to use"
            />
          </div> -->
          <!-- <div>
            <label for="useremail">Email :</label>
            <input
              type="text"
              name="useremail"
              v-model="this.$store.state.user.email"
              readonly
            />
          </div> -->
        </form>
      </h1>
    </section>
  </div>
</template>
<script>
import { authService } from "@/firebase";
import { mapMutations, mapActions, mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      isLoginMode: true,
      loginForm: {
        useremail: "",
        password: ""
      }
    };
  },
  computed: {
    ...mapGetters(["isLoggedIn"]),
    isLoginShow() {
      return !this.isLoggedIn;
    }
  },
  methods: {
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
          this.$message({
            message: "성공적으로 가입되었습니다.",
            type: "success"
          });
        } else {
          await authService.signInWithEmailAndPassword(
            this.loginForm.useremail,
            this.loginForm.password
          );
          this.$message({
            message: "성공적으로 로그인되었습니다.",
            type: "success"
          });
        }
        this.$router.push("/");
      } catch (err) {
        this.$message({
          message: `Oops! ${err}`,
          type: "error"
        });
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

  .btnBox {
    display: flex;
    flex-direction: row;
    justify-content: flex-end;
  }
}

.currentStatus {
  color: lightcoral;
  font-style: italic;
}
</style>
