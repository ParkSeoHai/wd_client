<template>
  <a :href="bannerObj.linkUrl" class="pe-0 banner-item">
    <img :src="bannerObj.imageUrl" alt="" class="banner-group-img" />
  </a>
</template>

<script setup>
// Props import from Home/HomebannerGroup.vue
const { bannerObj } = defineProps(["bannerObj"]);
</script>
