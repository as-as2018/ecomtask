<template>
  <div class="p-6">
    <h1 class="text-2xl font-bold mb-4">🛒 Cart</h1>

    <!-- Empty state -->
    <div v-if="items.length === 0" class="text-text/50 italic">
      Your cart is empty.
    </div>

    <!-- Cart items -->
    <div v-else class="space-y-4">
      <CartCard
        v-for="item in items"
        :key="item.id"
        :item="item"
        @updateQuantity="updateQuantity"
        @remove="removeFromCart"
      />

      <!-- Cart summary -->
      <div class="border-t border-gray-200 pt-4 mt-4 flex justify-between font-semibold">
        <span>Total Items: {{ itemCount }}</span>
        <span>Total Price: ${{ totalPrice.toFixed(2) }}</span>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState, mapActions } from "pinia";
import useCartStore from "@/stores/cart";
import CartCard from "@/components/CartCard.vue";

export default {
  name: "Cart",
  components: { CartCard },
  computed: {
    ...mapState(useCartStore, ["items", "itemCount", "totalPrice"]),
   
  },
  methods: {
    ...mapActions(useCartStore, ["updateQuantity", "removeFromCart"]),
  },
};
</script>


