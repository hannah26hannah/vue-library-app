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
        <el-option
          v-for="(genre, index) in genres"
          :key="index"
          :label="genre"
          :value="genre"
        />
      </el-select>

      <!-- YEAR SEARCH -->
      <el-date-picker
        v-model="searchForm.year"
        type="year"
        placeholder="Pick a year"
        value-format="timestamp"
      >
      </el-date-picker>

      <!-- MONTH SEARCH -->
      <el-date-picker
        v-model="searchForm.month"
        type="month"
        placeholder="Pick a month"
        value-format="timestamp"
      >
      </el-date-picker>

      <!-- SPICIFIC DATE SEARCH -->
      <el-date-picker
        v-model="searchForm.searchDate"
        type="daterange"
        range-separator="To"
        start-placeholder="Start date"
        end-placeholder="End date"
        value-format="timestamp"
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
import { commonCodeRef } from "@/firebase";

export default {
  data() {
    return {
      searchForm: {
        keyword: "",
        genre: "",
        year: "",
        month: "",
        searchDate: []
      },
      genres: []
    };
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      this.getGenres();
    },
    async getGenres() {
      try {
        const genres = await commonCodeRef.doc("genres").get();

        if (genres.exists) {
          this.genres.push(Object.values(genres.data()));
          this.genres = this.genres[0];
        } else {
          this.$message.error("No such data!");
        }
      } catch (err) {
        this.$message.error(`Oops! ${err}`);
        console.log(err);
      }
    },
    onSubmit() {
      console.log("this.searchForm", this.searchForm);
      this.$emit("send-searchParam", this.searchForm);
      this.$emit("handle-toggle");
      this.$emit("handle-init");
    },
    onReset() {
      this.searchForm = {};
    }
  }
};
</script>

<style></style>
