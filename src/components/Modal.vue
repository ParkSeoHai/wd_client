<template>
  <div @click="handleClickModal()" class="modal-main"></div>
</template>

<script setup>
import { nextTick } from "vue";

const emit = defineEmits([["setModal"]]);

function handleClickModal() {
  nextTick(() => {
    // hide all dropdown header
    const headerDropdownElements = document.querySelectorAll(
      ".header-top .item-dropdown .header-action_dropdown"
    );

    if (headerDropdownElements.length > 0) {
      for (const element of headerDropdownElements) {
        element.style.display = "none";
      }
    }
    emit("setModal", false);
  });
}
</script>
