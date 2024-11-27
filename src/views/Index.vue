<template>
  <!-- Home Slider -->
  <HomeSlider />
  <!-- Banner group -->
  <HomeBannerGroup />
  <!-- Section category -->
  <HomeCategory class="d-none" />
  <!-- Section flash sale -->
  <HomeFlashSale />
  <!-- Section collection -->
  <HomeCollectionGroup />
  <!-- Section Product group 1 -->
  <HomeCollectionListProduct category-name="Điện thoại" category-url="dien-thoai" />
  <!-- Section Product group 2 -->
  <HomeCollectionListProduct category-name="Laptop" category-url="laptop" />
  <!-- Section Product group 2 -->
  <HomeCollectionListProduct category-name="Phụ kiện" category-url="phu-kien" />
  <!-- Section home blog -->
  <HomeBlogNews />
</template>

<script setup>
// Component
import HomeSlider from "@/components/Home/HomeSlider.vue";
import HomeBannerGroup from "@/components/Home/HomeBannerGroup.vue";
import HomeCategory from "@/components/Home/HomeCategory.vue";
import HomeFlashSale from "@/components/Home/HomeFlashSale.vue";
import HomeCollectionGroup from "@/components/Home/HomeCollectionGroup.vue";
import HomeCollectionListProduct from "@/components/Home/HomeCollectionListProduct.vue";
import HomeBlogNews from "@/components/Home/HomeBlogNews.vue";
</script>
