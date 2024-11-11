<template>
  <Header />
  <main>
    <div class="container p-0">
      <RouterView />
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

const refreshCartStatus = ref(false);

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

// Refresh cart
const setRefreshCartHeader = (value) => {
  refreshCartStatus.value = value;
};

// Provide to component child
provide("setModalBackground", setModalBackground);
provide("listDropDownHeader", listDropDownHeader);
provide("refreshCartStatus", refreshCartStatus);
provide("setRefreshCartHeader", setRefreshCartHeader);
</script>

<style>
.v-toast {
  top: 10%;
}
</style>
