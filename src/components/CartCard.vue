<template>
  <div class="flex items-center flex-wrap  border-1 border-border transform hover:-translate-y-2 hover:shadow-2xl shadow-2xs rounded-lg p-4 transition-shadow duration-300">
    <!-- Image -->
    <img
      :src="item.thumbnail"
      alt="product"
      class="w-20 h-20 object-cover rounded mr-4"
    />

    <!-- Info -->
    <div class="flex-1 mb-2">
      <h2 tabindex="0" @click="()=>this.$router.push({name:'product-detail',params:{id:item.id}})" class="text-primary font-semibold text-lg cursor-pointer">{{ item.title }}</h2>
      <p class="text-sm text-gray-500">${{ item.price }}</p>
      <p class="text-xs text-gray-400">Brand: {{ item.brand }}</p>
    </div>

    <!-- Quantity controls -->
    <div class="flex items-center gap-2">
      <button
        @click="changeQuantity(item.quantity - 1)"
        class="btn-muted"
        :disabled="item.quantity <= 1"
      >
        -
      </button>
      <span class="font-medium">{{ item.quantity }}</span>
      <button
        @click="changeQuantity(item.quantity + 1)"
        class="btn-muted"
      >
        +
      </button>
      <!-- Remove -->
      <button
        @click="$emit('remove', item.id)"
        class="btn-dangor"
      >
        Remove
      </button>
    </div>

   
  </div>
</template>

<script>
export default {
  name: "CartCard",
  props: {
    item: {
      type: Object,
      required: true,
    },
  },
  methods: {
    changeQuantity(newQty) {
      this.$emit("updateQuantity", this.item.id, newQty);
    },
  },
};
</script>
