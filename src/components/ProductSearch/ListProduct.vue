<script setup>
import { inject, ref } from "vue";
// Component
import ProductItem from "@/components/ProductItem.vue";
import Sort from "@/components/ProductCategory/Sort.vue";
import { searchProduct } from "@/service/ProductService";

const urlApi = inject("url_api");

const { searchStr } = defineProps(["searchStr"]);
const emit = defineEmits(["setBreadcrumb"]);
// set breadscrumb
emit("setBreadcrumb", {
  breadcrumbActive: `Kết quả tìm kiếm cho: ${searchStr}`,
});

const products = ref([]);
const totalProduct = ref(0);
const page = ref(1);
const limit = ref(20);

// get product
const res = await searchProduct({
  searchStr,
  page: page.value,
  limit: limit.value,
  urlApi,
});

// Handle when click sort product by price
const sortProductByPrice = async (value) => {
  let sort = "";
  if (value === 1) sort = "desc";
  if (value === 2) sort = "asc";
  const res = await searchProduct({
    searchStr,
    page: page.value,
    limit: limit.value,
    urlApi,
    sort,
  });
  products.value = res.metadata;
};

products.value = res.metadata;
</script>

<template>
  <div class="filter-sort-block">
    <template v-if="products.length > 0">
      <!-- Sort -->
      <sort @sort-product="sortProductByPrice" />
      <!-- Filter block product -->
      <div class="filter-sort-block__product">
        <div class="filter-sort__list--product list-product">
          <!-- Item -->
          <product-item
            v-for="product in products"
            :key="product._id"
            :product="product"
          />
        </div>
        <!-- Bottom -->
        <div v-show="totalProduct - products.length > 0" class="filter-sort-bottom">
          <button class="btn filter-sort-bottom__btn" @click.prevent="page += 1">
            Xem thêm {{ totalProduct - products.length }} sản phẩm
          </button>
        </div>
      </div>
    </template>
    <template v-else>KHONG CO SAN PHAM</template>
  </div>
</template>
