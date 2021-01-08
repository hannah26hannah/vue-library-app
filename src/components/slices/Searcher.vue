<template>
  <section class="searcher">
    <div class="search-bar">
      <el-input
        placeholder="Type anythong to search for"
        prefix-icon="el-icon-search"
        v-model="searchForm.keyword"
      >
      </el-input>

      <el-select
        v-model="searchForm.genre"
        slot="prepend"
        placeholder="search with genre"
        multiple
      >
        <el-option label="Restaurant" value="1"></el-option>
        <el-option label="Order No." value="2"></el-option>
        <el-option label="Tel" value="3"></el-option>
      </el-select>

      <!-- YEAR SEARCH -->
      <el-date-picker
        v-model="searchForm.year"
        type="year"
        placeholder="Pick a year"
      >
      </el-date-picker>

      <!-- MONTH SEARCH -->
      <el-date-picker
        v-model="searchForm.month"
        type="month"
        placeholder="Pick a month"
      >
      </el-date-picker>

      <!-- SPICIFIC DATE SEARCH -->
      <el-date-picker
        v-model="searchForm.searchDate"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
      >
      </el-date-picker>

      <div class="btnBoxRight mt10">
        <el-button
          icon="el-icon-search"
          circle
          type="primary"
          @click="onSubmit()"
        ></el-button>
        <el-button
          icon="el-icon-refresh-right"
          circle
          type="info"
          @click="onReset()"
        ></el-button>
      </div>
    </div>
  </section>
</template>

<script>
export default {
  data() {
    return {
      searchForm: {
        keyword: "",
        genre: [],
        year: "",
        month: "",
        searchDate: []
      }
    };
  },
  methods: {
    onSubmit() {
      console.log("handle submit");
      this.$emit("handle-toggle");
    },
    onReset() {
      this.searchForm = {};
    }
  }
};
</script>

<style></style>
