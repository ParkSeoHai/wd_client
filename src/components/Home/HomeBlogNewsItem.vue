<template>
  <div class="item row d-flex align-items-center">
    <div class="col-5">
      <router-link :to="newsObj.linkUrl">
        <img :src="newsObj.image" :alt="newsObj.title" />
      </router-link>
    </div>
    <div class="col-7 ps-2">
      <h3 class="title mt-0">
        <router-link :to="newsObj.linkUrl">
          {{ newsObj.title }}
        </router-link>
      </h3>
      <div class="time d-flex align-items-center">
        <i class="bi bi-calendar3 icon"></i>
        <span>{{ newsObj.time }}</span>
      </div>
    </div>
  </div>
</template>

<script setup>
const { newsObj } = defineProps(["newsObj"]);
</script>
