<template>
  <div class="home">
    <h1>
      <span class="home-text">{{ isMember ? userName : "Visitor" }}님</span>
      어서오세요. <br />새로운 독서습관을 위한
      <span class="home-text">週間讀書</span>
      입니다.
    </h1>
    <Main />
    <homeCard
      v-for="(item, index) in this.homeList"
      :key="index"
      :data="item"
    />
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import homeCard from "@/components/slices/HomeCard.vue";
import Main from "@/components/Main.vue";

export default {
  name: "Home",
  data() {
    return {
      homeList: [
        {
          title: "Leave Simple Review",
          btnLink: "/book",
          btnText: "Go to Review"
        },
        {
          title: "Browse timeline of people",
          btnLink: "/about",
          btnText: "Go to Timeline"
        },
        {
          title: "Get Customised weekly Report",
          btnLink: "/myPage",
          btnText: "Go to My Library"
        }
      ]
    };
  },
  components: {
    homeCard,
    Main
  },
  computed: {
    ...mapGetters(["isLoggedIn", "user"]),
    isMember() {
      return this.isLoggedIn;
    },
    userName() {
      return this.user.displayName;
    }
  }
};
</script>
