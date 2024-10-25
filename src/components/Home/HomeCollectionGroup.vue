<template>
  <!-- Section product -->
  <section class="section_collection_group">
    <div class="container p-0">
      <div>
        <div class="row">
          <div class="col-6">
            <!-- Sản phẩm mới -->
            <HomeCollectionGroupItem
              :title="'Sản phẩm mới'"
              :linkHref="'/sanphammoi'"
              :listProduct="listProductNews"
            />
          </div>

          <div class="col-6">
            <!-- Sản phẩm bán chạy -->
            <HomeCollectionGroupItem
              :title="'Sản phẩm bán chạy'"
              :linkHref="'/sanphambanchay'"
              :listProduct="listProductHots"
            />
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref } from 'vue'
import HomeCollectionGroupItem from './HomeCollectionGroupItem.vue'

const listProductNews = ref([
  {
    id: 1,
    name: 'Đồng hồ thông minh XTF',
    discount: 10,
    defaultImage: 'src/assets/images/applewatch-4.jpg',
    colorCount: 5,
    price: '19690000',
    priceSale: '17690000'
  }
])

const listProductHots = ref([
  {
    id: 1,
    name: 'Đồng hồ thông minh XTF',
    discount: 10,
    defaultImage: 'src/assets/images/applewatch-4.jpg',
    colorCount: 5,
    price: '19690000',
    priceSale: '17690000'
  }
])
</script>
