<template>
    <!-- Breadcrumb -->
    <Breadcrumb
        :breadcrumbActive="breadcrumbActive"
    />
    <!-- Content -->
    <div class="filter-sort-block">
        <!-- Sort -->
        <Sort
            :productLength="productLength"
            @sort-product="sortProductByPrice"
        />
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
import { defineAsyncComponent, inject, onMounted, ref, watch } from 'vue';
import { getProductsByCategory } from '@/api/ProductService';
import { getCategoryByTextUrl } from '@/api/CategoryService';
import ProductItem from '@/components/ProductItem.vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
// Component
const Sort = ref();
// Inject global variable from main.js
const $route = inject('$route');
// Props category url from params route
const props = defineProps(['categoryUrl']);

// Get category from categoryUrl
const category = ref();

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
const breadcrumbActive = ref();
// Fetch async api
const fetchData = async () => {
    try {
        // Get category data
        category.value = await getCategoryByTextUrl($route, props.categoryUrl);
        breadcrumbActive.value = category.value.name;

        // Get products data
        products.value = await getProductsByCategory($route, category.value.name, 20);
        productLength.value = products.value.length;

        if(productLength.value > 0) {
            // Async components
            Sort.value = defineAsyncComponent(() =>
                import('@/components/ProductFilter/Sort.vue')
            );
            // Show 20 item
            quantityDisplay.value = productLength.value < 20 ? productLength.value : 20;
            getProductDisplay(quantityDisplay.value);
        }
    } catch(error) {
        console.error(error);
    }
}

// Handle when click sort product by price
const sortProductByPrice = (value) => {
    products.value.sort(function (a, b) {
        if(value == 1) {    // Sort price from high to low
            return b.priceSale - a.priceSale;
        } else if(value == 2) {     // Sort price from low to high
            return a.priceSale - b.priceSale;
        }
    });
    productsDisplay.value = [];
    productsDisplay.value = products.value;
}

onMounted(fetchData);
</script>