<template>
  <div>
    <div class="hidden md:block overflow-x-auto">
      <table
        class="min-w-full bg-background-secondary rounded-lg w-full table-auto"
      >
        <thead>
          <tr class="bg-background-tertiary border-b border-border-primary">
            <th class="p-3 text-left text-white">Avatar</th>
            <th class="p-3 text-left text-white">Nome</th>
            <th class="p-3 text-left text-white">CPF</th>
            <th class="p-3 text-left text-white">Telefone</th>
            <th class="p-3 text-left text-white">Email</th>
            <th class="p-3 text-left text-white">Cargo</th>
            <th class="p-3 text-left text-white">Ações</th>
          </tr>
        </thead>
        <tbody>
          <PersonCard
            v-for="employee in employees"
            :key="employee.id"
            :person="employee"
            @edit="$emit('edit-employee', $event)"
            class="text-left p-3 bg-background-secondary hover:bg-border-primary"
          />
        </tbody>
      </table>
    </div>

    <ul class="md:hidden">
      <PersonCard
        v-for="employee in employees"
        :key="employee.id"
        :person="employee"
        @edit="$emit('edit-employee', $event)"
      />
    </ul>
  </div>
</template>

<script>
import PersonCard from "@/components/PersonCard.vue";
import { mapGetters } from "vuex";

export default {
  name: "EmployeesTable",
  components: {
    PersonCard,
  },
  props: {
    employees: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    ...mapGetters({
      isLoading: "employees/isLoading",
      error: "employees/getError",
    }),
  },
};
</script>
