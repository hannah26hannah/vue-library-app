<template>
  <div class="dashboard">
    <section class="dashboard__stats">
      <h1>💎 Check Your Challenge Status💎</h1>
      <div class="stats-wrapper">
        <article class="circle-stats">
          <el-progress type="circle" :percentage="0" />
          <h3>Yearly Goal : {{ this.goalCnt.year }}p</h3>
        </article>
        <article class="stats">
          <el-progress type="circle" :percentage="25" />
          <h3>Monthly Goal : {{ this.goalCnt.month }}p</h3>
        </article>
        <article class="stats">
          <el-progress type="circle" :percentage="100" status="success" />
          <h3>Weekly Goal : {{ this.goalCnt.week }}p</h3>
        </article>
        <article class="stats">
          <el-progress type="circle" :percentage="70" status="warning" />
          <h3>Daily Goal : {{ this.goalCnt.day }}p</h3>
        </article>
      </div>
      <h1>💎 Check Your Challenge Status💎</h1>
      <div class="stats-bar">
        <ul class="bar-stats-wrapper">
          <li
            class="bar-stats"
            v-for="(genre, index) in this.goalForm.genre"
            :value="genre"
            :key="index"
          >
            <h3>{{ genre }}</h3>
            <el-progress
              :text-inside="true"
              :stroke-width="30"
              :percentage="70"
            ></el-progress>
          </li>
        </ul>
      </div>
    </section>
    <section class="dashboard__form-wrapper">
      <h1>💎 Set Your Challenge 💎</h1>
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
                v-for="(genre, index) in genres"
                :key="index"
                :label="genre"
                :value="genre"
              />
            </el-select>
            <span>분야의 책들을 📚</span><br /><br />
            <label for="genre" class="form__label" />
            <!-- frequent -->
            <select
              name="frequent"
              id="frequent"
              v-model="goalForm.frequent"
              class="form__field input-frequent"
              placeholder="please select"
              required
            >
              <option
                v-for="item in frequent"
                :key="item.value"
                :value="item.label"
                :label="item.label"
              ></option>
            </select>
            📆
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
  </div>
</template>
<script>
import { bookRecordRef } from "@/firebase";
import { commonCodeRef } from "@/firebase";
import { mapGetters } from "vuex";

export default {
  data() {
    return {
      goalInfo: [],
      cnt: "",
      goalCnt: {
        year: "",
        month: "",
        week: "",
        day: ""
      },
      genres: [],
      frequent: [
        {
          value: 0,
          label: "매일"
        },
        {
          value: 1,
          label: "일주일마다"
        },
        {
          value: 2,
          label: "한 달에"
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
      this.getGenres();
      if (this.userUID) {
        this.getGoalInfo(this.userUID);
      } else {
        // TODO: 유저 정보 없을 경우 redirection 처리 Book.vue 참고
      }
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
      this.cnt = this.goalForm.page;
      this.pageCount(this.cnt, this.goalForm.frequent);
    },
    pageCount(cnt, frequent) {
      let indexYearCnt;
      switch (frequent) {
        case this.frequent[0].label:
          indexYearCnt = cnt * 365;
          break;
        case this.frequent[1].label:
          indexYearCnt = cnt * 52;
          break;
        case this.frequent[2].label:
          indexYearCnt = cnt * 12;
          break;
      }
      this.goalCnt.month = Math.round(indexYearCnt / 12);
      this.goalCnt.week = Math.round(indexYearCnt / 52);
      this.goalCnt.day = Math.round(this.goalCnt.week / 7);
      this.goalCnt.year = indexYearCnt;
      console.log("counter result : ", this.goalCnt);
      // TODO: page 업데이트 -> computed ?
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
