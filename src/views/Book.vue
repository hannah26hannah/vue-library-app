<template>
  <div class="book">
    <el-divider><b>Book Timeline</b></el-divider>
    <el-timeline class="timeline">
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
    </el-timeline>
  </div>
</template>
<script>
import bookCard from "@/components/slices/BookCard.vue";
import { mapGetters } from "vuex";
import { bookRecordRef } from "@/firebase";

export default {
  name: "Book",
  data() {
    return {
      isEditable: false,
      bookList: [],
      isNoData: false
    };
  },
  components: {
    bookCard
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
    toggleCardShow() {
      this.isEditable = !this.isEditable;
    },
    changeEditable() {
      this.isEditable = false;
    }
  }
};
</script>
