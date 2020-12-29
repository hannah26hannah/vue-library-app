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
      <el-form-item label="Profile Image">
        <el-upload
          class="avatar-uploader"
          action=""
          :before-upload="beforeAvatarUpload"
          accept="image/*"
          :show-file-list="false"
        >
          <img
            v-if="userForm.photoURL"
            :src="userForm.photoURL"
            class="avatar"
          />
          <i v-else class="el-icon-plus avatar-uploader-icon"></i>
        </el-upload>
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
import { authService } from "@/firebase";

// storageService
export default {
  name: "MyPage",
  data() {
    return {
      userForm: {
        signInProvider: "",
        displayName: "",
        email: "",
        photoURL: ""
      },
      imgFile: ""
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      const user = authService.currentUser;
      if (user != null) {
        user.providerData.forEach(profile => {
          this.userForm.displayName = profile.displayName;
          this.userForm.email = profile.email;
          this.userForm.photoURL = profile.photoURL;
          this.userForm.signInProvider = profile.providerId;
        });
      } else {
        console.log("유저 정보 존재하지 않음.");
      }
    },
    beforeAvatarUpload(file) {
      console.log(file);
      // const isJPG = file.type === "image/jpeg";
      // const isLt2M = file.size / 1024 / 1024 < 2;

      // if (!isJPG) {
      //   this.$message.error("Avatar picture must be JPG format!");
      // }
      // if (!isLt2M) {
      //   this.$message.error("Avatar picture size can not exceed 2MB!");
      // }
      // return isJPG && isLt2M;
    },
    async updateProfile() {
      try {
        const user = authService.currentUser;
        const result = await user.updateProfile({
          displayName: this.userForm.displayName
        });
        this.$store.dispatch("updateUser", this.userForm.displayName);
        console.log(result);
      } catch (err) {
        console.log(err);
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

  .avatar-uploader {
    display: flex;
    .avatar-uploader .el-upload {
      border: 1px dashed #d9d9d9;
      border-radius: 6px;
      cursor: pointer;
      position: relative;
      overflow: hidden;
    }
    .avatar-uploader .el-upload:hover {
      border-color: #409eff;
    }

    .avatar-uploader-icon {
      font-size: 28px;
      color: #8c939d;
      width: 178px;
      height: 178px;
      line-height: 178px;
      text-align: center;
      background-color: lightpink;
      border-radius: 15px;
    }
    .avatar {
      width: 178px;
      height: 178px;
      display: block;
    }
  }
}
</style>
