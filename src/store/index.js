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
    isLoggedIn: state => state.isLoggedIn,
    user: state => state.user
  },
  plugins: [createPersistedState()],
  mutations: {
    setUser: (state, user) => {
      state.user = user;
    },
    setToken: (state, token) => {
      state.token = token;
    },
    setStatus: (state, isLoggedIn) => {
      state.isLoggedIn = isLoggedIn;
    },
    updateUser: (state, user) => {
      state.user.displayName = user.displayName;
    }
  },
  actions: {
    getUser({ commit }, user) {
      commit("setUser", user);
      commit("setStatus", true);
      if (!user) {
        commit("setStatus", false);
        return;
      }
      // user.getIdToken().then(token => {
      //   commit("setToken", token);
      // });
    },
    updateUser({ commit }, user) {
      commit("updateUser", user);
    }
  }
});
