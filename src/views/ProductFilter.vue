<template>
    <!-- Breadcrumb -->
    <Breadcrumb
        :breadcrumbActive="breadcrumbActive"
    />
    <!-- Content -->
    <div class="filter-sort-block">
        <!-- Sort -->
        <div class="filter-sort-block__row">
            <div class="filter-sort__title">Sắp xếp theo</div>
            <div class="filter-sort__list-filter">
                <button class="btn filter-sort__btn">
                    <i class="bi bi-sort-down filter-sort__btn--icon"></i>
                    <span>Giá Cao - Thấp</span>
                </button>
                <button class="btn filter-sort__btn">
                    <i class="bi bi-sort-down-alt filter-sort__btn--icon"></i>
                    <span>Giá Thấp - Cao</span>
                </button>
            </div>
        </div>
        <!-- Filter block product -->
        <div class="filter-sort-block__product">
            <div class="filter-sort__list--product list-product">
                <!-- Item -->
                <ProductItem
                    v-for="product in productsDisplay"
                    :key="product.id"
                    :productObj="product"
                />
            </div>
            <!-- Bottom -->
            <div class="filter-sort-bottom" v-show="productLength - quantityDisplay > 0">
                <button
                    class="btn filter-sort-bottom__btn"
                    @click.prevent="showMoreProductDisplay(quantityDisplay)"
                >
                    Xem thêm {{ productLength - quantityDisplay }} sản phẩm
                </button>
            </div>
        </div>
    </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from 'vue';
import { getProductsByCategory } from '@/api/ProductService';
import ProductItem from '@/components/ProductItem.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
// Inject global variable from main.js
const $route = inject('$route');
// Props name from params route
const props = defineProps(['name']);
const products = ref();
const productLength = ref(0);
// Get product display
const productsDisplay = ref([]);
const quantityDisplay = ref(0);
// Handle get data
const getProductDisplay = (quantity) => {
    for(let i = 0; i < quantity; ++i) {
        productsDisplay.value.push(products.value[i]);
    }
}
// Handle when click btn show more product
const showMoreProductDisplay = (quantity) => {
    if(productLength.value - quantityDisplay.value <= quantity) {
        quantityDisplay.value = productLength.value;
    } else {
        quantityDisplay.value += quantity;
    }
}
// Watching change quantity display
watch(quantityDisplay, () => {
    productsDisplay.value = [];
    getProductDisplay(quantityDisplay.value);
});
// Breadcrumb
const breadcrumbActive = props.name;
// Fetch async api
const fetchData = async () => {
    // Get products data
    products.value = await getProductsByCategory($route, props.name, 20);
    productLength.value = products.value.length;
    // Show 20 item
    quantityDisplay.value = productLength.value < 20 ? productLength.value : 20;
    getProductDisplay(quantityDisplay.value);
}

onMounted(fetchData);
</script>