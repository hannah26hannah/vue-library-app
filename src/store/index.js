import Vue from "vue";
import Vuex from "vuex";
import createPersistedState from "vuex-persistedstate";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    user: null,
    token: "",
    isLoggedIn: false
  },
  getters: {
    isLoggedIn: state => {
      const user = JSON.parse(localStorage.getItem("vuex")).user;
      if (user != null) {
        state.isLoggedIn = true;
        return state.isLoggedIn;
      } else if (user == null) {
        state.isLoggedIn = false;
      }
      return state.isLoggedIn;
    }
  },
  plugins: [createPersistedState()],
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setToken: (state, token) => {
      state.token = token;
    }
  },
  actions: {
    getUser({ commit }, user) {
      commit("setUser", user);
      if (!user) return;
      user.getIdToken().then(token => {
        commit("setToken", token);
      });
    }
  }
});
