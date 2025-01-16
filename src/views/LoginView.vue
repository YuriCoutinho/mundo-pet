<template>
  <CustomForm @submit="handleFormSubmit" :showLogo="true">
    <template #inputs>
      <CustomInput
        v-model="email"
        autocomplete="email"
        icon="user"
        label="Email"
        placeholder="Digite seu email"
        type="email"
        :disabled="isLoading"
      />

      <CustomInput
        v-model="password"
        autocomplete="current-password"
        icon="key"
        label="Senha"
        type="password"
        placeholder="Digite sua senha"
        :disabled="isLoading"
      />
    </template>

    <template #button>
      <CustomButton
        :fullWidth="true"
        :disabled="isDisabled"
        label="LOGIN"
        type="submit"
        :isLoading="isLoading"
      />
    </template>
  </CustomForm>
</template>

<script>
import CustomForm from "@/components/CustomForm.vue";
import CustomInput from "@/components/CustomInput.vue";
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "LoginView",
  components: {
    CustomForm,
    CustomInput,
    CustomButton,
  },
  data() {
    return {
      email: "",
      password: "",
      isLoading: false,
    };
  },
  computed: {
    isDisabled() {
      return this.isLoading || !this.email || !this.password;
    },
  },
  methods: {
    async handleFormSubmit() {
      console.log("teste");
      this.isLoading = true;

      try {
        const data = { email: this.email, password: this.password };
        const success = await this.$store.dispatch("auth/handleLogin", data);

        if (success) {
          this.$router.push("/agendamentos");
        } else {
          this.$store.dispatch("flashMessage/triggerMessage", {
            message:
              "Usuário não encontrado. Por favor, verifique seu email e/ou senha.",
            type: "error",
          });
        }
      } catch (error) {
        this.$store.dispatch("flashMessage/triggerMessage", {
          message: "Ocorreu um erro durante o login. Tente novamente.",
          type: "error",
        });
        console.error("Erro no login:", error);
      } finally {
        this.isLoading = false;
      }
    },
  },
};
</script>
