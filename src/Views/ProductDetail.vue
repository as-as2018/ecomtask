<template>
    <div class="min-h-screen">
        <div v-if="product === null">
            <SkeletonCard v-for="n in 1" :key="n" />
        </div>
        <div v-else class="max-w-5xl mx-auto border-border/75 border rounded-lg shadow-lg p-6">
            <!-- Product Images Gallery -->
            <div class="grid md:grid-cols-2 gap-6">
                <div class="border-1 border-border p-2 rounded-2xl">
                    <img :src="selectedImage" alt="Product" class="w-full h-80 object-contain rounded-lg mb-4" />
                    <div class="flex gap-3 overflow-x-auto">
                        <img v-for="(img, idx) in product.images" :key="idx" :src="img" alt="Thumbnail"
                            class="w-20 h-20 object-cover  rounded cursor-pointer hover:opacity-75"
                            :class="{ 'ring-2 ring-[var(--color-primary)]': selectedImage === img }"
                            @click="selectedImage = img" />
                    </div>
                </div>

                <!-- Product Details -->
                <div class="flex flex-col justify-between">
                    <div>
                        <h1 class="text-2xl font-semibold text-primary">
                            {{ product.title }}
                        </h1>
                        <p class="text-text mt-2">
                            {{ product.description }}
                        </p>
                        <div class="flex justify-between items-center mt-4">

                            <!-- Price and Discount -->
                            <div>
                                <span class="text-2xl font-bold text-primary">
                                    ${{ product.price }}
                                </span>
                                <span class="ml-2 text-sm text-error">
                                    -{{ product.discountPercentage }}%
                                </span>
                            </div>
                            <!-- Stock -->
                            <div class="flex justify-between items-center mb-2">
                                <Badge v-if="product.stock > 0" variant="success" text="In Stock" class="m-1" />
                                <Badge v-else variant="error" text="Out of Stock" class="m-1" />
                            </div>
                        </div>
                        <!-- Rating -->
                        <div class="flex justify-between items-center gap-4">
                            <Ratiing :rating="product.rating" :maxStars="5" :showValue="true" />
                            <button @click="saveProduct(product)" class="cursor-pointer">
                                <Icon :icon="`material-symbols:${product?.saved ? 'favorite' : 'favorite-outline'}`"
                                    width="24" height="24" class="text-red-600" />
                            </button>
                        </div>
                    </div>

                    <!-- Add to Cart Button -->
                     <button
                        class="btn-secondary"
                        @click="addToCart(product)"
                    >
                        Add to Cart
                    </button>
                </div>
            </div>

            <!-- Reviews Section -->
            <div class="mt-8">
                <h2 class="text-xl font-semibold text-text mb-4">Customer Reviews</h2>
                <div v-if="product.reviews && product.reviews.length">
                    <div v-for="(review, index) in product.reviews" :key="index" class="border-b border-border py-3">
                        <div class="flex justify-between">
                            <span class="font-medium text-text">{{ review.reviewerName }}</span>
                            <Ratiing :rating="review.rating" :maxStars="5" :showValue="true" />
                        </div>
                        <p class="text-text/50 mt-1">
                            {{ review.comment }}
                        </p>
                    </div>
                </div>
                <p v-else class="text-text">No reviews yet.</p>
            </div>
        </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import Badge from '@/components/UI/Badge.vue';
import Ratiing from '@/components/UI/Ratiing.vue';
import { useProductsStore } from '@/stores/products';
import SkeletonCard from '@/components/UI/SkeletonCard.vue';
import useCartStore from '@/stores/cart';


export default {
    name: "ProductDetail",
    components: { Ratiing, Badge, SkeletonCard },
    data() {
        return {
            product: null,
            // product: {
            //     id: 1,
            //     title: "Essence Mascara Lash Princess",
            //     description:
            //         "The Essence Mascara Lash Princess is a popular mascara known for its volumizing and lengthening effects. Achieve dramatic lashes with this long-lasting and cruelty-free formula.",
            //     category: "beauty",
            //     price: 9.99,
            //     discountPercentage: 7.17,
            //     rating: 4.94,
            //     stock: 5,
            //     brand: "Essence",
            //     images: [
            //         "https://picsum.photos/200/300",
            //         "https://picsum.photos/200/300",
            //         "https://picsum.photos/200/300",
            //         "https://picsum.photos/200/300",
            //         "https://picsum.photos/200/300",
            //     ],
            //     reviews: [
            //         { rating: 2, comment: "Very unhappy with my purchase!", reviewerName: "John Doe" },
            //         { rating: 5, comment: "Very satisfied!", reviewerName: "Scarlett Wright" },
            //     ],
            // },
            selectedImage: null,
        };
    },

    computed: {
        ...mapState(useProductsStore, ['products'])
    },

    methods: {
        ...mapActions(useProductsStore, ['toggleWishlist','fetchProductById']),
         ...mapActions(useCartStore, ['addToCart']),
        saveProduct(product) {
            // console.log('product', JSON.parse(JSON.stringify(product)));
            this.toggleWishlist(product)
            this.product.saved=!this.product.saved
        },
    },

    mounted() {
        console.log('this.$route', this.$route.params.id);

        this.fetchProductById(this.$route.params.id).then((product) => {
            console.log('this.products',this.products);
            

            const storedProduct=  this.products?.length&& this.products.filter((p)=>p.id===product.id)[0]
            product.saved=storedProduct?.saved&&storedProduct?.saved===true?true:false
            this.product = product
            console.log(product);
            this.selectedImage = this.product?.images[0];
        })


    }
};
</script>
