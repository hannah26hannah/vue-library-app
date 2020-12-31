<template>
  <el-timeline-item
    class="card-container"
    :timestamp="createdAt"
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
            :readonly="data ? !isCardEditable : false"
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
              :readonly="data ? !isCardEditable : false"
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
              :readonly="data ? !isCardEditable : false"
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
            :readonly="data ? !isCardEditable : false"
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
            :readonly="data ? !isCardEditable : false"
          ></textarea>
          <label for="review" class="form__label">Review</label>
        </div>
        <div v-if="isEditableCopied" class="form__button">
          <el-button type="primary" plain @click="onSubmit()">submit</el-button>
          <el-button type="info" plain @click="onReset()">reset</el-button>
          <el-button type="warning" plain @click="onDelete()">delete</el-button>
        </div>
        <div v-else class="form__button">
          <el-button
            type="primary"
            icon="el-icon-edit"
            circle
            @click="toggleCardEdit"
          ></el-button>
        </div>
      </el-card>
    </el-form>
  </el-timeline-item>
</template>
<script>
import { bookRecordRef } from "@/firebase";
import { parseTime } from "@/utils/index";

export default {
  props: ["userUID", "isEditable", "data"],
  data() {
    return {
      cardForm: {
        title: "",
        writer: "",
        genre: "",
        quote: "",
        review: "",
        created: ""
      },
      isCardEditable: false,
      isEditableCopied: this.isEditable
      // isFormChanged: false
    };
  },
  computed: {
    createdAt() {
      return this.cardForm.created;
    }
  },
  watch: {
    // TODO: form-watcher --> submit button disabled or not
    // cardForm: {
    //   deep: true,
    //   immediate: true,
    //   handler(oldVal, newVal) {
    //     console.log(`watching.. newVal : ${newVal}, oldVal : ${oldVal}`);
    //     console.log("oldVal", JSON.stringify(oldVal));
    //     console.log("newval", JSON.stringify(newVal));
    //     if (newVal == oldVal) {
    //       console.log("변한 게 사실상 없음");
    //     }
    //   }
    // }
  },
  created() {
    this.init();
  },
  methods: {
    init() {
      Object.assign(this.cardForm, this.data);
    },
    toggleCardEdit() {
      this.isCardEditable = !this.isCardEditable;
      if (this.isCardEditable) {
        this.isEditableCopied = true;
      }
    },
    onReset() {
      this.cardForm = {};
    },
    async onSubmit() {
      try {
        this.cardForm.created = parseTime(new Date(Date.now()));
        await bookRecordRef
          .doc(`${this.userUID}`)
          .collection("bookInfo")
          .add(this.cardForm);
        this.$message.success("성공적으로 저장되었습니다.");
        this.$emit("change-editable");
      } catch (err) {
        this.$message.error(`Oops! ${err}`);
      }
      // TODO: 기존 포스트에 따라 업데이트 or 새로 업로드 구분할 것
    },
    onDelete() {
      this.$emit("change-editable");
      // 저장되지 않은 게시글을 삭제할 떄의 문구와 이미 저장된 내용을 삭제할 떄의 내용이 달라야 함.
    }
  }
};
</script>
