<template>
  <div class="item">
    <div class="box-cat">
      <a href="#" class="link-img-cat">
        <div class="box-img">
          <img :src="categoryObj.imageUrl" :alt="categoryObj.name" />
        </div>
        <span class="banner-content">{{ categoryObj.name }}</span>
      </a>
    </div>
  </div>
</template>

<script setup>
// Props import from Home/HomeCategory.vue
const { categoryObj } = defineProps(['categoryObj'])
</script>
