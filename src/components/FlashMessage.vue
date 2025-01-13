<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 w-full py-4 text-center font-semibold z-50"
      :class="[
        { 'bg-green-main text-white': type === 'success' },
        { 'bg-alert text-white': type === 'error' },
      ]"
    >
      {{ message }}
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "FlashMessage",
  computed: {
    ...mapGetters({
      message: "flashMessage/message",
      type: "flashMessage/type",
    }),
  },
};
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.5s;
}
.fade-enter,
.fade-leave-to {
  opacity: 0;
}
</style>
