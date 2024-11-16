<script setup>
import { inject, ref, watch } from "vue";
// Component
import ProductItem from "@/components/ProductItem.vue";
import Sort from "@/components/ProductCategory/Sort.vue";
import { getProductsByCategory } from "@/service/ProductService";

const urlApi = inject("url_api");

const { categoryUrl } = defineProps(["categoryUrl"]);
const emit = defineEmits(["setBreadcrumb"]);

const products = ref([]);
const totalProduct = ref(0);
const page = ref(1);
const limit = ref(20);

watch(
  () => categoryUrl,
  async () => {
    products.value = await getDataProduct({ page: page.value, limit: limit.value });
  }
);

watch(page, async () => {
  const productsMore = await getDataProduct({ page: page.value, limit: limit.value });
  products.value.push(...productsMore);
});

const setBreadcrumb = (breadCrumbs) => {
  breadCrumbs.forEach((item) => {
    item.category_url = `danh-muc/${item.category_url}`;
  });
  emit("setBreadcrumb", {
    breadCrumbs: breadCrumbs.slice(0, breadCrumbs.length - 1),
    breadcrumbActive: breadCrumbs[breadCrumbs.length - 1].category_name,
  });
};

const getDataProduct = async ({ page, limit, sort }) => {
  const res = await getProductsByCategory({ categoryUrl, page, limit, sort, urlApi });
  setBreadcrumb(res.metadata.breadCrumbs);
  totalProduct.value = res.options.totalSize;
  return res.metadata.products;
};

// Handle when click sort product by price
const sortProductByPrice = async (value) => {
  let sort = "";
  if (value === 1) sort = "desc";
  if (value === 2) sort = "asc";
  products.value = await getDataProduct({ page: page.value, limit: limit.value, sort });
};

// await get products
products.value = await getDataProduct({ page: page.value, limit: limit.value });
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
