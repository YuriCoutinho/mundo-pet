<template>
  <button
    :type="type"
    class="rounded-lg px-6 py-3 font-semibold text-center focus:outline-none focus:ring-4 transition duration-200 ease-in-out"
    :class="[fullWidth ? 'w-full' : 'inline-block', buttonClass]"
    :disabled="disabled"
  >
    <span v-if="isLoading">
      <font-awesome-icon icon="spinner" spin class="mr-2" />
      Carregando...
    </span>
    <span v-else>
      {{ label }}
    </span>
  </button>
</template>

<script>
export default {
  name: "CustomButton",
  props: {
    fullWidth: {
      type: Boolean,
      default: false,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    label: {
      type: String,
      default: "",
    },
    type: {
      type: String,
      default: "button", // Pode ser 'button', 'submit', ou 'reset'
    },
    isLoading: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    buttonClass() {
      if (this.disabled) {
        return "text-grey-lightest bg-grey-disabled cursor-not-allowed";
      } else {
        return `
          text-white 
          bg-gradient-to-b from-purple-light to-purple-main 
          shadow-[0_4px_10px_rgba(146,130,250,0.4)] 
          hover:from-purple-main hover:to-purple-gradientEnd 
          hover:shadow-[0_6px_14px_rgba(146,130,250,0.5)] 
          active:shadow-[0_2px_6px_rgba(146,130,250,0.3)] 
          focus:ring-2 focus:ring-purple-light
        `;
      }
    },
  },
};
</script>

<style scoped>
button {
  box-shadow: 0px 4px 10px rgba(146, 130, 250, 0.3);
}
</style>
