<template>
  <Header @handle-modal="handleModal" />
  <main>
    <div class="container p-0">
      <RouterView />
    </div>
    <Modal v-if="isShowModal" />
  </main>
  <Footer />
</template>

<script setup>
import { ref } from 'vue';
// Component
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Modal from './components/Modal.vue';

let isShowModal = ref(false);

// Hanlel show / hide modal
function handleModal(value) {
  isShowModal.value = value;
}

</script>