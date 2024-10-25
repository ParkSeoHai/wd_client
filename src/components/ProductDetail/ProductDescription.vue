<template>
    <div class="bg-color-white">
        <div class="product-desc-tab">
            <div class="product-desc-tab__title">
                Mô tả sản phẩm
            </div>

            <div class="product-desc-tab__content" :class="showViewAll ? 'show' : ''" v-html="props.description">
            </div>

            <div class="view-all-tab">
                <button class="view-all-tab__btn" @click.prevent="showViewAll = !showViewAll">
                    <i class="bi view-all-tab__btn--icon"
                        :class="showViewAll ? 'bi-dash-circle' : 'bi-plus-circle'"></i>
                    {{ showViewAll ? 'Rút gọn' : 'Xem thêm' }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from "vue";
const props = defineProps(['description']);

let showViewAll = ref(false);
</script>