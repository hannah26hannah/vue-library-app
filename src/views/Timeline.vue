<template>
  <div class="timeline">
    <div class="avatar-section">
      <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
      <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
      <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
      <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
      <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
      <el-avatar :size="80" icon="el-icon-user-solid"></el-avatar>
    </div>

    <el-tabs tab-position="left">
      <el-tab-pane>
        <span slot="label"
          ><i class="el-icon-notebook-2 mr10"></i> Timeline</span
        >
        <!-- Dashboard Section -->
        <h2 style="text-align: left; display:table-cell;">
          New Wish is breweing now!
        </h2>
        <el-carousel indicator-position="outside">
          <el-carousel-item v-for="item in 4" :key="item">
            <h3>{{ item }}</h3>
          </el-carousel-item>
        </el-carousel>

        <h2 style="text-align: left; display:table-cell;">
          New Weekly Report!
        </h2>
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul class="infinite-list" style="overflow: auto;">
            <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-s-flag mr10"></i>Challenge</span>
        <!-- Challenge Section -->
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul class="infinite-list" style="overflow: auto;">
            <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
          </ul>
        </div>
      </el-tab-pane>
      <el-tab-pane>
        <span slot="label"
          ><i class="el-icon-notebook-2 mr10"></i> Reviews</span
        >
        <div class="infinite-list-wrapper" style="overflow:auto">
          <ul class="infinite-list" style="overflow: auto;">
            <li v-for="i in count" :key="i" class="list-item">{{ i }}</li>
          </ul>
        </div>
      </el-tab-pane>
    </el-tabs>
  </div>
</template>
<script>
export default {
  name: "Timeline",
  data() {
    return {
      count: 10
    };
  },
  methods: {
    handleClick(name) {
      console.log("clicked which name", name);
    }
  }
};
</script>
<style lang="scss" scoped>
.avatar-section {
  display: flex;
  justify-content: space-evenly;
  width: 80%;
  margin: 0 auto;
  margin-left: 150px;
  margin-bottom: 25px;
}
.el-avatar--icon {
  font-size: 44px;
}
.el-carousel__item h3 {
  color: #475669;
  font-size: 18px;
  opacity: 0.75;
  line-height: 300px;
  margin: 0;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}
</style>
