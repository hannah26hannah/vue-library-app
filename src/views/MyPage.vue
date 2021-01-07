<template>
  <div class="myPage">
    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-custom mr10"></i> Profile</span>
        <profile />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"
          ><i class="el-icon-notebook-2 mr10"></i> Library</span
        >
        <library />
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-flag mr10"></i> Challenge</span>
        Challenge
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
import profile from "@/components/Profile";
import library from "@/components/Library";

export default {
  name: "MyPage",
  components: {
    profile,
    library
  }
};
</script>
