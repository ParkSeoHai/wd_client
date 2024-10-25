<template>
  <div class="col-4 pe-0 banner-item">
    <a :href="bannerObj.linkUrl">
      <img :src="bannerObj.imageUrl" alt="" class="banner-group-img" />
    </a>
  </div>
</template>

<script setup>
// Props import from Home/HomebannerGroup.vue
const { bannerObj } = defineProps(['bannerObj'])
</script>
