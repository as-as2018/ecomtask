<template>
  <button
    :type="type"
    :disabled="disabled"
    class="w-full"
    :class="variant"
    @click="$emit('click')"
  >
   {{text}}
  </button>
</template>

<script>
export default {
  name: "Button",
  props: {
    text: {
      type: String,
      default: "Button",
    },
    variant: {
      type: String,
      default: "btn-primary", // 'btn-primary', 'btn-secondary', 'btn-danger', 'btn-link'
      },
    type: {
      type: String,
      default: "button", // 'button', 'submit', 'reset'
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
};
</script>
