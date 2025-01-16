<template>
  <form
    @submit.prevent="$emit('submit')"
    :class="
      isLoginScenario
        ? 'bg-background-tertiary border border-border-secondary rounded-lg p-8 w-full max-w-md flex flex-col gap-8'
        : 'w-full flex flex-col gap-3'
    "
  >
    <div v-if="showLogo" class="flex flex-col items-center mb-4">
      <font-awesome-icon
        :icon="['fas', 'paw']"
        class="text-purple-main text-6xl mb-2"
      />
      <h1 class="text-4xl font-bold text-purple-main">MUNDO PET</h1>
    </div>

    <slot name="inputs"></slot>

    <slot name="button"></slot>
  </form>
</template>

<script>
export default {
  name: "CustomForm",
  props: {
    showLogo: {
      type: Boolean,
      default: false,
    },
    isLoginScenario: {
      type: Boolean,
      default: true,
    },
  },
};
</script>
