import { createRouter, createWebHistory } from "vue-router";
import Home from "@Views/Home.vue";
import LoginRegister from "@Views/LoginRegister.vue";
import ProductDetail from "@Views/ProductDetail.vue";
import ProductCart from "@Views/ProductCart.vue";
import Wishlist from "@Views/Wishlist.vue";
import Dashboard from "@/Views/Dashboard.vue";

const routes = [
  {
    name:'home',
    path: "/",
    component: Home,
  },
  {
    name:'auth',
    path: "/auth",
    component: LoginRegister,
  },
  {
    name:'product-detail',
    path: "/product-detail/:id",
    component: ProductDetail,
  },
  {
    name:'cart',
    path: "/cart",
    component: ProductCart,
  },
  {
    name:'wishlist',
    path: "/wishlist",
    component: Wishlist,
  },
  {
    name:'dashboard',
    path: "/dashboard",
    component: Dashboard,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
