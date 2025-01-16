import Vue from "vue";
import Vuex from "vuex";
import auth from "@/store/modules/auth";
import flashMessage from "@/store/modules/flashMessage";
import employees from "@/store/modules/employees";

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    auth,
    flashMessage,
    employees,
  },
});
