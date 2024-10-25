<template>
  <section id="section-category">
    <div class="container p-0">
      <div class="bg-color-white">
        <div class="list-cat d-flex justify-content-between">
          <!-- Item -->
          <HomeCategoryItem
            v-for="(category, index) in listCategories"
            :key="index"
            :categoryObj="category"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import HomeCategoryItem from './HomeCategoryItem.vue'

const listCategories = [
  {
    imageUrl: 'src/assets/images/section-category-4.png',
    name: 'Xiaomi Redmi Note 12'
  },
  {
    imageUrl: 'src/assets/images/section-category-3.png',
    name: 'Samsung S23 Series'
  },
  {
    imageUrl: 'src/assets/images/applewatch-2.jpg',
    name: 'Apple Watch DZ09'
  },
  {
    imageUrl: 'src/assets/images/section-category-4.png',
    name: 'Xiaomi Redmi Note 12'
  },
  {
    imageUrl: 'src/assets/images/section-category-3.png',
    name: 'Samsung S23 Series'
  },
  {
    imageUrl: 'src/assets/images/applewatch-2.jpg',
    name: 'Apple Watch DZ09'
  },
  {
    imageUrl: 'src/assets/images/section-category-4.png',
    name: 'Xiaomi Redmi Note 12'
  },
  {
    imageUrl: 'src/assets/images/section-category-3.png',
    name: 'Samsung S23 Series'
  },
  {
    imageUrl: 'src/assets/images/applewatch-2.jpg',
    name: 'Apple Watch DZ09'
  },
  {
    imageUrl: 'src/assets/images/section-category-4.png',
    name: 'Xiaomi Redmi Note 12'
  }
]
</script>
