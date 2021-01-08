<template>
  <el-container>
    <el-menu
      default-active="1"
      class="el-menu-vertical-demo"
      @open="handleOpen"
      @close="handleClose"
      :collapse="isCollapse"
    >
      <el-menu-item index="1" @click="toggleSideBar()">
        <i class="el-icon-search"></i>
        <span slot="title">{{
          isCollapse ? "Open Search Bar" : "Close Search Bar"
        }}</span>
      </el-menu-item>
      <searcher v-if="!isCollapse" @handle-toggle="toggleSideBar()" />
    </el-menu>
    <!-- <el-aside v-if="false" el-aside width="200px">
    </el-aside> -->
    <el-main>
      <div class="book">
        <el-timeline class="timeline">
          <h2
            style="text-align: left; display:table-cell; padding-bottom: 20px; "
          >
            Review Timeline
          </h2>
          <section v-if="isNoData" class="isNoData">
            <p>I know you have something to review ..soon!</p>
            <p>Capture your amazing reviews via this button below!</p>
          </section>
          <bookCard
            v-else
            v-for="(book, index) in this.bookList"
            :key="index"
            :data="book"
          />
          <section class="review-opener">
            <el-button
              type="primary"
              icon="el-icon-edit"
              circle
              @click="toggleCardShow"
            ></el-button>

            <bookCard
              v-if="isEditable"
              @change-editable="changeEditable()"
              :isEditable="this.isEditable"
            />
          </section>
        </el-timeline></div
    ></el-main>
  </el-container>
</template>
<script>
import bookCard from "@/components/slices/BookCard.vue";
import searcher from "@/components/slices/Searcher.vue";
import { mapGetters } from "vuex";
import { bookRecordRef } from "@/firebase";

export default {
  name: "Book",
  data() {
    return {
      isEditable: false,
      bookList: [],
      isNoData: false,
      isCollapse: true
    };
  },
  components: {
    bookCard,
    searcher
  },
  computed: {
    ...mapGetters(["user"]),
    userUID() {
      return this.user.uid;
    }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.userUID) {
        this.getBookRecord(this.userUID);
      } else {
        // TODO: user 정보 없을 경우 redirection. 애초에 beforeEnter로 redirection 처리해줄 것.
      }
    },
    async getBookRecord(userUID) {
      const bookRecord = await bookRecordRef
        .doc(`${userUID}`)
        .collection("bookInfo")
        .get();
      bookRecord.forEach(doc => {
        const records = { ...doc.data(), id: doc.id };
        this.bookList.push(records);
      });
      const size = this.bookList.length;
      if (size === 0) {
        this.isNoData = true;
      }
    },
    toggleSideBar() {
      this.isCollapse = !this.isCollapse;
    },
    toggleCardShow() {
      this.isEditable = !this.isEditable;
    },
    changeEditable() {
      this.isEditable = false;
    }
  }
};
</script>
