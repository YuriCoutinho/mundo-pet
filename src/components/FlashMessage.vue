<template>
  <transition name="fade">
    <div
      class="fixed top-0 left-0 w-full py-4 text-center text-white font-semibold z-2 bg-green"
      :class="type === 'error' ? 'bg-red-600' : 'bg-green-400'"
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
