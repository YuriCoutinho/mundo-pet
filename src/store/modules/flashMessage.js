const state = {
  message: "",
  type: "",
  visible: false,
};

const getters = {
  message: (state) => state.message,
  type: (state) => state.type,
  visible: (state) => state.visible,
};

const mutations = {
  SHOW_MESSAGE(state, { message, type }) {
    state.message = message;
    state.type = type;
    state.visible = true;
  },
  HIDE_MESSAGE(state) {
    state.message = "";
    state.type = "";
    state.visible = false;
  },
};

const actions = {
  triggerMessage({ commit }, { message, type }) {
    commit("SHOW_MESSAGE", { message, type });
    setTimeout(() => {
      commit("HIDE_MESSAGE");
    }, 5000);
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
