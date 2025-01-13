<template>
  <div
    id="app"
    class="h-screen w-screen flex items-center justify-center bg-background-primary p-6 sm:p-0 sm:pt-16"
  >
    <FlashMessage v-show="isFlashMessageVisible" />

    <template v-if="shouldShowHeaderAndSideNav">
      <CustomHeader @open-side-nav="showSideNav = true" />
      <SideNav @close-side-nav="showSideNav = false" :isOpen="showSideNav" />
    </template>

    <router-view />
  </div>
</template>

<script>
import CustomHeader from "@/components/CustomHeader.vue";
import SideNav from "@/components/SideNav.vue";
import FlashMessage from "@/components/FlashMessage.vue";

import { mapGetters } from "vuex";

export default {
  components: {
    CustomHeader,
    SideNav,
    FlashMessage,
  },
  data() {
    return {
      showSideNav: false,
    };
  },
  computed: {
    ...mapGetters({
      isFlashMessageVisible: "flashMessage/visible",
    }),

    shouldShowHeaderAndSideNav() {
      return this.$route.name !== "Login";
    },
  },
};
</script>
