<template>
  <!-- Breadcrumb -->
  <nav aria-label="breadcrumb">
    <ol class="breadcrumb mb-0">
      <li class="breadcrumb-item">
        <router-link to="/" class="breadcrumb__link"
          ><span><i class="me-2 bi bi-house-door-fill"></i></span> Trang chủ</router-link
        >
      </li>

      <li class="breadcrumb-item" v-for="breadcrumb in breadcrumbs" :key="breadcrumb._id">
        <router-link :to="`/${breadcrumb.category_url}`" class="breadcrumb__link">{{
          breadcrumb.category_name
        }}</router-link>
      </li>

      <li class="breadcrumb-item active">
        {{ breadcrumbActive }}
      </li>
    </ol>
  </nav>
</template>

<script setup>
const { breadcrumbs, breadcrumbActive } = defineProps([
  "breadcrumbs",
  "breadcrumbActive",
]);
</script>
