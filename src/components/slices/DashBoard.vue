<template>
  <div class="dashboard">
    <section v-if="!isSetGoal" class="dashboard__form-wrapper">
      <h1>Set Your Challenge</h1>
      <el-form refs="goalForm" class="dashboard__form">
        <el-card class="goal">
          <div class="form__group">
            <!-- goal -->
            <span class="form__text">2021년 올해의 목표인 🥇</span><br /><br />
            <input
              type="input"
              class="form__field"
              placeholder="goal"
              name="goal"
              id="goal"
              required
              v-model="goalForm.goal"
            />
            <span>를/을 위해서 나는</span><br /><br />
            <label for="goal" class="form__label" />
            <!-- genre -->
            <el-select
              class="form__field select-genre"
              v-model="goalForm.genre"
              placeholder="select"
              multiple
              name="genre"
              id="genre"
            >
              <el-option
                v-for="genre in genres"
                :key="genre.value"
                :label="genre.label"
                :value="genre.label"
              />
            </el-select>
            <span>분야의 책들을 📚</span><br /><br />
            <label for="genre" class="form__label" />
            <!-- frequent -->
            <input
              type="input"
              class="form__field input-frequent"
              placeholder="frequent"
              name="frequent"
              id="frequent"
              required
              v-model="goalForm.frequent"
            />
            마다 📆
            <label for="frequent" class="form__label" />
            <!-- page -->
            <input
              type="number"
              class="form__field input-page"
              placeholder="page"
              name="page"
              id="page"
              required
              v-model="goalForm.page"
            />
            <label for="page" class="form__label" />
            <span class="form__text">페이지만큼 읽고</span><br /><br />
            <span class="form__text-right"
              >타임라인에 짧은 서평을 남길 것이다✨</span
            >
          </div>
          <div class="form__button">
            <el-button type="primary" plain @click="onSubmit()"
              >Update</el-button
            >
          </div>
        </el-card>
      </el-form>
    </section>
    <section v-else class="dashboard__stats">
      <article class="circle">
        <el-progress type="circle" :percentage="0" />
        <h3>The Year</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="25" />
        <h3>The Month</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="100" status="success" />
        <h3>The Week</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="70" status="warning" />
        <h3>The Day</h3>
      </article>
      <article class="circle">
        <el-progress type="circle" :percentage="50" status="exception" />
        <h3>The Exception</h3>
      </article>
    </section>
  </div>
</template>
<script>
import { bookRecordRef } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      goalInfo: [],
      isSetGoal: false,
      genres: [
        {
          value: "1",
          label: "소설/시"
        },
        {
          value: "2",
          label: "에세이"
        },
        {
          value: "3",
          label: "경제/경영"
        },
        {
          value: "4",
          label: "자기계발"
        },
        {
          value: "5",
          label: "인문"
        },
        {
          value: "6",
          label: "역사/문화"
        },
        {
          value: "7",
          label: "예술/대중문화"
        },
        {
          value: "8",
          label: "사회"
        },
        {
          value: "9",
          label: "과학/공학"
        },
        {
          value: "10",
          label: "종교"
        },
        {
          value: "11",
          label: "가정/생활/요리"
        },
        {
          value: "12",
          label: "국어/외국어"
        },
        {
          value: "13",
          label: "컴퓨터/IT"
        }
      ],
      goalForm: {
        goal: "",
        genre: [],
        frequent: "",
        page: "",
        id: ""
      }
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
        this.getGoalInfo(this.userUID);
      } else {
        // TODO: 유저 정보 없을 경우 redirection 처리 Book.vue 참고
      }
    },
    async getGoalInfo(userUID) {
      const goalInfo = await bookRecordRef
        .doc(`${userUID}`)
        .collection("goalInfo")
        .get();

      goalInfo.forEach(doc => {
        const records = { ...doc.data(), id: doc.id };
        this.goalInfo.push(records);
      });

      Object.assign(this.goalForm, this.goalInfo[0]);
      console.log("this.goalForm", this.goalForm);
    },
    async onSubmit() {
      console.log("onsubmit 버튼 클릭 시", this.goalForm);
      if (this.goalForm.id) {
        try {
          await bookRecordRef
            .doc(`${this.userUID}`)
            .collection("goalInfo")
            .doc(`${this.goalForm.id}`)
            .update(this.goalForm);
          this.$message.success("독서 챌린지 정보가 업데이트되었습니다.");
        } catch (err) {
          this.$message.error(`Oops! ${err}`);
          console.log(err);
        }
      } else {
        try {
          await bookRecordRef
            .doc(`${this.userUID}`)
            .collection("goalInfo")
            .add(this.goalForm);
          this.$message.success("독서 챌린지 정보가 저장되었습니다.");
        } catch (err) {
          this.$message.error(`Oops! ${err}`);
          console.log(err);
        }
      }
    }
  }
};
</script>
