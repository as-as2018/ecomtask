<template>
  <div class="w-full flex justify-center items-center">
    <!-- Label -->
    <label v-if="label" :for="id" class="block mb-1 text-sm font-medium text-[var(--color-text-secondary)]">
      {{ label }}
    </label>

    <!-- Input -->
    <input
      :id="id"
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      :disabled="disabled"
      :class="class"
      @input="$emit('update:modelValue', $event.target.value)"
    />

    <!-- Error message -->
    <p v-if="error" class="mt-1 text-sm text-[var(--color-error)]">
      {{ error }}
    </p>
  </div>
</template>

<script>
export default {
  name: "InputField",
  props: {
    modelValue: {
      type: String,
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: ""
    },
    type: {
      type: String,
      default: "text"
    },
    id: {
      type: String,
      default: () => `input-${Math.random().toString(36).substr(2, 9)}`
    },
    error: {
      type: String,
      default: ""
    },
    disabled: {
      type: Boolean,
      default: false
    },
    class:{
        type: String,
        default:'input'
    }
  }
}
</script>

