<template>
  <div>
    <section>
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
          <el-button
            type="primary"
            @click="signIn()"
            style="margin-right: 10px;"
          >
            {{ isLoginMode ? "Log In" : "Sign In" }}
          </el-button>
          <el-popover
            placement="bottom"
            title="Social Login"
            width="200"
            trigger="click"
          >
            <el-button type="primary" plain @click="socialLogin('google')"
              ><font-awesome-icon :icon="['fab', 'google']" /> Login With
              Google</el-button
            >
            <el-button
              type="primary"
              plain
              @click="socialLogin('github')"
              class="smallBtn"
              ><font-awesome-icon :icon="['fab', 'github']" /> Login With
              Github</el-button
            >
            <el-button slot="reference">Or Connect With</el-button>
          </el-popover>
        </div>
      </el-form>
    </section>
  </div>
</template>
<script>
import { firebaseInstance } from "@/firebase";
import { authService } from "@/firebase";
import { mapMutations, mapActions } from "vuex";

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
        this.$router.push({ path: "/", params: { activeIndex: "1" } });
      } catch (err) {
        this.$message({
          message: `Oops! ${err}`,
          type: "error"
        });
      }
    },
    async socialLogin(val) {
      try {
        let provider;
        if (val === "google") {
          provider = new firebaseInstance.auth.GoogleAuthProvider();
        } else if (val === "github") {
          provider = new firebaseInstance.auth.GithubAuthProvider();
        }
        const data = await authService.signInWithPopup(provider);
        console.log("operation Type :", data.operationType);
        const method = data.operationType;
        if (method == "signIn") {
          this.$message({
            message: "성공적으로 로그인되었습니다.",
            type: "success"
          });
          this.$router.push({ path: "/", params: { activeIndex: "1" } });
        }
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

.smallBtn {
  margin: 20px 0 0 0px;
}
</style>
