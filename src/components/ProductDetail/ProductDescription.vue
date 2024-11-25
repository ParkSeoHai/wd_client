<template>
  <div class="bg-color-white">
    <div class="product-desc-tab">
      <div class="product-desc-tab__title">Mô tả sản phẩm</div>

      <div
        ref="contentElement"
        class="product-desc-tab__content"
        :class="showViewAll ? 'show' : ''"
        v-html="description"
      ></div>

      <div v-show="showViewAllBtn" class="view-all-tab">
        <button class="view-all-tab__btn" @click.prevent="showViewAll = !showViewAll">
          <i
            class="bi view-all-tab__btn--icon"
            :class="showViewAll ? 'bi-dash-circle' : 'bi-plus-circle'"
          ></i>
          {{ showViewAll ? "Rút gọn" : "Xem thêm" }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useElementSize } from "@vueuse/core";
import { computed, ref } from "vue";
const { description } = defineProps(["description"]);

const contentElement = ref(null);
const { height } = useElementSize(contentElement);

const showViewAll = ref(false);

let showViewAllBtn = computed(() => {
  if (height.value >= 400) return true;
  return false;
});
</script>
