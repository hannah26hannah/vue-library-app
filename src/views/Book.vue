<template>
  <div class="book">
    <el-divider><b>2021 Reading Challenge</b></el-divider>
    <section class="dashboard">
      <article class="circle">
        <el-progress type="circle" :percentage="0" />
        <h3>The Year</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="25" />
        <h3>The Month</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="100" status="success" />
        <h3>The Week</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="70" status="warning" />
        <h3>The Day</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="50" status="exception" />
        <h3>The Exception</h3>
      </article>
    </section>

    <el-divider><b>Book Timeline</b></el-divider>
    <el-timeline class="timeline">
      <bookCard />
      <el-timeline-item timestamp="2018/4/3" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/3 20:46</p>
        </el-card>
      </el-timeline-item>
      <el-timeline-item timestamp="2018/4/2" placement="top">
        <el-card>
          <h4>Update Github template</h4>
          <p>Tom committed 2018/4/2 20:46</p>
        </el-card>
      </el-timeline-item>
    </el-timeline>
  </div>
</template>
<script>
import bookCard from "@/components/slices/BookCard.vue";

export default {
  name: "Book",
  components: {
    bookCard
  }
};
</script>
<style lang="scss" scoped>
.dashboard {
  display: flex;
  width: 100%;
  justify-content: space-around;
  .circle {
    display: flex;
    flex-direction: column;
  }
}

.timeline {
  width: 90%;
}
</style>
