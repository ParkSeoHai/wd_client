<script setup>
import { inject, ref, watch } from "vue";
// Component
import ProductItem from "@/components/ProductItem.vue";
import Sort from "@/components/ProductCategory/Sort.vue";
import { searchProduct } from "@/service/ProductService";

const urlApi = inject("url_api");
const setModalBackground = inject("setModalBackground");

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

watch(
  () => searchStr,
  async () => {
    products.value = await getDataProduct();
  }
);

// get product
const getDataProduct = async (page = 1, limit = 20, sort) => {
  const res = await searchProduct({ searchStr, page, limit, sort, urlApi });
  setModalBackground(false);
  return res.metadata;
};

// Handle when click sort product by price
const sortProductByPrice = async (value) => {
  let sort = "";
  if (value === 1) sort = "desc";
  else if (value === 2) sort = "asc";
  products.value = await getDataProduct(page.value, limit.value, sort);
};

products.value = await getDataProduct();
</script>

<template>
  <template v-if="products.length > 0">
    <!-- Sort -->
    <sort @sort-product="sortProductByPrice" />
    <!-- list product -->
    <div class="row">
      <div class="col-xl-9">
        <div class="product--search__list list-product">
          <!-- Item -->
          <product-item
            v-for="product in products"
            :key="product._id"
            :product="product"
          />
        </div>
        <!-- Bottom -->
        <div v-show="totalProduct - products.length > 0" class="product-search-bottom">
          <button class="btn product-search-bottom__btn" @click.prevent="page += 1">
            Xem thêm {{ totalProduct - products.length }} sản phẩm
          </button>
        </div>
      </div>
      <!-- News -->
      <div class="col-xl-3">
        <div class="new-block bg-white">
          <h3 class="new-block__title">
            <span class="new-block__title--icon"><i class="bi bi-newspaper"></i></span>
            Bài viết liên quan
          </h3>
          <div class="new-block__list">
            <a href="#" class="new-block__item">
              <img
                src="https://cdn-media.sforum.vn/storage/app/media/phuonganh/pubg-mobile-3-5.jpg"
                class="new-block__item--img"
              />
              <h2 class="new-block__item--title">
                PUBG Mobile ra mắt phiên bản 3.5, đưa game thủ đến với sa
              </h2>
            </a>
            <a href="#" class="new-block__item">
              <img
                src="https://cdn-media.sforum.vn/storage/app/media/trannghia/Apple-Final-Cut-11cap-nhat.jpg"
                class="new-block__item--img"
              />
              <h2 class="new-block__item--title">
                Apple phát hành Final Cut Pro 11 cho Mac với nhiều tính năng mới với nhiều
                tính năng mới
              </h2>
            </a>
          </div>
          <div class="new-block__bottom">
            <button class="new-block__btn--more">Xem tất cả</button>
          </div>
        </div>
      </div>
    </div>
  </template>
  <template v-else>KHONG CO SAN PHAM</template>
</template>
