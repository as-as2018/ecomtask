import { defineStore } from "pinia";

const useCartStore = defineStore("cart", {
  state: () => ({
    items: [],
  }),
  getters: {
    itemCount: (state) => {
      return state.items.reduce((total, item) => total + item.quantity, 0);
    },
    totalPrice: (state) => {
      return state.items.reduce(
        (total, item) => total + item.price * item.quantity,
        0
      );
    },
  },
  actions: {
    addToCart(product) {
        const existingItem = this.items.find(item => item.id === product.id);

        if (existingItem) {
            console.log("Already in cart, incrementing");
            existingItem.quantity++
        } else {
            console.log("Not in cart, pushing new");
            this.items.push({ ...product, quantity: 1 });
        }
        console.log(JSON.parse(JSON.stringify(this.items)));
        
    },

    removeFromCart(productId) {
      this.items = this.items.filter((item) => item.id !== productId);
    },
    updateQuantity(productId, quantity) {
      const item = this.items.find((item) => item.id === productId);
      if (item) {
        item.quantity = quantity;
      }
    },
  },
  persist: {
    enabled: true,
    strategies: [{ storage: localStorage, key: "cart-store" }],
  },
});

export default useCartStore;