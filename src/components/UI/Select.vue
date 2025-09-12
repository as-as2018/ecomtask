<template>
  <div class="w-full relative hover:border-1 hover:rounded-2xl hover:border-primary">
    <!-- Label -->
    <label v-if="label" class="block mb-1 text-sm font-medium text-[var(--color-text-secondary)]">
      {{ label }}
    </label>

    <!-- Trigger -->
    <div
      class="select cursor-pointer flex justify-between items-center px-3 py-2 border border-[var(--color-border)] rounded-2xl bg-[var(--background-input)] text-[var(--color-text)] transition-colors duration-75 outline-none"
      tabindex="0" 
      @click="toggleDropdown"
      @keydown.enter.prevent="handleEnter"
      @keydown.space.prevent="toggleDropdown"
      @keydown.escape="closeDropdown"
      @keydown.arrow-down.prevent="focusNext"
      @keydown.arrow-up.prevent="focusPrev"
    >
      <span class="truncate">
        {{ selectedLabel || placeholder }}
      </span>
      <Icon :icon="open ? 'mdi:chevron-up' : 'mdi:chevron-down'" class="text-[var(--color-text-secondary)] ml-2"
        width="20" height="20" />
    </div>
<!-- {{ JSON.stringify(options ) }} -->

    <!-- Dropdown Options -->
    <transition name="fade">
      <ul v-if="open"
        class="absolute z-50 mt-1 w-full bg-[var(--background-input)] border border-[var(--color-border)] rounded-2xl shadow-lg max-h-60 overflow-auto">
        <li v-for="(option, index) in options" :key="index" class="px-3 py-2 cursor-pointer transition" :class="{
          'bg-[var(--color-primary)] text-white': option.value === modelValue,
          'bg-[var(--color-border)]': index === focusedIndex && option.value !== modelValue
        }" @click="selectOption(option)">
          {{ option.label }}
        </li>
      </ul>
    </transition>

    <!-- Error message -->
    <p v-if="error" class="mt-1 text-sm text-[var(--color-error)]">
      {{ error }}
    </p>
  </div>
</template>

<script>
import { Icon } from "@iconify/vue";

export default {
  name: "SelectField",
  components: { Icon },
  props: {
    modelValue: {
      type: [String, Number],
      default: ""
    },
    label: {
      type: String,
      default: ""
    },
    placeholder: {
      type: String,
      default: "Select an option"
    },
    options: {
      type: Array,
      default: () => [] // [{ label: "Option 1", value: "1" }]
    },
    error: {
      type: String,
      default: ""
    }
  },
  data() {
    return {
      open: false,
      focusedIndex: -1
    };
  },
  computed: {
    selectedLabel() {
      const match = this.options.find(o => o.value === this.modelValue);
      return match ? match.label : "";
    }
  },
  methods: {
    toggleDropdown() {
      this.open = !this.open;
      if (this.open) {
        this.focusedIndex = this.options.findIndex(
          o => o.value === this.modelValue
        );
      }
    },
    closeDropdown() {
      this.open = false;
      this.focusedIndex = -1;
    },
    selectOption(option) {
      this.$emit("update:modelValue", option.value);
      this.closeDropdown();
    },
    handleEnter() {
      if (this.open && this.focusedIndex >= 0) {
        this.selectOption(this.options[this.focusedIndex]);
      } else {
        this.toggleDropdown();
      }
    },
    focusNext() {
      if (!this.open) {
        this.open = true;
        return;
      }
      this.focusedIndex = (this.focusedIndex + 1) % this.options.length;
    },
    focusPrev() {
      if (!this.open) {
        this.open = true;
        return;
      }
      this.focusedIndex =
        (this.focusedIndex - 1 + this.options.length) % this.options.length;
    },
    handleClickOutside(e) {
      if (!this.$el.contains(e.target)) {
        this.closeDropdown();
      }
    }
  },
  mounted() {
    document.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickOutside);
  }
};
</script>

<style scoped>
/* Fade animation */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.15s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
