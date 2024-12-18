<template>
  <!-- Breadcrumb -->
  <Breadcrumb :breadcrumbs="breadcrumbs" :breadcrumbActive="breadcrumbActive" />
  <!-- Content -->
  <Suspense>
    <template #default>
      <list-product @set-breadcrumb="setBreadcrumb" :category-url="categoryUrl" />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup>
// Component
import Breadcrumb from "@/components/Breadcrumb.vue";
import ListProduct from "@/components/ProductCategory/ListProduct.vue";
import { inject, onMounted, ref } from "vue";

const setModalBackground = inject("setModalBackground");

// Props category url from params route
const { categoryUrl } = defineProps(["categoryUrl"]);

const breadcrumbs = ref([]);
const breadcrumbActive = ref();

// Set data breadcrumbs
const setBreadcrumb = (data) => {
  breadcrumbs.value = data.breadCrumbs;
  breadcrumbActive.value = data.breadcrumbActive;
};

onMounted(() => {
  setModalBackground(false);
});
</script>
