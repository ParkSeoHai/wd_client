<template>
    <div class="bg-color-white">
        <div class="product-property-tab">
            <div class="product-property-tab__title">
                Thông số kĩ thuật
            </div>

            <div class="product-property-tab__content" :class="showViewAll ? 'show' : ''">
                <table class="table table-striped product-property-tab__table fs-4">
                    <tbody>
                        <tr v-for="property in props.productSpectifications" :key="property.id">
                            <td>{{ property.name }}</td>
                            <td>{{ property.value }}</td>
                        </tr>
                    </tbody>
                </table>
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

let showViewAll = ref(false);

const props = defineProps(['productSpectifications']);
</script>