<script setup>
import { ref } from "vue";

const { product, type } = defineProps(["product", "type"]);

// set product image default
const product_image = ref(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOU0iaTa57K7OKcsCM3m0tEORCxzbYllHIUQ&s"
);

// set product image is first image thumbs if exist
const setProductImage = (type = "leave") => {
  const imageThumbsLength = product.imageThumbs.length;
  if (type === "leave" && imageThumbsLength > 0) {
    product_image.value = product.imageThumbs[0].image_url;
  } else if (type === "over" && imageThumbsLength > 1) {
    product_image.value = product.imageThumbs[imageThumbsLength - 1].image_url;
  }
};
setProductImage();

const formatter = new Intl.NumberFormat("vi-VN", {
  style: "currency",
  currency: "VND",
});
</script>

<template>
  <div class="item">
    <router-link :to="`/san-pham/${product.product_url}`">
      <div class="item__price--percent" v-if="product.product_discount > 0">
        <p class="item__price--percent-detail">Giảm {{ product.product_discount }}%</p>
      </div>
      <div
        class="img"
        :class="{ 'image-after--bg': product.flash_sale }"
        @mouseover="setProductImage('over')"
        @mouseleave="setProductImage('leave')"
      >
        <img :src="product_image" :alt="product.product_name" />
        <!-- Hiện icon khi hover item -->
        <div class="icon-hover">
          <i class="bi bi-search"></i>
        </div>
      </div>
      <div class="content">
        <h3 class="title">
          <router-link :to="`/san-pham/${product.product_url}`">
            {{ product.product_name }}
          </router-link>
        </h3>
        <!-- <div class="pt-2">
        <ul v-if="product.colorCount > 0" class="list-variants">
          <li>+{{ product.colorCount }} màu sắc</li>
        </ul> -->
        <div class="box-pro-prices pt-1">
          <span>{{ formatter.format(product.product_price_sale) }}</span>
          <del
            v-if="product.product_price !== product.product_price_sale"
            class="compare-price d-block pt-2"
            >{{ formatter.format(product.product_price) }}</del
          >
        </div>
      </div>
    </router-link>

    <ul class="hash-tag-loop">
      <li>Nhập tag hashtag_nội dung hiển thị để show nội dung này</li>
    </ul>

    <!-- Flash sale -->
    <template v-if="type === 'flash_sale' && product.flash_sale">
      <div class="fl_progressbar_group d-flex align-items-center">
        <div class="icon d-flex align-items-center">
          <i class="bi bi-fire"></i>
        </div>
        <span v-if="percentSale >= 90">Sắp cháy hàng</span>
        <span v-else
          >Đã bán <strong>{{ product.flash_sale.quantity_sold }}</strong> sản phẩm</span
        >
      </div>
      <div class="fl_progressbar">
        <div
          class="fl_percent"
          :style="{
            width:
              (product.flash_sale.quantity_sold / product.flash_sale.quantity_sale) *
                100 +
              '%',
          }"
        ></div>
      </div>
    </template>
  </div>
</template>
