<template>
  <div v-if="employeesAreLoading" class="flex items-center justify-center">
    <div class="flex flex-col items-center">
      <font-awesome-icon
        :icon="['fas', 'spinner']"
        class="text-purple-main animate-spin text-5xl mb-4"
        aria-label="Carregando"
      />

      <span class="text-white text-xl font-semibold"
        >Funcionários carregando...</span
      >

      <div class="w-32 h-2 bg-grey-light rounded-full mt-4 overflow-hidden">
        <div class="w-0 h-full bg-purple-main animate-progress"></div>
      </div>
    </div>
  </div>

  <div v-else class="flex flex-col md:items-center gap-6">
    <div
      class="flex flex-col md:flex-row justify-between items-center gap-4 w-full"
    >
      <CustomButton @click.native="showModal = true" label="NOVO FUNCIONÁRIO" />
      <p class="text-grey-light text-center md:text-left">
        Aqui você pode ver todos os funcionários cadastrados.
      </p>
    </div>

    <EmployeesTable
      :employees="employees"
      @edit-employee="handleEmployeeEditing"
    />

    <CustomModal
      v-if="showModal"
      :title="selectedEmployee ? 'Editar Funcionário' : 'Novo Funcionário'"
      @close="closeModal"
    >
      <FormEmployee :employee="selectedEmployee" @close-modal="closeModal" />
    </CustomModal>
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";
import CustomModal from "@/components/CustomModal.vue";
import FormEmployee from "@/components/FormEmployee.vue";
import EmployeesTable from "@/components/EmployeesTable.vue";

import { mapGetters } from "vuex";

export default {
  name: "EmployeesView",
  components: {
    CustomButton,
    CustomModal,
    FormEmployee,
    EmployeesTable,
  },
  data() {
    return {
      showModal: false,
      selectedEmployee: null,
    };
  },
  computed: {
    ...mapGetters({
      employees: "employees/getEmployees",
      employeesAreLoading: "employees/isLoading",
      employeesAlreadyLoaded: "employees/getEmployeesAlreadyLoaded",
    }),
  },
  methods: {
    async getEmployees() {
      try {
        const { data } = await this.$http.get("/api/users");
        this.employees = data;
      } catch (error) {
        console.error("Erro ao buscar funcionários:", error);
        this.$store.dispatch("flashMessage/triggerMessage", {
          message: "Erro ao buscar funcionários.",
          type: "error",
        });
      }
    },

    handleEmployeeEditing(employee) {
      this.selectedEmployee = employee;
      this.showModal = true;
    },

    closeModal() {
      this.showModal = false;
      this.selectedEmployee = null;
    },
  },
  created() {
    if (!this.employeesAlreadyLoaded) {
      this.$store.dispatch("employees/getEmployees");
    }
  },
};
</script>
