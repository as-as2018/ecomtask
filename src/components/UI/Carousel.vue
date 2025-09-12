<template>
  <div class="relative w-full bg-transparent" @mouseenter="pause" @mouseleave="resume">
    <!-- Carousel wrapper -->
    <div class="relative h-56 overflow-hidden rounded-lg">
      <div
        v-for="(img, index) in images"
        :key="index"
        class="absolute inset-0 transition-opacity duration-700 ease-in-out"
        :class="current === index ? 'opacity-100' : 'opacity-0'"
      >
        <img
          :src="img"
          class="absolute block w-full -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2"
          alt="carousel image"
        />
      </div>
    </div>

    <!-- Indicators -->
    <div
      class="absolute z-30 flex -translate-x-1/2 bottom-5 left-1/2 space-x-3 rtl:space-x-reverse"
    >
      <button
        v-for="(img, index) in images"
        :key="'indicator-' + index"
        @click="goTo(index)"
        class="w-3 h-3 rounded-full"
        :class="current === index ? 'bg-primary' : 'bg-gray-300'"
        :aria-label="`Slide ${index + 1}`"
      ></button>
    </div>

    <!-- Controls -->
    <button
      type="button"
      class="absolute top-0 start-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="prev"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30
        group-hover:bg-white/50 dark:group-hover:bg-gray-800/60
        group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="M5 1 1 5l4 4"
          />
        </svg>
        <span class="sr-only">Previous</span>
      </span>
    </button>

    <button
      type="button"
      class="absolute top-0 end-0 z-30 flex items-center justify-center h-full px-4 cursor-pointer group focus:outline-none"
      @click="next"
    >
      <span
        class="inline-flex items-center justify-center w-10 h-10 rounded-full bg-white/30 dark:bg-gray-800/30
        group-hover:bg-white/50 dark:group-hover:bg-gray-800/60
        group-focus:ring-4 group-focus:ring-white dark:group-focus:ring-gray-800/70"
      >
        <svg
          class="w-4 h-4 text-white dark:text-gray-800 rtl:rotate-180"
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 6 10"
        >
          <path
            stroke="currentColor"
            stroke-linecap="round"
            stroke-linejoin="round"
            stroke-width="2"
            d="m1 9 4-4-4-4"
          />
        </svg>
        <span class="sr-only">Next</span>
      </span>
    </button>
  </div>
</template>

<script>
export default {
  name: "Carousel",
  props: {
    images: {
      type: Array,
      required: true,
    },
    interval: {
      type: Number,
      default: 3000, // auto slide every 3s
    },
  },
  data() {
    return {
      current: 0,
      timer: null,
    };
  },
  methods: {
    next() {
      this.current = (this.current + 1) % this.images.length;
    },
    prev() {
      this.current =
        (this.current - 1 + this.images.length) % this.images.length;
    },
    goTo(index) {
      this.current = index;
    },
    start() {
      this.timer = setInterval(this.next, this.interval);
    },
    pause() {
      clearInterval(this.timer);
    },
    resume() {
      this.start();
    },
  },
  mounted() {
    this.start();
  },
  beforeUnmount() {
    clearInterval(this.timer);
  },
};
</script>
