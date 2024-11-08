<template>
  <Header />
  <main>
    <div class="container p-0">
      <RouterView @update-cart="updateCart" :cartItems="cartItems" />
    </div>
    <!-- modal background -->
    <div v-if="isShowModal" @click="handleClickModalBackground" class="modal-main"></div>
  </main>
  <Footer />
</template>

<script setup>
import { provide, ref } from "vue";
// Component
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// Variable dropdrow header top
let listDropDownHeader = ref({
  ddownStoreAddress: false,
  ddownLogin: false,
  ddownCart: false,
});

// Show background-modal
let isShowModal = ref(false);

// Handle show / hide modal
function setModalBackground(value) {
  isShowModal.value = value;
}

function handleClickModalBackground() {
  // Hide modal background
  isShowModal.value = false;
  // Hide all dropdrown header
  listDropDownHeader.value.ddownStoreAddress = false;
  listDropDownHeader.value.ddownLogin = false;
  listDropDownHeader.value.ddownCart = false;
}

// Provide to component child
provide("setModalBackground", setModalBackground);
provide("listDropDownHeader", listDropDownHeader);

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
