<template>
  <div class="flex items-center mb-3">
    <!-- Stars -->
    <div class="star-rating mr-2 flex">
      <span
        v-for="i in maxStars"
        :key="i"
        class="star text-lg"
        :class="i <= Math.floor(rating) ? 'text-primary' : 'text-gray-300 dark:text-gray-600'"
      >
        ★
      </span>
    </div>

    <!-- Numeric Value -->
    <span
      v-if="showValue"
      class="text-sm text-gray-600 dark:text-gray-400"
    >
      ({{ rating.toFixed(1) }})
    </span>
  </div>
</template>

<script>
export default {
  name: "Rating",
  props: {
    rating: {
      type: Number,
      required: true,
      default: 0
    },
    maxStars: {
      type: Number,
      default: 5
    },
    showValue: {
      type: Boolean,
      default: true
    }
  }
};
</script>

<style scoped>
.star {
  transition: color 0.3s;
}
</style>
