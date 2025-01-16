import axios from "@/config/axios";

const state = {
  employees: [],
  employeesAlreadyLoaded: false,
  loading: false,
  error: null,
};

const getters = {
  getEmployees: (state) => state.employees,
  getEmployeesAlreadyLoaded: (state) => state.employeesAlreadyLoaded,
  isLoading: (state) => state.loading,
  getError: (state) => state.error,
};

const mutations = {
  setEmployees(state, employees) {
    state.employees = employees;
  },
  setEmployeesAlreadyLoaded(state, alreadyLoaded) {
    state.employeesAlreadyLoaded = alreadyLoaded;
  },
  setLoading(state, isLoading) {
    state.loading = isLoading;
  },
  setError(state, error) {
    state.error = error;
  },
  removeEmployee(state, employeeId) {
    state.employees = state.employees.filter((emp) => emp.id !== employeeId);
  },
  updateEmployee(state, updatedEmployee) {
    const employees = [...state.employees];
    const index = employees.findIndex((emp) => emp.id === updatedEmployee.id);

    if (index !== -1) {
      employees[index] = updatedEmployee;
      state.employees = employees;
    }
  },
};

const actions = {
  async getEmployees({ commit, dispatch }) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      const { data } = await axios.get("/api/users");

      if (Array.isArray(data)) {
        commit("setEmployees", data);
        commit("setEmployeesAlreadyLoaded", true);
      } else {
        throw new Error("Dados de funcionários no formato inválido.");
      }
    } catch (error) {
      console.error("Erro ao buscar funcionários:", error);
      commit("setError", error);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Erro ao buscar funcionários.",
          type: "error",
        },
        { root: true }
      );
    } finally {
      commit("setLoading", false);
    }
  },

  async deleteEmployee({ commit, dispatch }, employeeId) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      await axios.delete(`/api/user/${employeeId}`);

      commit("removeEmployee", employeeId);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Funcionário removido com sucesso.",
          type: "success",
        },
        { root: true }
      );
    } catch (error) {
      console.error("Erro ao remover funcionário:", error);
      commit("setError", error);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Erro ao remover funcionário.",
          type: "error",
        },
        { root: true }
      );
    } finally {
      commit("setLoading", false);
    }
  },

  async createEmployee({ commit, dispatch }, employee) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      await axios.post("/api/user/register", employee);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Funcionário cadastrado com sucesso.",
          type: "success",
        },
        { root: true }
      );
    } catch (error) {
      console.error("Erro ao cadastrar funcionário:", error);
      commit("setError", error);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Erro ao cadastrar funcionário.",
          type: "error",
        },
        { root: true }
      );
      throw error;
    } finally {
      commit("setLoading", false);
    }
  },

  async updateEmployee({ commit, dispatch }, employee) {
    commit("setLoading", true);
    commit("setError", null);

    try {
      const { data } = await axios.put(`/api/user/${employee.id}`, employee);

      commit("updateEmployee", data);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Funcionário atualizado com sucesso.",
          type: "success",
        },
        { root: true }
      );
    } catch (error) {
      console.error("Erro ao atualizar funcionário:", error);
      commit("setError", error);

      dispatch(
        "flashMessage/triggerMessage",
        {
          message: "Erro ao atualizar funcionário.",
          type: "error",
        },
        { root: true }
      );
      throw error;
    } finally {
      commit("setLoading", false);
    }
  },
};

export default {
  namespaced: true,
  state,
  mutations,
  actions,
  getters,
};
