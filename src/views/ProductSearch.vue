<template>
  <!-- Breadcrumb -->
  <Breadcrumb :breadcrumbs="[]" :breadcrumbActive="breadcrumbActive" />
  <!-- Content -->
  <div class="product-search-block">
    <Suspense>
      <template #default>
        <container @set-breadcrumb="setBreadcrumb" :search-str="searchStr" />
      </template>
      <template #fallback> Loading... </template>
    </Suspense>
  </div>
</template>

<script setup>
import { ref } from "vue";
// Component
import Breadcrumb from "@/components/Breadcrumb.vue";
import Container from "@/components/ProductSearch/Container.vue";

// Props from params route
const { searchStr } = defineProps(["searchStr"]);

const breadcrumbActive = ref();

// Set data breadcrumbs
const setBreadcrumb = (data) => {
  breadcrumbActive.value = data.breadcrumbActive;
};
</script>
