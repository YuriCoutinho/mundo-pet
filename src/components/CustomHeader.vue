<template>
  <header
    class="flex absolute w-full top-0 left-0 items-center justify-between px-6 py-4 bg-background-secondary border-b border-border-primary z-1"
  >
    <div class="flex items-center">
      <font-awesome-icon
        :icon="['fas', 'paw']"
        class="text-purple-main text-2xl mr-2"
      />
      <span class="text-purple-main text-2xl font-semibold">MUNDO PET</span>
    </div>

    <div v-if="filteredRoutes.length" class="flex items-center space-x-6">
      <nav class="hidden sm:flex items-center space-x-6">
        <router-link
          v-for="route in filteredRoutes"
          :key="route.name"
          :to="route.path"
          class="text-grey-light hover:text-purple-main transition duration-200"
          active-class="text-purple-main"
        >
          {{ route.name }}
        </router-link>

        <button
          class="text-grey-light hover:text-purple-main transition duration-200"
          @click="logout"
        >
          <font-awesome-icon
            :icon="['fas', 'arrow-right-from-bracket']"
            class="text-purple-main text-2xl"
          />
        </button>
      </nav>

      <button
        v-if="filteredRoutes.length"
        class="block sm:hidden"
        @click="$emit('open-side-nav')"
      >
        <font-awesome-icon
          :icon="['fas', 'bars']"
          class="text-2xl text-white"
        />
      </button>
    </div>
  </header>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "CustomHeader",
  computed: {
    ...mapGetters({
      userType: "auth/getType",
    }),
    filteredRoutes() {
      return this.$router.options.routes.filter((route) => {
        if (!route.name) return false;
        if (route.name === "Login") return false;
        if (route.name === "Funcionarios" && this.userType !== "ADMIN") {
          return false;
        }
        return true;
      });
    },
  },
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>
