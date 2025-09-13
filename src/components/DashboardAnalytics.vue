<template>
  <div class="p-6 space-y-6">
    <!-- Cards -->
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div class="p-4 border-2 border-border   bg-surface  shadow-l hover:shadow-2xl translate hover:-translate-y-2 transition-translate duration-75 rounded">
        <h2 class="font-semibold">Average Product Price</h2>
        <p class="text-2xl font-bold text-cyan-600">
          ${{ averagePrice.toFixed(2) }}
        </p>
      </div>
      <div class="p-4 border-2 border-border   bg-surface  shadow-l hover:shadow-2xl translate hover:-translate-y-2 transition-translate duration-75 rounded">
        <h2 class="font-semibold">Total Items</h2>
        <p class="text-2xl font-bold text-green-600">
          {{ totalItems }}
        </p>
      </div>
      <div class="p-4 border-2 border-border   bg-surface  shadow-l hover:shadow-2xl translate hover:-translate-y-2 transition-translate duration-75 rounded">
        <h2 class="font-semibold">Total Cost</h2>
        <p class="text-2xl font-bold text-orange-600">
          ${{ totalCost.toFixed(2) }}
        </p>
      </div>
    </div>

    <!-- Charts -->
    <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
      <div class="p-8 border-2 border-border  bg-surface shadow-l hover:shadow-2xl translate hover:-translate-y-2 transition-translate duration-75 rounded h-80">
        <h2 class="font-semibold mb-2">Items by Category</h2>
        <PieChart
          v-if="categoryData"
          :data="categoryData"
          :options="defaultOptions"
        />
        <p v-else class="text-gray-500">No data available</p>
      </div>

      <div class="p-8 border-2 border-border  bg-surface shadow-l hover:shadow-2xl translate hover:-translate-y-2 transition-translate duration-75 rounded h-80">
        <h2 class="font-semibold mb-2">Items vs Cost Trend</h2>
        <LineChart
          v-if="trendData"
          :data="trendData"
          :options="defaultOptions"
        />
        <p v-else class="text-gray-500">No data available</p>
      </div>
    </div>
  </div>
</template>

<script>
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
} from "chart.js";
import { Pie, Line } from "vue-chartjs";

ChartJS.register(
  Title,
  Tooltip,
  Legend,
  ArcElement,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement
);

export default {
  name: "DashboardAnalytics",
  components: {
    PieChart: Pie,
    LineChart: Line,
  },
  props: {
    cart: {
      type: Array,
      required: true,
    },
  },
  computed: {
    totalItems() {
      return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },
    totalCost() {
      return this.cart.reduce(
        (sum, item) => sum + item.price * item.quantity,
        0
      );
    },
    averagePrice() {
      return this.totalItems > 0 ? this.totalCost / this.totalItems : 0;
    },
    categoryData() {
      if (!this.cart.length) return null;
      const grouped = {};
      this.cart.forEach((item) => {
        grouped[item.category] = (grouped[item.category] || 0) + item.quantity;
      });
      return {
        labels: Object.keys(grouped),
        datasets: [
          {
            label: "Items by Category",
            data: Object.values(grouped),
            backgroundColor: [
              "#60a5fa",
              "#34d399",
              "#f87171",
              "#fbbf24",
              "#a78bfa",
              "#f472b6",
            ],
          },
        ],
      };
    },
    trendData() {
      if (!this.cart.length) return null;
      let cumulativeItems = 0;
      let cumulativeCost = 0;
      const labels = [];
      const itemsData = [];
      const costData = [];

      this.cart.forEach((item, index) => {
        cumulativeItems += item.quantity;
        cumulativeCost += item.quantity * item.price;
        labels.push(item.title);
        itemsData.push(cumulativeItems);
        costData.push(cumulativeCost);
      });

      return {
        labels,
        datasets: [
          {
            label: "Total Items",
            data: itemsData,
            borderColor: "#34d399",
            backgroundColor: "#34d399",
            fill: false,
          },
          {
            label: "Total Cost ($)",
            data: costData,
            borderColor: "#60a5fa",
            backgroundColor: "#60a5fa",
            fill: false,
          },
        ],
      };
    },
    defaultOptions() {
      return {
        responsive: true,
        maintainAspectRatio: false,
        plugins: {
          legend: { position: "bottom" },
        },
      };
    },
  },
};
</script>

<style scoped>
h2 {
  font-size: 1rem;
  margin-bottom: 0.5rem;
}
</style>
