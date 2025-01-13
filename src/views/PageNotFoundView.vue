<template>
  <div
    class="flex flex-col items-center justify-center bg-background-primary text-white text-center"
  >
    <font-awesome-icon
      icon="times"
      class="text-purple-main text-7xl md:text-9xl mb-6 animate-pulse"
    />

    <h1 class="text-6xl md:text-8xl font-bold text-purple-main drop-shadow-md">
      404
    </h1>

    <h2 class="text-2xl md:text-3xl font-semibold mt-4">
      Página não encontrada
    </h2>

    <p class="text-grey-light mt-2 max-w-2xl">
      Ops! Parece que a página que você está procurando não existe.
      <br class="hidden md:block" />
      Verifique se o link está correto ou tente novamente mais tarde.
    </p>

    <CustomButton
      class="mt-6 px-6 py-3 text-lg font-semibold bg-purple-main hover:bg-purple-light text-white rounded-md shadow-md transform hover:scale-105 transition-transform"
      @click="$router.push('/agendamentos')"
      label="Voltar para a Página Inicial"
    />
  </div>
</template>

<script>
import CustomButton from "@/components/CustomButton.vue";

export default {
  name: "PageNotFoundView",
  components: {
    CustomButton,
  },
};
</script>

<style scoped>
.animate-pulse {
  animation: pulse 1s infinite;
}

@keyframes pulse {
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.05);
  }
  100% {
    transform: scale(1);
  }
}
</style>
