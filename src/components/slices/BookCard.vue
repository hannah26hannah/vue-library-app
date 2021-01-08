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
              required
              v-model="cardForm.writer"
              :readonly="data ? !isCardEditable : false"
            />
            <label for="writer" class="form__label">Writer</label>
          </div>
          <div class="form__group-second-item">
            <select
              class="form__field select-genre"
              v-model="cardForm.genre"
              placeholder="genre"
              name="genre"
              :readonly="data ? !isCardEditable : false"
            >
              <option
                v-for="(genre, index) in genres"
                :key="index"
                :label="genre"
                :value="genre"
              />
            </select>
            <label for="genre" class="form__label">Genre</label>
          </div>
        </div>
        <!-- quotes -->
        <div class="form__group">
          <el-tooltip
            content="Click to see More"
            placement="left"
            effect="light"
          >
            <textarea
              class="form__field disableScroll"
              name="quote"
              rows="2"
              cols="25"
              placeholder="record something memorable .."
              v-model="cardForm.quote"
              :readonly="data ? !isCardEditable : false"
              @input="mixin_autoResize_resize"
              @click="mixin_autoResize_resize"
            ></textarea>
          </el-tooltip>
          <label for="quote" class="form__label">Quote</label>
        </div>

        <!-- Review -->
        <div class="form__group">
          <el-tooltip
            content="Click to see More"
            placement="left"
            effect="light"
          >
            <textarea
              class="form__field disableScroll"
              name="review"
              rows="2"
              cols="25"
              placeholder="make a review .."
              v-model="cardForm.review"
              :readonly="data ? !isCardEditable : false"
              @input="mixin_autoResize_resize"
              @click="mixin_autoResize_resize"
            ></textarea>
          </el-tooltip>
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
import { commonCodeRef } from "@/firebase";
import { parseTime } from "@/utils/index";
import { mapGetters } from "vuex";
import mixinAutoResize from "@/mixins/autoResize.js";

export default {
  props: ["isEditable", "data"],
  mixins: [mixinAutoResize],
  data() {
    return {
      genres: [],
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
    ...mapGetters(["user"]),
    userUID() {
      return this.user.uid;
    },
    createdAt() {
      if (this.cardForm.modified) {
        return `created : ${this.cardForm.created} | modified : ${this.cardForm.modified}`;
      } else if (this.cardForm.created) {
        return `created : ${this.cardForm.created}`;
      }
      return "";
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
      this.getGenres();
      Object.assign(this.cardForm, this.data);
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
      if (this.data) {
        console.log("this.userUID", this.userUID);
        try {
          this.cardForm.modified = parseTime(new Date(Date.now()));
          await bookRecordRef
            .doc(`${this.userUID}`)
            .collection("bookInfo")
            .doc(`${this.data.id}`)
            .update(this.cardForm);
          this.$message.success("성공적으로 수정되었습니다.");
          console.log("this.cardForm", this.cardForm);
        } catch (err) {
          this.$message.error(`Oops! ${err}`);
        }
      } else {
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
      }
    },
    onDelete() {
      if (this.data) {
        try {
          bookRecordRef
            .doc(`${this.userUID}`)
            .collection("bookInfo")
            .doc(`${this.data.id}`)
            .delete();
          this.$message.success("성공적으로 삭제되었습니다.");
        } catch (err) {
          this.$message.error(`Oops! ${err}`);
        }
      } else {
        this.$emit("change-editable");
      }
    }
  }
};
</script>
