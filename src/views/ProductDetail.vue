<script setup>
// Components
import ProductDetailInfo from "@/components/ProductDetail/ProductDetailInfo.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { ref } from "vue";

// Props from route
const { productUrl } = defineProps(["productUrl"]);

const breadcrumbs = ref([]);
const breadcrumbActive = ref();

// Set data breadcrumbs
const setBreadcrumb = (data) => {
  breadcrumbs.value = data.breadCrumbs;
  breadcrumbActive.value = data.breadcrumbActive;
};
</script>

<template>
  <!-- Breadcrumb -->
  <Breadcrumb :breadcrumbs="breadcrumbs" :breadcrumb-active="breadcrumbActive" />
  <!-- Product detail info -->
  <div id="product-template" class="product-page">
    <!-- Section product detail -->
    <section class="product-detail">
      <Suspense>
        <template #default>
          <ProductDetailInfo :product-url="productUrl" @set-breadcrumb="setBreadcrumb" />
        </template>
        <template #fallback>Loading...</template>
      </Suspense>
    </section>
  </div>
</template>
