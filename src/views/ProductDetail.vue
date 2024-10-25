<template>
  <!-- Breadcrumb -->
  <Breadcrumb :breadcrumbs="breadcrumbs" :breadcrumbActive="breadcrumbActive" />
  <!-- Product detail info -->
  <div id="product-template" class="product-page">
    <!-- Section product detail -->
    <ProductDetailInfo :product="product" @update-cart="updateCart" />
  </div>
</template>

<script setup>
import { defineAsyncComponent, inject, onMounted, ref } from 'vue'
const Breadcrumb = ref()
const ProductDetailInfo = ref()
// Service
import { getProductByTextUrl } from '@/api/ProductService'

// Props from route
const props = defineProps(['textUrl'])
// Emit event to App.vue
const $emits = defineEmits(['update-cart'])

const $route = inject('$route')
const product = ref()

let breadcrumbs = [],
  breadcrumbActive
// Fetch data from server
const fetchData = async () => {
  try {
    product.value = await getProductByTextUrl($route, props.textUrl)
    // Asycn component
    ProductDetailInfo.value = defineAsyncComponent(
      () => import('@/components/ProductDetail/ProductDetailInfo.vue')
    )
    // Handle breadcrumbs
    product.value.categories.map((item) => {
      breadcrumbs.push({
        linkText: item.name,
        linkUrl: `danh-muc/${item.textUrl}`
      })
    })
    breadcrumbActive = product.value.name
    Breadcrumb.value = defineAsyncComponent(() => import('@/components/Breadcrumb.vue'))
  } catch (error) {
    console.error(error)
  }
}

// Update cart
const updateCart = () => {
  $emits('update-cart')
}

onMounted(fetchData)
</script>
