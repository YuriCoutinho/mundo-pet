import axios from "@/config/axios";

const state = {
  user: {
    type: "",
  },
};

const getters = {
  getType(state) {
    return state.user.type;
  },
};

const mutations = {
  setType(state, value) {
    state.user.type = value;
  },
};

const actions = {
  async handleLogin(_, { email, password }) {
    try {
      const { data } = await axios.post("auth/login", { email, password });
      localStorage.setItem("token", data.token);
      localStorage.setItem("refreshToken", data.refreshToken);
      return true;
    } catch (error) {
      console.error(error);
      localStorage.clear();
      return false;
    }
  },
};

export default {
  namespaced: true,
  state,
  getters,
  mutations,
  actions,
};
