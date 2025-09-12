<template lang="">
   <div :data-theme="theme||light" id="vue-app">
    <Navbar />
    <main class="p-4">
       <router-view/>
    </main>
      
  </div>
</template>
<script>
import { mapActions, mapState } from 'pinia';
import useThemeStore from './stores/themeStore';
import { Icon } from '@iconify/vue';
import Navbar from './components/Navbar.vue';


export default {
  name: "App",
  components: {
    Icon,
    Navbar
  },
  beforeMount() {
    this.setCurrentTheme(this.theme);       
  },
  methods: {
     ...mapActions(useThemeStore, ['setCurrentTheme']),
  },
  computed: {
    ...mapState(useThemeStore, ['theme'])
  }
}
</script>
<style lang="">
  
</style>