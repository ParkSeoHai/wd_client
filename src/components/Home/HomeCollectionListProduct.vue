<script setup>
import { inject, onMounted, ref } from "vue";
import axios from "axios";
// Component
import ProductItem from "../ProductItem.vue";
import { getProductsByCategory } from "@/service/ProductService";

const urlApi = inject("url_api");

// Props from index.vue
const { categoryName, categoryUrl } = defineProps(["categoryName", "categoryUrl"]);

// List product
const products = ref([]);
// Categories
const categories = ref([]);

// Func get subcategories by category url
const getSubCategories = async () => {
  const url = `${urlApi}/api/v1/category/sub/${categoryUrl}`;
  const response = await axios.get(url);
  return response.data.metadata;
};

// Call function when component is mounted
onMounted(async () => {
  const res = await getProductsByCategory({ categoryUrl, urlApi });
  products.value = res.metadata.products;
  categories.value = await getSubCategories();
});
</script>

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
                {{ categoryName }}
              </h2>
              <ul class="menu-col d-flex">
                <!-- Item link -->
                <li v-for="category in categories" :key="category._id" class="menu-item">
                  <router-link :to="`/danh-muc/${category.category_url}`">
                    {{ category.category_name }}
                  </router-link>
                </li>
              </ul>
            </div>
            <!-- Body -->
            <div class="block-collection-group product-primary list-product">
              <!-- Item -->
              <ProductItem
                v-for="product in products"
                :key="product._id"
                :product="product"
              />
            </div>
            <!-- Bottom -->
            <div class="collection-bottom">
              <div class="link">
                <router-link :to="`/danh-muc/${categoryUrl}`">
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
