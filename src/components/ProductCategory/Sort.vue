<template>
  <div class="filter-sort-block__row">
    <div class="filter-sort__title">Sắp xếp theo</div>
    <div class="filter-sort__list-filter">
      <button
        class="btn filter-sort__btn"
        v-for="(item, index) in listSorts"
        :key="index"
        :class="sortActive == index + 1 ? 'active' : ''"
        @click.prevent="clickBtnSort(index)"
      >
        <i :class="item.icon"></i>
        <span>{{ item.text }}</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref } from "vue";
const emit = defineEmits(["sort-product"]);
// Data sort
const listSorts = [
  {
    icon: "bi bi-sort-down filter-sort__btn--icon",
    text: "Giá Cao - Thấp",
  },
  {
    icon: "bi bi-sort-down-alt filter-sort__btn--icon",
    text: "Giá Thấp - Cao",
  },
];
// Active sort
const sortActive = ref(0);
// Handle event click button sort
const clickBtnSort = (value) => {
  sortActive.value = value + 1;
  emit("sort-product", value + 1);
};
</script>
