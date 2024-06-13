<template>
  <!-- Header -->
  <header class="header">
    <!-- Header top -->
    <HeaderTop @handle-modal="handleModal" @update-cart="updateCart" :cartItems="props.cartItems" />
    <!-- Header bottom -->
    <HeaderBottom />
  </header>
</template>

<script setup>
// Component
import HeaderTop from './HeaderTop.vue'
import HeaderBottom from './HeaderBottom.vue'

const $emits = defineEmits(['handle-modal', 'update-cart'])
// Props from App.vue
const props = defineProps(['cartItems'])

// Handle emit event to App.vue
function handleModal(value) {
  $emits('handle-modal', value)
}

// Handle emit event to App.vue
function updateCart() {
  $emits('update-cart')
}
</script>
