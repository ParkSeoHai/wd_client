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
      <h2>{{ props.title }}</h2>
      <a :href="props.linkHref">
        <span>Xem tất cả</span>
        <i class="bi bi-chevron-double-right"></i>
      </a>
    </div>

    <div class="block-list-product">
      <div
        class="body-col product-new list-product"
        :style="[
          `width: ${widthCollectionStyle}px`,
          `grid-template-columns: repeat(${props.listProduct.length}, 1fr)`,
          `margin-left: ${marginLeftBlock}px`
        ]"
      >
        <ProductItem v-for="product in props.listProduct" :key="product.id" :productObj="product" />
      </div>
      <ul v-if="circleCount > 1" class="list-circle">
        <li
          class="item"
          v-for="n in circleCount"
          :key="n"
          :class="(n - 1) * -widthBlog === marginLeftBlock ? 'active' : ''"
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
import { ref, watchEffect } from 'vue'
import ProductItem from '../ProductItem.vue'

// Props import from HomeCollectionGroup.vue
const props = defineProps(['title', 'linkHref', 'listProduct'])

// Caculator width div class=`product-new list-product`
const widthCollectionStyle = props.listProduct.length * 210
// Width each blog product
const widthBlog = 210 * 3

// Calc count circle display
const circleCount = Math.ceil(props.listProduct.length / 3)
// Value margin style
let marginLeftBlock = ref(0)

// Handle show button arrow
let showArrowLeft = ref(false)
let showArrowRight = ref(true)

const handleShowArrow = watchEffect(() => {
  // Arrow right
  if (-(marginLeftBlock.value * 2) > widthCollectionStyle) {
    showArrowRight.value = false
  } else {
    showArrowRight.value = true
  }
  // Arrow left
  if (marginLeftBlock.value !== 0) {
    showArrowLeft.value = true
  } else {
    showArrowLeft.value = false
  }
})
handleShowArrow

// Calc when prev, next blog product
function handleArrowProduct(value) {
  marginLeftBlock.value += value * widthBlog
}

// Calc when click circle
function handleCircleProduct(value) {
  marginLeftBlock.value = -(widthBlog * value)
}
</script>
