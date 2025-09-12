<template lang="">
    <div>
        <h1 class="text-2xl font-bold mb-4">📊 Cart Analytics Dashboard</h1>
        <h2 class="text-l font-semibold mb-4 text-text/50 ml-2">Visualize your cart with insights on items, costs, and categories at a glance.</h2>

        <div class="w-full h-full">
            <DashboardAnalytics :cart="items" />
        </div>
        </div>
</template>
<script>
import DashboardAnalytics from '@/components/DashboardAnalytics.vue';
import { mapState } from 'pinia';
import useCartStore from '@/stores/cart';
export default {
    name:'Dashboard',
    components:{
        DashboardAnalytics
    },
    computed:{
        ...mapState(useCartStore, ["items"]),
    },
}
</script>
<style lang="">
    
</style>