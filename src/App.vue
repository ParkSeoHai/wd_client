<template>
  <Header @handle-modal="handleModal" @update-cart="updateCart" :cartItems="cartItems" />
  <main>
    <div class="container p-0">
      <RouterView @update-cart="updateCart" :cartItems="cartItems" />
    </div>
    <Modal v-if="isShowModal" />
  </main>
  <Footer />
</template>

<script setup>
import { defineAsyncComponent, inject, onMounted, ref } from 'vue'
// Component
let Header = ref()
import Footer from './components/Footer.vue'
import Modal from './components/Modal.vue'
// API
import { fetchApi } from '@/api/Common.js'

// Show background-modal
let isShowModal = ref(false)
const $route = inject('$route') // Route call api

// Hanlel show / hide modal
function handleModal(value) {
  isShowModal.value = value
}

// Get value cart object
const cartItems = ref([])

// Call api get cart
const fetchAPI = async () => {
  await getCartItems()
  // Import component Header
  Header.value = defineAsyncComponent(() => import('./components/Header.vue'))
}

// Get cart items
const getCartItems = async () => {
  if (!localStorage.getItem('wdsmartcartid')) {
    return
  }
  const urlGetCart = `${$route}/Customer/GetCartById?id=${localStorage.getItem('wdsmartcartid')}`
  const responseGetCart = await fetchApi(urlGetCart)
  cartItems.value = responseGetCart.data.cartItems
}

// Refresh cart
const updateCart = async () => {
  await getCartItems()
}

onMounted(fetchAPI)
</script>
