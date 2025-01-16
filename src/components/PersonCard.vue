<template>
  <tr
    v-if="!isMobile"
    class="bg-background-secondary border border-border-primary rounded-lg"
  >
    <td class="p-3">
      <img
        :src="person.avatar || 'https://via.placeholder.com/50'"
        :alt="`${person.name} Avatar`"
        class="w-12 h-12 rounded-full object-cover"
      />
    </td>

    <td class="p-3">
      <span class="text-white font-semibold" :title="person.name">
        {{ person.name }}
      </span>
    </td>

    <td class="p-3">
      <span class="text-grey-light" :title="person.documentNumber">
        {{ formattedDocumentNumber }}
      </span>
    </td>

    <td class="p-3">
      <span class="text-grey-light" :title="person.phone">
        {{ formattedPhone }}
      </span>
    </td>

    <td v-if="isEmployee" class="p-3">
      <span class="text-grey-light" :title="person.email">
        {{ person.email }}
      </span>
    </td>

    <td v-if="isEmployee" class="p-3">
      <span class="text-grey-light" :title="person.type">
        {{ person.type }}
      </span>
    </td>

    <td class="p-3">
      <div class="flex space-x-2">
        <button
          @click="$emit('edit', person)"
          class="text-purple-main hover:text-purple-light transition duration-200"
          aria-label="Editar"
        >
          <font-awesome-icon :icon="['fas', 'pen']" />
        </button>
        <button
          @click="handleDeletion(person.id)"
          class="text-alert hover:text-alert-light transition duration-200"
          aria-label="Deletar"
        >
          <font-awesome-icon :icon="['fas', 'trash']" />
        </button>
      </div>
    </td>
  </tr>

  <li
    v-else
    class="bg-background-secondary border border-border-primary rounded-lg p-4 mb-4"
  >
    <div class="flex items-center space-x-4">
      <img
        :src="person.avatar || 'https://via.placeholder.com/50'"
        :alt="`${person.name} Avatar`"
        class="w-12 h-12 rounded-full object-cover"
      />
      <span class="text-white font-semibold">{{ person.name }}</span>
    </div>
    <div class="mt-2">
      <p class="text-grey-light">
        <strong>CPF:</strong> {{ formattedDocumentNumber }}
      </p>
      <p class="text-grey-light">
        <strong>Número:</strong> {{ formattedPhone }}
      </p>
      <p v-if="isEmployee" class="text-grey-light">
        <strong>Email:</strong> {{ person.email }}
      </p>
      <p v-if="isEmployee" class="text-grey-light">
        <strong>Cargo:</strong> {{ person.type }}
      </p>
    </div>
    <div class="mt-4 flex space-x-2">
      <button
        @click="$emit('edit', person)"
        class="text-purple-main hover:text-purple-light transition duration-200"
        aria-label="Editar"
      >
        <font-awesome-icon :icon="['fas', 'pen']" />
      </button>
      <button
        @click="handleDeletion(person.id)"
        class="text-alert hover:text-alert-light transition duration-200"
        aria-label="Deletar"
      >
        <font-awesome-icon :icon="['fas', 'trash']" />
      </button>
    </div>
  </li>
</template>

<script>
export default {
  name: "PersonCard",
  props: {
    person: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      isMobile: false,
    };
  },
  computed: {
    isEmployee() {
      return !!this.person.type;
    },
    formattedDocumentNumber() {
      if (!this.person.documentNumber) return "";
      return this.person.documentNumber.replace(
        /^(\d{3})(\d{3})(\d{3})(\d{2})$/,
        "$1.$2.$3-$4"
      );
    },
    formattedPhone() {
      if (!this.person.phone) return "";
      const digits = this.person.phone;

      if (digits.length === 11) {
        return digits.replace(/^(\d{2})(\d{5})(\d{4})$/, "($1) $2-$3");
      } else if (digits.length === 10) {
        return digits.replace(/^(\d{2})(\d{4})(\d{4})$/, "($1) $2-$3");
      } else {
        return this.person.phone;
      }
    },
  },
  methods: {
    checkIfMobile() {
      this.isMobile = window.innerWidth < 768;
    },
    handleDeletion(employeeId) {
      if (!confirm("Tem certeza que deseja remover este funcionário?")) return;

      this.$store.dispatch("employees/deleteEmployee", employeeId);
    },
  },
  mounted() {
    this.checkIfMobile();
    window.addEventListener("resize", this.checkIfMobile);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkIfMobile);
  },
};
</script>

<style scoped>
select:focus {
  outline: none;
}
</style>
