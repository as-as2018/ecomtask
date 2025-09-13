<template>
  <div class="w-full h-full">
     <h1 class="text-2xl font-bold mb-4">📦 Product</h1>
    <h2 class="text-l font-semibold mb-4 text-text/50 ml-2">Discover our amazing collection of products...</h2>

    <!-- Responsive Controls -->
    <div class="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
      <!-- Search bar -->
      <div class="w-full md:flex-1">
        <Input type="text" v-model="search" placeholder="Search..." class="input w-full"
          @input="debouncedSearch" />
      </div>

      <!-- Sort Options -->
      <div class="w-full md:w-[15rem]">
        <Select v-model="sortBy" label="" placeholder="Sort by" :options="[
          { label: 'Default', value: 'default' },
          { label: 'Price: Low to High', value: 'price-low' },
          { label: 'Price: High to Low', value: 'price-high' },
          { label: 'Rating', value: 'rating' },
          { label: 'Name', value: 'name' }
        ]" @update:modelValue="setSortBy(sortBy)" />
      </div>

      <!-- Filter Options -->
      <div class="w-full md:w-[15rem]">
        <Select v-model="filterBy" label="" placeholder="Filter by Category"
          :options="categories.map(c => ({ label: c.name, value: c.name }))"
          @update:modelValue="setCategory(filterBy)" />
        </div>
        <div>
          <Button variant="border-1 border-border p-2 rounded-2xl cursor-pointer w-10 hover:border-primary " text="Reset Filters" @click="resetFilter" />
        </div>
    </div>

    <!-- Products Grid -->

    <div v-if="filteredProducts?.length"
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product"/>
    </div>

    <!-- Load More Button -->
    <div class="flex justify-center mt-6" v-if="hasNextPage && !loading">
      <Button variant="btn-primary" text="Load More" @click="loadMore" />
    </div>

    <!-- Loader -->
    <div v-if="loading && filteredProducts?.length === 0"
      class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      <SkeletonCard v-for="n in 4" :key="n" />
    </div>

    <div class="flex justify-center mt-6" v-if="loading">
      <p>Loading...</p>
    </div>
    <div class="flex justify-center mt-6" v-if="!loading && filteredProducts?.length === 0">
      <p>No products found.</p>      
    </div>
  </div>
</template>

<script>
import { useProductsStore } from "@/stores/products";
import { mapState, mapActions } from "pinia";
import Button from '@/components/UI/Button.vue';
import Carousel from '@/components/UI/Carousel.vue';
import Select from '@/components/UI/Select.vue';
import Badge from '@/components/UI/Badge.vue';
import Input from '@/components/UI/Input.vue';
import Ratiing from "@/components/UI/Ratiing.vue";
import SkeletonCard from "@/components/UI/SkeletonCard.vue";
import ProductCard from "@/components/UI/ProductCard.vue";

export default {
  name: "ProductsPage",
  components: { Select, Carousel, Button, Badge, Input, Ratiing, SkeletonCard, ProductCard },

  data() {
    return {
      sortBy: "default",
      filterBy: "",
      search: "",
      searchTimeout: null,
    };
  },

  computed: {
    ...mapState(useProductsStore, ["filteredProducts", "categories", "loading", "hasNextPage"])
  },

  methods: {
    ...mapActions(useProductsStore, ["fetchAllProducts", 'fetchAllProductsCategory', 'fetchProducts', "setSearchQuery", "setCategory", "setSortBy", "loadMore",'reset']),

    debouncedSearch() {
    clearTimeout(this.searchTimeout)
    this.searchTimeout = setTimeout(() => {
      this.setSearchQuery(this.search)
      }, 300)
    },
    resetFilter(){
      this.search=""
      this.filterBy=""
      this.sortBy=""
      this.reset()
      this.fetchProducts()
    }
  },


  mounted() {
    this.fetchAllProductsCategory();
    this.fetchProducts();
  }
};
</script>
