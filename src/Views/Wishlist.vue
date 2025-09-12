<template lang="">
   <div class="w-full h-full">
    <h1 class="text-2xl font-bold mb-4">❤️ Wishlist</h1>
    <h2 class="text-l font-semibold mb-4 text-text/50 ml-2">Save your favorite products to your wishlist and shop them later—quick, easy, and organized.</h2>
    <div v-if="getSavedProduct?.length"
      class="mt-6 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      <ProductCard v-for="product in getSavedProduct" :key="product.id" :product="product" @view-details="viewDetails"
        @add-to-cart="addToCart" />
    </div>
    </div>
</template>
<script>
import { mapState } from 'pinia';
import ProductCard from '@/components/UI/ProductCard.vue';
import { useProductsStore } from '@/stores/products';


export default {
    name:'Wishlist',
    components:{ProductCard},
    computed:{
        ...mapState(useProductsStore, ["getSavedProduct"])
    }
}
</script>
<style lang="">
    
</style>