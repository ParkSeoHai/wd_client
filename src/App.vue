<template>
  <Header @handle-modal="handleModal" />
  <main>
    <div class="container p-0">
      <RouterView @update-cart="updateCart" :cartItems="cartItems" />
    </div>
    <Modal v-if="isShowModal" @set-modal="handleModal" />
  </main>
  <Footer />
</template>

<script setup>
import { provide, ref } from "vue";
// Component
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";
import Modal from "./components/Modal.vue";

provide("handleModal", handleModal);

// Show background-modal
let isShowModal = ref(false);

// Handle show / hide modal
function handleModal(value) {
  isShowModal.value = value;
}

// Get value cart object
const cartItems = ref([]);

// Call api get cart
// const fetchAPI = async () => {
//   await getCartItems();
//   // Import component Header
//   Header.value = defineAsyncComponent(() => import("./components/Header.vue"));
// };

// Get cart items
// const getCartItems = async () => {
//   if (!localStorage.getItem("wdsmartcartid")) {
//     return;
//   }
//   const urlGetCart = `${$route}/Customer/GetCartById?id=${localStorage.getItem(
//     "wdsmartcartid"
//   )}`;
//   const responseGetCart = await fetchApi(urlGetCart);
//   cartItems.value = responseGetCart.data.cartItems;
// };

// Refresh cart
// const updateCart = async () => {
//   await getCartItems();
// };
</script>
