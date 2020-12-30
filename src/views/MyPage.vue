<template>
  <div class="myPage">
    <h1>Profile Update</h1>
    <el-form
      ref="userForm"
      :model="userForm"
      id="userForm"
      label-width="150px"
      label-position="left"
    >
      <el-form-item label="Profile Image" class="profileImg">
        <el-row :gutter="20" type="flex" justify="space-between">
          <el-col :span="12">
            <img
              v-if="userForm.photoURL"
              :src="userForm.photoURL"
              class="avatar"
          /></el-col>
          <el-col id="fileBox">
            <label for="imgFile">Upload</label>
            <input
              type="file"
              id="imgFile"
              accept="image/*"
              @change="detectFiles"
            />
          </el-col>
        </el-row>
      </el-form-item>
      <el-form-item label="user email">
        <el-input
          type="email"
          name="useremail"
          v-model="userForm.email"
          readonly="readonly"
        ></el-input>
      </el-form-item>

      <el-form-item label="user name">
        <el-input
          type="text"
          name="username"
          v-model="userForm.displayName"
        ></el-input>
      </el-form-item>
      <el-row type="flex" justify="end">
        <el-button type="primary" @click="updateProfile">Update</el-button>
        <el-button>Cancel</el-button>
      </el-row>
    </el-form>
  </div>
</template>
<script>
import { authService, storageService } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  name: "MyPage",
  data() {
    return {
      userForm: {
        signInProvider: "",
        displayName: "",
        email: "",
        photoURL: "",
        uid: ""
      },
      imgFile: "",
      imgFileName: ""
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.user) {
        Object.assign(this.userForm, this.user);
      } else {
        this.$message.error("잘못된 접근입니다. 유저 정보가 없습니다.");
      }
    },
    detectFiles() {
      const theFile = event.target.files[0];
      this.imgFileName = theFile.name;
      const reader = new FileReader();
      reader.onloadend = finishedEvent => {
        const result = finishedEvent.currentTarget.result;
        this.imgFile = result;
        this.userForm.photoURL = result;
      };
      reader.readAsDataURL(theFile);
    },
    async updateProfile() {
      const user = authService.currentUser;
      if (this.imgFile) {
        try {
          const attachmentRef = storageService
            .ref()
            .child(`profile/${this.userForm.uid}/${this.imgFileName}`);
          const response = await attachmentRef.putString(
            this.imgFile,
            "data_url"
          );
          const attachmentUrl = await response.ref.getDownloadURL();
          this.userForm.photoURL = attachmentUrl;
          user
            .updateProfile({
              displayName: this.userForm.displayName,
              photoURL: this.userForm.photoURL
            })
            .then(() => {
              this.$message.success(
                "성공적으로 프로필 정보가 업로드되었습니다."
              );
            });
        } catch (err) {
          this.$message({
            message: "프로필 사진 업로드에 실패했습니다. 다시 시도해주세요.",
            type: "warning"
          });
        }
      } else {
        user
          .updateProfile({
            displayName: this.userForm.displayName
          })
          .then(() => {
            this.$message.success(
              "프로필 이름이 성공적으로 업데이트되었습니다!"
            );
          })
          .catch(err => {
            console.log(err);
            this.$message.error(
              `프로필 업데이트에 실패했습니다. 다시 시도해주세요.`
            );
          });
      }
    }
  }
};
</script>
<style lang="scss" scoped>
#userForm {
  width: 80%;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  .profileImg {
    .avatar {
      width: 200px;
      height: auto;
      display: block;
    }
    #fileBox {
      display: flex;
      justify-content: flex-end;
      align-items: flex-end;
      label {
        display: inline-block;
        padding: 12px 20px;
        font-size: inherit;
        line-height: normal;
        vertical-align: middle;
        cursor: pointer;
        border: 1px solid #409eff;
        border-radius: 0.25em;
        color: #fff;
        background-color: #409eff;
      }
      input[type="file"] {
        position: absolute;
        width: 1px;
        height: 1px;
        padding: 0;
        margin: -1px;
        overflow: hidden;
        clip: rect(0, 0, 0, 0);
        border: 0;
      }
    }
  }
}
</style>
