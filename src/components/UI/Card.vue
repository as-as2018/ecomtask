<template>
  <div class="card" :class="{ hoverable }">
    <!-- Card Header -->
    <div v-if="title || subtitle" class="mb-2">
      <h3 v-if="title" class="card-title">{{ title }}</h3>
      <p v-if="subtitle" class="card-subtitle">{{ subtitle }}</p>
    </div>

    <!-- Card Content Slot -->
    <div class="card-content">
      <slot />
    </div>

    <!-- Card Footer -->
    <div v-if="$slots.footer" class="card-footer mt-3 pt-2 border-t border-[var(--card-border)]">
      <slot name="footer" />
    </div>
  </div>
</template>

<script>
export default {
  name: "Card",
  props: {
    title: {
      type: String,
      default: ""
    },
    subtitle: {
      type: String,
      default: ""
    },
    hoverable: {
      type: Boolean,
      default: true
    }
  }
}
</script>


