<template>
    <!-- Breadcrumb -->
    <Breadcrumb
        :breadcrumbs="breadcrumbs"
        :breadcrumbActive="breadcrumbActive"
    />
    <!-- Product detail info -->
    <div id="product-template" class="product-page">
        <!-- Section product detail -->
        <ProductDetailInfo
            :product="product"
        />
    </div>
</template>

<script setup>
import { defineAsyncComponent, inject, onMounted, ref } from 'vue';
const Breadcrumb = ref();
const ProductDetailInfo = ref();
// Service
import { getProductByName } from '@/api/ProductService';

// Props from route
const props = defineProps(['name']);

const $route = inject('$route');
const product = ref();

let breadcrumbs = [], breadcrumbActive;
// Fetch data from server
const fetchData = async () => {
    try {
        product.value = await getProductByName($route, props.name);
        // Asycn component
        ProductDetailInfo.value = defineAsyncComponent(() =>
            import('@/components/ProductDetail/ProductDetailInfo.vue')
        );
        // Handle breadcrumbs
        product.value.categories.map(item => {
            breadcrumbs.push({
                linkText: item.name,
                linkUrl: item.name
            });
        });
        breadcrumbActive = product.value.name;
        Breadcrumb.value = defineAsyncComponent(() =>
            import('@/components/Breadcrumb.vue')
        );
    } catch(error) {
        console.error(error);
    }
}
onMounted(fetchData);
</script>