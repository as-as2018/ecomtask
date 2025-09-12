<template>
  <div
    class="border-1 border-border transform hover:-translate-y-2 hover:shadow-2xl shadow-2xs rounded-lg p-4 transition-shadow duration-300"
    tabindex="0"
  >
    <!-- Image -->
    <div class="mb-4 flex items-center justify-center relative">
      <Carousel :images="[product.thumbnail, ...product.images]" :interval="4000" />
    </div>

    <!-- Title -->
    <h2 class="text-lg font-bold text-primary mb-2">{{ product.title }}</h2>

    <!-- Category -->
    <p class="text-sm text-gray-500 dark:text-gray-400 mb-2">
      Category: <span class="font-medium capitalize">{{ product.category }}</span>
    </p>

    <!-- Price + Stock -->
    <div class="flex justify-between items-center mb-2">
      <p class="text-primary font-semibold">${{ product.price }}</p>
      <Badge
        v-if="product.stock > 0"
        variant="success"
        text="In Stock"
        class="m-1"
      />
      <Badge
        v-else
        variant="error"
        text="Out of Stock"
        class="m-1"
      />
    </div>

    <!-- Rating & fav-->
    <div class="flex justify-between items-center">
        <Rating :rating="product.rating" :maxStars="5" :showValue="true" />
        <button @click="saveProduct(product)" class="cursor-pointer"><Icon :icon="`material-symbols:${product?.saved?'favorite':'favorite-outline'}`" width="24" height="24" class="text-red-600" /></button>    
    </div>
    <!-- Description -->
    <!-- <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">
      {{ product.description }}     
    </p> -->

    <!-- Actions -->
    <div class="flex gap-2 mt-3">
      <button
        class="btn-primary"
        @click="viewDetails(product?.id)"
        
      >
      View Details
      </button>
    
      <button
        class="btn-secondary"
        @click="addProductToCart(product)"
      >
        Add to Cart
      </button>
    </div>
  </div>
</template>

<script>
import Carousel from "@/components/UI/Carousel.vue";
import Badge from "@/components/UI/Badge.vue";
import Button from "@/components/UI/Button.vue";
import Rating from "@/components/UI/Ratiing.vue";
import { Icon } from "@iconify/vue";
import { mapActions } from "pinia";
import { useProductsStore } from "@/stores/products";
import useCartStore from "@/stores/cart";

export default {
  name: "ProductCard",
  components: { Carousel, Badge, Button, Rating },
  props: {
    product: {
      type: Object,
      required: true
    }
  },
  computed:{
  },
  methods:{
    ...mapActions(useProductsStore, ['toggleWishlist']),
    ...mapActions(useCartStore, ['addToCart']),
    saveProduct(product){
        // console.log('product',JSON.parse(JSON.stringify(product)));
        this.toggleWishlist(product)        
    },
      addProductToCart(product) {
        // console.log("Adding to cart:", product  );    
      this.addToCart(product)
      // $emit('add-to-cart', product)
    },
    viewDetails(id) {
      // console.log("View details for product:", id);
      this.$router.push({name:'product-detail',params:{id}})
    //   $emit('view-details', product.id)
    },
  }
};
</script>
