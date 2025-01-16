<template>
  <div class="flex flex-col space-y-1">
    <label :for="id" class="text-white font-medium mb-2">{{ label }}</label>
    <div class="relative">
      <font-awesome-icon
        v-if="icon"
        :icon="['fas', icon]"
        class="absolute left-4 top-1/2 transform -translate-y-1/2 text-purple-main"
      />
      <select
        :id="id"
        :value="value"
        @input="$emit('input', $event.target.value)"
        class="w-full bg-transparent text-white border border-border-primary rounded-lg p-3 pl-12 pr-10 placeholder-grey-main focus:border-purple-main focus:ring-0"
        required
      >
        <option value="" disabled>Selecione...</option>
        <option
          v-for="option in typeOptions"
          :key="option.value"
          :value="option.value"
        >
          {{ option.label }}
        </option>
      </select>
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomSelect",
  props: {
    label: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: null,
    },
    typeOptions: {
      type: Array,
      default: () => [],
    },
    value: {
      type: String,
      default: "",
    },
  },
  computed: {
    id() {
      return this.label.replace(/\s+/g, "-").toLowerCase();
    },
  },
};
</script>

<style scoped>
select:focus {
  outline: none;
}
</style>
