<template>
  <div class="row">
    <div class="item d-flex align-items-center">
      <div class="col-5">
        <img :src="newsObj.image" :alt="newsObj.title" />
      </div>
      <div class="col-7 ps-2">
        <h3 class="title mt-0">
          <a :href="newsObj.linkUrl">
            {{ newsObj.title }}
          </a>
        </h3>
        <div class="time d-flex align-items-center">
          <i class="bi bi-calendar3 icon"></i>
          <span>{{ newsObj.time }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
const { newsObj } = defineProps(['newsObj'])
</script>
