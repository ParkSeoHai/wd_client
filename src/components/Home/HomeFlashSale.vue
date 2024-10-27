<template>
  <!-- Section flash sale -->
  <section id="section-flash-sale">
    <div class="container p-0">
      <div class="bg-flash-sale">
        <!-- Top -->
        <HomeFlashSaleTop :flashSaleObj="flashSale" />
        <!-- Body -->
        <HomeFlashSaleBody :products="products" />
        <!-- Bottom -->
        <div class="flash-sale-bottom">
          <div class="link">
            <router-link to="/danh-muc/khuyen-mai" class="btn">
              <span>Xem tất cả</span>
              <i class="bi bi-chevron-double-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { defineAsyncComponent, inject, onMounted, ref } from "vue";
// Component
let HomeFlashSaleBody;
import HomeFlashSaleTop from "./HomeFlashSaleTop.vue";
// Service
import { getFlashSale } from "@/api/FlashSaleService.js";

const $route = inject("$route");

// Data fetch api
const data = ref();
// FlashSale object
const flashSale = ref({
  day: 0,
  hour: 0,
  minute: 0,
  second: 0,
});

// Products
let products = [];

// Async function to fetch categories
const fetchFlashSale = async () => {
  try {
    // Asign value
    data.value = await getFlashSale($route);
    // FlashSale object
    flashSale.value = {
      day: data.value.day,
      hour: data.value.hour,
      minute: data.value.minute,
      second: data.value.second,
    };
    // Products
    products = data.value.flashSaleItems;
    HomeFlashSaleBody = defineAsyncComponent(() => import("./HomeFlashSaleBody.vue"));
  } catch (error) {
    console.error(error.message);
  }
};
</script>
