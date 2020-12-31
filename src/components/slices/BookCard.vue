<template>
  <el-timeline-item
    class="card-container"
    timestamp="2018/4/12"
    placement="top"
  >
    <el-form refs="cardForm" :model="this.cardForm">
      <el-card class="card">
        <!-- Title -->
        <div class="form__group">
          <input
            type="input"
            class="form__field"
            placeholder="title"
            name="title"
            id="title"
            required
            v-model="cardForm.title"
          />
          <label for="title" class="form__label">Title</label>
        </div>
        <!-- writer and genre -->
        <div class="form__group-second">
          <div class="form__group-second-item writer">
            <input
              type="input"
              class="form__field"
              placeholder="writer"
              name="writer"
              id="writer"
              required
              v-model="cardForm.writer"
            />
            <label for="writer" class="form__label">Writer</label>
          </div>
          <div class="form__group-second-item">
            <input
              type="input"
              class="form__field"
              placeholder="genre"
              name="genre"
              id="genre"
              required
              v-model="cardForm.genre"
            />
            <label for="genre" class="form__label">Genre</label>
          </div>
        </div>
        <!-- quotes -->
        <div class="form__group">
          <textarea
            class="form__field"
            id="quote"
            name="quote"
            rows="2"
            cols="25"
            placeholder="record something memorable .."
            v-model="cardForm.quote"
          ></textarea>
          <label for="quote" class="form__label">Quote</label>
        </div>

        <!-- Review -->
        <div class="form__group">
          <textarea
            class="form__field"
            id="review"
            name="review"
            rows="2"
            cols="25"
            placeholder="make a review .."
            v-model="cardForm.review"
          ></textarea>
          <label for="review" class="form__label">Review</label>
        </div>
        <div class="form__button">
          <el-button type="primary" plain @click="onSubmit()">submit</el-button>
          <el-button type="info" plain @click="onReset()">reset</el-button>
          <el-button type="warning" plain @click="onDelete()">delete</el-button>
        </div>
      </el-card>
    </el-form>
  </el-timeline-item>
</template>
<script>
import { bookRecordRef } from "@/firebase";
import { mapGetters } from "vuex";
// dbService

export default {
  data() {
    return {
      cardForm: {
        title: "",
        writer: "",
        genre: "",
        quote: "",
        review: ""
      },
      userInfo: {
        uid: ""
      }
    };
  },
  computed: {
    ...mapGetters(["user"])
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      if (this.user) {
        this.userInfo.uid = this.user.uid;
      }
    },
    onReset() {
      this.cardForm = {};
    },
    async onSubmit() {
      try {
        await bookRecordRef
          .doc(`${this.userInfo.uid}`)
          .collection("bookInfo")
          .add(this.cardForm);
        this.$message.success("성공적으로 저장되었습니다.");
        this.onDelete();
      } catch (err) {
        this.$message.error(`Oops! ${err}`);
      }
    },
    onDelete() {
      this.$emit("change-editable");
    }
  }
};
</script>
