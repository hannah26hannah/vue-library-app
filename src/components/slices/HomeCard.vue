<template>
  <div class="homeCard">
    <section class="img-container">
      <img src="@/assets/img/placeholder.png" alt="description" />
    </section>
    <section class="welcome-container">
      <h1>{{ data.title }}</h1>
      <p class="text-box">
        Lorem ipsum dolor sit amet, consectetuer adipiscing elit. Aenean commodo
        ligula eget dolor. Aenean massa. Cum sociis natoque penatibus et magnis
        dis parturient montes, nascetur ridiculus mus. Donec quam felis,
        ultricies nec, pellentesque eu, pretium quis, sem. Nulla consequat massa
        quis enim.
      </p>
      <div class="btn-box">
        <router-link :to="data.btnLink" class="mr10">
          <el-button type="primary">{{ data.btnText }}</el-button>
        </router-link>
        <el-button type="primary" plain>Learn More</el-button>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  props: ["data"]
};
</script>

<style></style>
