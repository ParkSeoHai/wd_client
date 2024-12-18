<template>
  <div class="bg-color-white block-group">
    <button
      v-if="circleCount > 1 && showArrowLeft"
      class="btn-arrow btn-arrow-left"
      @click.prevent="handleArrowProduct(1)"
    >
      <i class="bi bi-chevron-compact-left"></i>
    </button>

    <div class="top-head d-flex justify-content-between">
      <h2>{{ title }}</h2>
      <a :href="linkHref" class="d-none">
        <span>Xem tất cả</span>
        <i class="bi bi-chevron-double-right"></i>
      </a>
    </div>

    <div class="block-list-product">
      <div
        class="body-col product-new list-product d-grid"
        :style="[
          `width: ${products.length * widthItem.width}px`,
          `grid-template-columns: repeat(${products.length}, 1fr)`,
          `margin-left: ${marginLeftBlock}px`,
        ]"
      >
        <ProductItem v-for="product in products" :key="product._id" :product="product" />
      </div>
      <ul v-if="circleCount > 1" class="list-circle">
        <li
          class="item"
          v-for="n in circleCount"
          :key="n"
          :class="
            (n - 1) * -(widthItem.width * widthItem.countShow) === marginLeftBlock
              ? 'active'
              : ''
          "
          @click.prevent="handleCircleProduct(n - 1)"
        ></li>
      </ul>
    </div>

    <button
      v-if="circleCount > 1 && showArrowRight"
      class="btn-arrow btn-arrow-right"
      @click.prevent="handleArrowProduct(-1)"
    >
      <i class="bi bi-chevron-compact-right"></i>
    </button>
  </div>
</template>

<script setup>
import { computed, ref, watchEffect } from "vue";
import ProductItem from "../ProductItem.vue";
import axios from "axios";
import { useWindowSize } from "@vueuse/core";

// Props import from HomeCollectionGroup.vue
const { title, linkHref, urlApi } = defineProps(["title", "linkHref", "urlApi"]);

const products = ref([]);

// Get product from urlApi
const getProducts = async () => {
  const res = await axios.get(urlApi);
  return res.data.metadata.products;
};

products.value = await getProducts();

// Width each blog product
const { width } = useWindowSize();
const widthItem = computed(() => {
  let data = {
    width: 207,
    countShow: 3,
  };
  if (width.value < 1400) {
    data.width = 177;
  }
  if (width.value < 1200) {
    data.width = width.value / 4 - 20;
    data.countShow = 2;
  }
  if (width.value < 768) {
    data.width = width.value / 3 - 13;
    data.countShow = 3;
  }
  if (width.value < 576) {
    data.width = width.value / 2 - 20;
    data.countShow = 2;
  }
  return data;
});

// Calc count circle display
const circleCount = Math.ceil(products.value.length / widthItem.value.countShow);
// Value margin style
let marginLeftBlock = ref(0);

// Handle show button arrow
let showArrowLeft = ref(false);
let showArrowRight = ref(true);

const handleShowArrow = watchEffect(() => {
  // Arrow right
  if (
    -(marginLeftBlock.value + widthItem.value.width) * widthItem.value.countShow >
    products.value.length * widthItem.value.width
  ) {
    showArrowRight.value = false;
  } else {
    showArrowRight.value = true;
  }
  // Arrow left
  if (marginLeftBlock.value !== 0) {
    showArrowLeft.value = true;
  } else {
    showArrowLeft.value = false;
  }
});
handleShowArrow;

// Calc when prev, next blog product
function handleArrowProduct(value) {
  marginLeftBlock.value += value * (widthItem.value.width * widthItem.value.countShow);
}

// Calc when click circle
function handleCircleProduct(value) {
  marginLeftBlock.value = -(widthItem.value.width * widthItem.value.countShow * value);
}
</script>
