<template>
  <Header />
  <main>
    <div class="container-xl">
      <RouterView />
    </div>
    <!-- modal background -->
    <div v-if="isShowModal" @click="setModalBackground(false)" class="modal-main"></div>
  </main>
  <Footer />
</template>

<script setup>
import { provide, ref } from "vue";
import "vue-toast-notification/dist/theme-sugar.css";
// Component
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

// get user
const user = JSON.parse(localStorage.getItem("wdsmart_user"));

// Variable dropdrow header top
let listDropDownHeader = ref({
  ddownSearch: false,
  ddownStoreAddress: false,
  ddownLogin: false,
  ddownCart: false,
});

// modal account user
const listModalAccount = ref({
  modalAddAddress: false,
  modalDelAddress: false,
});

// Show background-modal
let isShowModal = ref(false);

// Handle show / hide modal
function setModalBackground(value) {
  isShowModal.value = value;
  if (value === false) {
    // Hide modal background
    isShowModal.value = false;
    // Hide all dropdrown header
    listDropDownHeader.value.ddownSearch = false;
    listDropDownHeader.value.ddownStoreAddress = false;
    listDropDownHeader.value.ddownLogin = false;
    listDropDownHeader.value.ddownCart = false;
    // Hide all modal account
    listModalAccount.value.modalAddAddress = false;
    listModalAccount.value.modalDelAddress = false;
  }
}

// Refresh cart
const refreshCartStatus = ref(false);

const setRefreshCart = (value) => {
  refreshCartStatus.value = value;
};

// Provide to component child
provide("user", user);
provide("setModalBackground", setModalBackground);
provide("listDropDownHeader", listDropDownHeader);
provide("refreshCartStatus", refreshCartStatus);
provide("setRefreshCart", setRefreshCart);
provide("listModalAccount", listModalAccount);
</script>
