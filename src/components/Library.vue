<template>
  <div>
    <section v-if="isNoData" class="isNoData">
      <p>I know you have something to review ..soon!</p>
    </section>
    <section v-else class="library">
      <div class="book-container" v-for="(book, index) in books" :key="index">
        <el-badge value="New" class="comment-alert" type="warning">
          <div class="book">image</div>
          <h4>{{ book.title }}</h4>
        </el-badge>
      </div>
    </section>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import { bookRecordRef } from "@/firebase";

export default {
  data() {
    return {
      books: [],
      isNoData: false
    };
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
        // TODO: menu 상에서는 로그인 이후에 접근 가능한 메뉴이지만, 잘못된 접근일 경우 don't allow the access
      }
    },
    async getBookRecord(userUID) {
      const bookRecord = await bookRecordRef
        .doc(`${userUID}`)
        .collection("bookInfo")
        .get();
      bookRecord.forEach(doc => {
        const records = { ...doc.data(), id: doc.id };
        this.books.push(records);
      });
      const size = this.books.length;
      if (size === 0) {
        this.isNoData = true;
      }
    }
  }
};
</script>

<style></style>
