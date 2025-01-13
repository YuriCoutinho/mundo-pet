<template>
  <transition name="slide">
    <div v-if="isOpen" class="fixed inset-0 bg-background-secondary p-6 z-1">
      <div class="flex justify-between items-center mb-6">
        <span class="text-purple-main text-2xl font-semibold">MUNDO PET</span>
        <button
          @click="$emit('close-side-nav')"
          class="text-grey-light text-2xl"
        >
          <font-awesome-icon :icon="['fas', 'times']" />
        </button>
      </div>

      <nav class="flex flex-col space-y-4">
        <router-link
          v-for="route in filteredRoutes"
          :key="route.name"
          :to="route.path"
          class="text-white text-lg hover:text-purple-main"
          @click.native="$emit('close-side-nav')"
        >
          {{ route.name }}
        </router-link>

        <button
          class="text-white text-lg hover:text-purple-main inline-flex"
          @click="logout"
        >
          Logout
        </button>
      </nav>
    </div>
  </transition>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "SideNav",
  props: {
    isOpen: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    ...mapGetters({
      userType: "auth/getType",
    }),
    filteredRoutes() {
      return this.$router.options.routes.filter((route) => {
        if (!route.name) return false;
        if (route.name === "login") return false;
        if (route.name === "funcionarios" && this.userType !== "ADMIN") {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$emit("close-side-nav");
      this.$router.push("/login");
    },
  },
};
</script>

<style scoped>
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease, opacity 0.3s ease;
}
.slide-enter,
.slide-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}
</style>
