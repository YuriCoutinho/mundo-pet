<template>
  <div class="flex flex-col space-y-1">
    <label v-if="label" :for="id" class="text-[16px] font-medium text-white">
      {{ label }}
    </label>

    <div class="relative">
      <font-awesome-icon
        v-if="icon"
        :icon="['fas', icon]"
        class="absolute left-3 top-1/2 transform -translate-y-1/2 text-purple-main"
      />
      <input
        :id="id"
        :type="type"
        :placeholder="placeholder"
        :value="value"
        :disabled="disabled"
        :autocomplete="autocomplete"
        class="w-full border rounded-md p-[12px] pl-12 bg-transparent text-white placeholder-grey-main border-grey-main focus:ring-0 focus:border-purple-main"
        :class="
          disabled ? 'bg-grey-dark text-grey-light cursor-not-allowed' : ''
        "
        v-mask="mask"
        @input="$emit('input', $event.target.value)"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: "CustomInput",
  props: {
    label: {
      type: String,
      default: "",
    },
    placeholder: {
      type: String,
      default: "",
    },
    value: {
      type: String,
      default: "",
    },
    icon: {
      type: String,
      default: null,
    },
    type: {
      type: String,
      default: "text",
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    mask: {
      type: String,
      default: "",
    },
    autocomplete: {
      type: String,
      default: "off",
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
input:focus {
  outline: none;
}
</style>
