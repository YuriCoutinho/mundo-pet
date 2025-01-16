<template>
  <div
    class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50 px-4"
  >
    <div
      class="bg-background-secondary rounded-lg shadow-lg w-full max-w-md px-4 py-6 sm:px-6 sm:py-8 relative animate-fade-in"
    >
      <h2 class="text-2xl font-bold text-white mb-6">{{ title }}</h2>

      <slot />

      <button
        class="absolute top-4 right-4 text-grey-light hover:text-white"
        @click="$emit('close')"
        aria-label="Fechar"
      >
        <font-awesome-icon :icon="['fas', 'times']" />
      </button>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomModal",
  props: {
    title: {
      type: String,
      required: false,
    },
  },
};
</script>

<style scoped>
.animate-fade-in {
  animation: fadeIn 0.3s ease-in-out;
}

@keyframes fadeIn {
  from {
    opacity: 0;
    transform: translateY(-10px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}
</style>
