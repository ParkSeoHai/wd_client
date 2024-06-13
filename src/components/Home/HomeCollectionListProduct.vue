<template>
    <!-- Section Product group 1 -->
    <section class="section_collection_group">
        <div class="container p-0">
            <div class="row">
                <!-- Sản phẩm group 1 -->
                <div class="col-12">
                    <div class="bg-color-white">
                        <!-- Top -->
                        <div class="top-head d-flex justify-content-between align-items-center">
                            <h2>
                                {{ props.category }}
                                <span v-if="categoryActive !== ''">/ {{ categoryActive }}</span>
                            </h2>
                            <ul class="menu-col d-flex">
                                <!-- Item link -->
                                <li
                                    v-for="category in categories"
                                    :key="category.id"
                                    class="menu-item"
                                    :class="category.textUrl == categoryActive ? 'active' : ''"
                                    @click="changeProducts(category)"
                                >
                                    {{ category.name }}
                                </li>
                            </ul>
                        </div>
                        <!-- Body -->
                        <div class="block-collection-group product-primary list-product">
                            <!-- Item -->
                            <ProductItem
                                v-for="product in products"
                                :key="product.id"
                                :productObj="product"
                            />
                        </div>
                        <!-- Bottom -->
                        <div class="collection-bottom">
                            <div class="link">
                                <router-link
                                    :to="categoryActive === '' ? `/danh-muc/${props.textUrl}` : `/danh-muc/${categoryActive}`"
                                >
                                    <span>Xem tất cả</span>
                                    <i class="bi bi-chevron-double-right"></i>
                                </router-link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script setup>
import { inject, onMounted, ref } from 'vue';
// Component
import ProductItem from '../ProductItem.vue';
// Service
import { getCategoriesLevel2 } from '@/api/CategoryService';
import { getProductsByCategory } from '@/api/ProductService';

const $route = inject('$route');

// Props
const props = defineProps(['category', 'textUrl']);
const categoryActive = ref('');

// List product
const products = ref([]);
// Categories
const categories = ref([]);

// Async function to fetch data
const fetchData = async () => {
  try {
    // Asign value
    products.value = await getProductsByCategory($route, props.category, 10);
    categories.value = await getCategoriesLevel2($route, props.category);
  } catch (error) {
    console.error(error.message);
  }
};

// Change product when click category item in HomeCollectionListProduct.vue
async function changeProducts(category) {
    categoryActive.value = category.textUrl;
    products.value = await getProductsByCategory($route, category.name, 10);
}

// Call function when component is mounted
onMounted(fetchData);

</script>