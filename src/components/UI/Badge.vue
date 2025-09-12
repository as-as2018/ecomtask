<template>
  <span :class="['px-3 py-1 text-xs font-medium rounded-full', variantClass]">
    {{ text }}
  </span>
</template>

<script>
export default {
  name: "Badge",
  props: {
    text: {
      type: String,
      default: "Badge",
    },
    variant: {
      type: String,
      default: "primary", // 'primary', 'secondary', 'accent', 'info', 'success', 'warning', 'error'
    },
  },
  computed: {
    variantClass() {
      const variants = {
        primary: "bg-primary/20 text-primary",
        secondary: "bg-secondary/20 text-secondary",
        accent: "bg-accent/20 text-accent",
        info: "bg-blue-100 text-blue-700",
        success: "bg-green-100 text-green-700",
        warning: "bg-yellow-100 text-yellow-700",
        error: "bg-red-100 text-red-700",
      };
      return variants[this.variant] || variants.primary;
    },
  },
};
</script>
