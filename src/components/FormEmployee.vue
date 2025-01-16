<template>
  <CustomForm @submit="handleSubmit" :showLogo="false" :isLoginScenario="false">
    <template #inputs>
      <CustomInput
        v-model="formData.name"
        label="Nome"
        autocomplete="name"
        placeholder="Digite o nome"
        icon="user"
        required
      />

      <CustomInput
        v-model="formData.documentNumber"
        label="CPF"
        autocomplete="cpf"
        placeholder="Digite o CPF"
        icon="id-card"
        :mask="'###.###.###-##'"
        required
      />

      <CustomSelect
        v-model="formData.type"
        label="Cargo"
        icon="user-tie"
        :typeOptions="typeOptions"
      />

      <CustomInput
        v-model="formData.phone"
        label="Telefone"
        autocomplete="tel"
        placeholder="Digite o telefone"
        icon="phone"
        :mask="'(##) #####-####'"
        required
      />

      <CustomInput
        v-model="formData.email"
        label="Email"
        autocomplete="email"
        placeholder="Digite o email"
        icon="envelope"
        type="email"
        required
      />

      <CustomInput
        v-model="formData.password"
        label="Senha"
        autocomplete="new-password"
        placeholder="Digite a senha"
        icon="key"
        type="password"
        :required="!isEditMode"
      />
    </template>

    <template #button>
      <CustomButton
        class="mt-4"
        :label="isEditMode ? 'Salvar Alterações' : 'Cadastrar'"
        :disabled="isLoading || !isFormValid"
        :isLoading="isLoading"
        type="submit"
        fullWidth
      />
    </template>
  </CustomForm>
</template>

<script>
import CustomInput from "@/components/CustomInput.vue";
import CustomSelect from "@/components/CustomSelect.vue";
import CustomButton from "@/components/CustomButton.vue";
import CustomForm from "@/components/CustomForm.vue";

export default {
  name: "FormEmployee",
  components: {
    CustomInput,
    CustomSelect,
    CustomButton,
    CustomForm,
  },
  props: {
    employee: {
      type: Object,
      default: null,
    },
  },
  data() {
    return {
      formData: {
        id: null,
        name: "",
        documentNumber: "",
        type: "",
        phone: "",
        email: "",
        password: "",
      },
      typeOptions: [
        { label: "Admin", value: "ADMIN" },
        { label: "Atendente", value: "ATENDENTE" },
        { label: "Veterinário", value: "VETERINARIO" },
      ],
      errorMessage: "", // Opcional: Para mensagens de erro adicionais
    };
  },
  computed: {
    isEditMode() {
      return !!this.formData.id;
    },
    isFormValid() {
      return (
        this.formData.name.trim() &&
        this.formData.documentNumber.trim() &&
        this.formData.type &&
        this.formData.phone.trim() &&
        this.formData.email.trim() &&
        (this.isEditMode || this.formData.password.trim())
      );
    },
    isLoading() {
      return this.$store.getters["employees/isLoading"];
    },
  },
  watch: {
    employee: {
      immediate: true,
      handler(newEmployee) {
        if (newEmployee) {
          this.formData = {
            id: newEmployee.id || null,
            name: newEmployee.name || "",
            documentNumber: newEmployee.documentNumber || "",
            type: newEmployee.type || "",
            phone: newEmployee.phone || "",
            email: newEmployee.email || "",
            password: "",
          };
        } else {
          this.resetForm();
        }
      },
      deep: true,
    },
  },
  methods: {
    async handleSubmit() {
      if (!this.isFormValid) {
        this.errorMessage = "Por favor, preencha todos os campos obrigatórios.";
        return;
      }

      const payload = {
        name: this.formData.name.trim(),
        documentNumber: this.formData.documentNumber.replace(/\D/g, ""),
        type: this.formData.type,
        phone: this.formData.phone.replace(/\D/g, ""),
        email: this.formData.email.trim(),
        password: this.formData.password.trim(),
      };

      try {
        if (this.isEditMode) {
          this.$emit("close-modal");

          await this.$store.dispatch("employees/updateEmployee", {
            id: this.formData.id,
            ...payload,
          });
        } else {
          this.$emit("close-modal");
          await this.$store.dispatch("employees/createEmployee", payload);
          await this.$store.dispatch("employees/getEmployees", payload);
        }
      } catch (error) {
        console.error("Erro ao salvar funcionário:", error);
      }
    },

    resetForm() {
      this.formData = {
        id: null,
        name: "",
        documentNumber: "",
        type: "",
        phone: "",
        email: "",
        password: "",
      };
      this.errorMessage = "";
    },
  },
};
</script>
