<template>
  <div class="w-full bg-surface shadow-lg px-4 py-2 flex justify-between items-center">
    <!-- Left side: Logo -->
    <button @click="()=>$router.push('/')"  class="flex items-center gap-2 cursor-pointer" >
      <img 
        src="@/assets/logo.png" 
        alt="Logo" 
        class="border border-border shadow-2xl rounded-2xl h-12 w-auto"
      />
    </button >

    <!-- Right side (desktop only) -->
    <div class="hidden md:flex items-center gap-4">
      <RouterLink 
        v-for="item in navItems"
        :key="item.to"
        :to="item.to"
        class="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl transition flex justify-start items-center gap-2"
      >
         <Icon :icon="item.icon" width="22" height="22" />
        {{ item.label }}
        <span v-if="item.label==='Cart'">({{ itemCount }})</span>
      </RouterLink >

      <!-- Theme Toggle -->
      <button 
        @click="toggleTheme" 
        class="w-[3rem] h-[3rem] flex items-center justify-center p-2 shadow-lg rounded-full bg-primary hover:bg-primary70 text-white cursor-pointer"
      >
        <Icon icon="iconamoon:mode-light-bold" width="22" height="22" />
      </button>
    </div>

    <!-- Mobile Hamburger -->
    <button 
      class="md:hidden p-2 rounded-lg bg-primary text-white"
      @click="drawerOpen = true"
    >
      <Icon icon="mdi:menu" width="24" height="24" />
    </button>

    <!-- Drawer Menu (Mobile only) -->
    <transition name="slide">
      <div 
        v-if="drawerOpen" 
        class="fixed inset-0 bg-black/50 z-40"
        @click.self="drawerOpen = false"
      >
        <div class="absolute top-0 right-0 h-full w-64 bg-surface shadow-xl p-4 flex flex-col gap-4 z-50">
          <!-- Close Button -->
          <button 
            class=" p-2 text-text flex justify-between items-center gap-2 border-b-2 border-gray-200"
            @click="drawerOpen = false"
          >
            <span    >
              <img 
                src="@/assets/logo.png" 
                alt="Logo" 
                class="border border-border shadow-2xl rounded-2xl h-12 w-auto"
              />
            </span >
            <span class="shadow-2xl rounded-2xl border-border border-1 w-12 h-12 flex justify-center items-center">

              <Icon icon="mdi:close" class="text-primary" width="24" height="24" />
            </span>
          </button>

          <!-- Drawer Navigation Links -->
          <RouterLink 
            v-for="item in navItems"
            :key="item.to"
            :to="item.to"
            class="bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl transition flex justify-start items-center gap-2"
            @click="drawerOpen = false"
          >
          <Icon :icon="item.icon" width="22" height="22" />
          {{ item.label }}
          <span v-if="item.label==='Cart'">({{ itemCount }})</span>
          </RouterLink >

          <!-- Theme Toggle -->
           <button @click="toggleTheme"   class="cursor-pointer bg-primary/10 text-primary hover:bg-primary/20 px-4 py-2 rounded-xl transition flex justify-start items-center gap-2" >
               <Icon icon="iconamoon:mode-light-bold" width="22" height="22" />               
            {{ theme === 'light' ? 'Light Mode' : 'Dark Mode' }}
           </button>
        </div>
      </div>
    </transition>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia'
import useThemeStore from '@/stores/themeStore'
import { Icon } from '@iconify/vue'
import useCartStore from '@/stores/cart'

export default {
  name: "Navbar",
  components: { Icon },
  data() {
    return {
      search: "",
      drawerOpen: false,
      navItems: [
        // {
        //   label: "Login / Register",
        //   to: "/auth",
        //   icon: "material-symbols:person-outline-rounded",         
          
        // },
        {
            label: "Home",
            to: "/",
            icon: "material-symbols:home-outline-rounded",                 
        },
        {
            label: "Cart",
            to: "/cart",
            icon: "material-symbols:shopping-cart-outline-rounded",         
        },
        {
            label: "Wishlist",
            to: "/wishlist",
            icon: "material-symbols:favorite-outline-rounded",         
        },
        {
            label: "Dashboard",
            to: "/dashboard",
            icon: "material-symbols:dashboard-outline",         
        },
      ]
    }
  },
  methods: {
    ...mapActions(useThemeStore, ['toggleTheme'])
  },
   computed: {
    ...mapState(useThemeStore, ['theme']),
    ...mapState(useCartStore, ["itemCount", "totalPrice"]),
  }
}
</script>

<style>
/* Drawer slide animation */
.slide-enter-active,
.slide-leave-active {
  transition: transform 0.3s ease;
}
.slide-enter-from,
.slide-leave-to {
  transform: translateX(100%);
}
</style>
