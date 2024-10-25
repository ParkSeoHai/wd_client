<template>
  <div class="item">
    <div class="img">
      <router-link :to="{
        name: 'product',
        params: {
          textUrl: `${productObj.textUrl}`
        }
      }">
        <img :src="productObj.defaultImage" :alt="productObj.name" />
      </router-link>
      <!-- Hiện icon khi hover item -->
      <div class="icon-hover">
        <i class="bi bi-search"></i>
      </div>
    </div>
    <div class="content">
      <h3 class="title">
        <router-link :to="{
          name: 'product',
          params: {
            textUrl: `${productObj.textUrl}`
          }
        }">
          {{ productObj.name }}
        </router-link>
      </h3>
      <div>
        <ul class="list-variants pt-2">
          <li>+{{ productObj.colorCount }} màu sắc</li>
        </ul>
      </div>
      <div class="box-pro-prices pt-1 d-flex align-items-center">
        <span>{{ formatter.format(productObj.priceSale) }}</span>
        <del class="compare-price ps-3">{{ formatter.format(productObj.price) }}</del>
      </div>
      <ul class="hash-tag-loop">
        <li>Nhập tag hashtag_nội dung hiển thị để show nội dung này</li>
      </ul>
      <div class="fl_progressbar_group d-flex align-items-center">
        <div class="icon d-flex align-items-center">
          <i class="bi bi-fire"></i>
        </div>
        <span v-if="percentSale >= 90">Sắp cháy hàng</span>
        <span v-else>Đã bán <strong>{{ productObj.quantitySold }}</strong> sản phẩm</span>
      </div>

      <div class="fl_progressbar">
        <div class="fl_percent" :style="{ width: percentSale + '%' }"></div>
      </div>
    </div>
  </div>
</template>

<script setup>
// Props import from Home/HomeFlashSaleBody.vue
const { productObj } = defineProps(['productObj'])
// Format to VND
const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND'
})

const percentSale = (productObj.quantitySold / productObj.quantitySale) * 100
</script>
