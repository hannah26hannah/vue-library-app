<template>
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
</template>
