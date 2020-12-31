<template>
  <div class="book">
    <el-divider><b>2021 Reading Challenge</b></el-divider>
    <dash-board />

    <el-divider><b>Book Timeline</b></el-divider>
    <el-timeline class="timeline">
      <bookCard
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
          :userUID="this.userUID"
          :isEditable="this.isEditable"
        />
      </section>
    </el-timeline>
  </div>
</template>
<script>
import bookCard from "@/components/slices/BookCard.vue";
import dashBoard from "@/components/slices/DashBoard.vue";
import { mapGetters } from "vuex";
import { bookRecordRef } from "@/firebase";

export default {
  name: "Book",
  data() {
    return {
      isEditable: false,
      bookList: []
      // cardForm2: {
      //   title: "test",
      //   writer: "test",
      //   genre: "test",
      //   quote: "test",
      //   review: "test"
      // }
    };
  },
  components: {
    bookCard,
    dashBoard
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
      console.log("getBookRecord 메소드 불러옴");
      const bookRecord = await bookRecordRef
        .doc(`${userUID}`)
        .collection("bookInfo")
        .get();
      bookRecord.forEach(doc => {
        const records = { ...doc.data() };
        this.bookList.push(records);
      });
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
<style lang="scss" scoped>
.timeline {
  width: 90%;
}

.review-opener {
  font-size: 30px;
}
</style>
