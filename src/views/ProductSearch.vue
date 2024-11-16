<template>
  <!-- Breadcrumb -->
  <Breadcrumb :breadcrumbs="[]" :breadcrumbActive="breadcrumbActive" />
  <!-- Content -->
  <Suspense>
    <template #default>
      <list-product @set-breadcrumb="setBreadcrumb" :search-str="searchStr" />
    </template>
    <template #fallback> Loading... </template>
  </Suspense>
</template>

<script setup>
import { ref } from "vue";
// Component
import Breadcrumb from "@/components/Breadcrumb.vue";
import ListProduct from "@/components/ProductSearch/ListProduct.vue";

// Props from params route
const { searchStr } = defineProps(["searchStr"]);

const breadcrumbActive = ref();

// Set data breadcrumbs
const setBreadcrumb = (data) => {
  breadcrumbActive.value = data.breadcrumbActive;
};
</script>
