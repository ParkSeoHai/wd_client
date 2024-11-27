<script setup>
import { useElementSize } from "@vueuse/core";
import { Swiper, SwiperSlide } from "swiper/vue";
import { computed, inject, onMounted, ref, watch } from "vue";
import { formatter, calcProductPriceSale } from "@/service/Common.js";
import { useToast } from "vue-toast-notification";
import axios from "axios";
import { addItem } from "@/service/CartService";
import ProductDescription from "./ProductDescription.vue";
import ProductSpecifications from "./ProductSpecifications.vue";
import ProductRating from "./ProductRating.vue";

const $toast = useToast();

const urlApi = inject("url_api");
const user = inject("user");

// inject from App.vue
const setRefreshCart = inject("setRefreshCart");

const emit = defineEmits([["setBreadcrumb"]]);
// Props
const { productUrl } = defineProps(["productUrl"]);
const favoriteItemExist = ref(false);

// Func get product by url
const getProductByUrl = async () => {
  const url = `${urlApi}/api/v1/product/${productUrl}`;
  const res = await axios.get(url);
  return res.data.metadata;
};

// if user was login then check product in favorite
const checkProductInFavorite = async () => {
  if (user) {
    const res = await axios.post(`${urlApi}/api/v1/customer/favorite/checkItem`, {
      userId: user._id,
      productId: product.value._id,
    });
    return res.data;
  }
  return false;
};

const toggleServiceProductFavorite = async (urlApi) => {
  // call api
  try {
    const response = await axios.post(urlApi, {
      userId: user._id,
      productId: product.value._id,
    });
    $toast.success(response.data.message, {
      position: "top",
    });
    return response.data;
  } catch (error) {
    // Kiểm tra lỗi và xử lý phù hợp
    if (error.response) {
      // Lỗi từ server
      $toast.error(error.response.data.message || "Lỗi từ server", {
        position: "top",
      });
      throw new Error(error.response.data.message || "Lỗi từ server");
    } else if (error.request) {
      // Không nhận được phản hồi
      $toast.error("Không có phản hồi từ server. Vui lòng thử lại.", {
        position: "top",
      });
      throw new Error("Không có phản hồi từ server. Vui lòng thử lại.");
    } else {
      // Lỗi khác
      $toast.error("Đã xảy ra lỗi. Vui lòng thử lại.", {
        position: "top",
      });
      throw new Error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }
};

// handle toggle product to favorite
const toggleProductFavorite = async () => {
  // check user
  if (!user) {
    $toast.info("Vui lòng đăng nhập", {
      position: "top",
    });
    return;
  }
  if (favoriteItemExist.value) {
    // remove
    const res = await toggleServiceProductFavorite(
      `${urlApi}/api/v1/customer/favorite/removeItem`
    );
    if (res.status === 200) favoriteItemExist.value = false;
  } else {
    // add
    const res = await toggleServiceProductFavorite(
      `${urlApi}/api/v1/customer/favorite/addItem`
    );
    if (res.status === 201) favoriteItemExist.value = true;
  }
};

let data = await getProductByUrl();
const product = ref(data.product);

watch(
  () => productUrl,
  async () => {
    data = await getProductByUrl();
    product.value = data.product;
    setBreadcrumb();
  }
);

// emit parent
function setBreadcrumb() {
  data.breadCrumbs.forEach((item) => {
    item.category_url = `danh-muc/${item.category_url}`;
  });
  emit("setBreadcrumb", {
    breadCrumbs: data.breadCrumbs,
    breadcrumbActive: product.value.product_name,
  });
}
setBreadcrumb();

// Count add to cart
let count = ref(1);
// Option
const activeOptionParent = ref(0);
const activeOptionChild = ref(0);

// Option parent active
const optionParent = computed(() => {
  return product.value.options
    ? product.value.options.option_values[activeOptionParent.value]
    : null;
});

// Option child active
const optionChild = computed(() => {
  return optionParent.value.sub_options?.option_values.length > 0
    ? optionParent.value.sub_options?.option_values[activeOptionChild.value]
    : null;
});

watch(activeOptionParent, () => {
  activeOptionChild.value = 0;
  productPrice.value = setPrice();
  count.value = 1;
  shops_available.value = setShopAvailable();
});

watch(activeOptionChild, () => {
  productPrice.value = setPrice();
  count.value = 1;
  shops_available.value = setShopAvailable();
});

// Handle show dropdown location store
let showDropdownLocationStore = ref(false);

const shops_available = ref(setShopAvailable());

function setShopAvailable() {
  let shops = optionParent.value.shops_available;
  if (optionChild.value) {
    shops = optionChild.value.shops_available;
  }
  return shops;
}

// Watch handle count add cart
watch(count, () => {
  let quantity = optionParent.value.stock;
  if (optionChild.value) quantity = optionChild.value.stock;

  // If it not a number
  if (isNaN(count.value)) {
    count.value = 1;
  } else if (count.value < 1) {
    count.value = 1;
  } else if (count.value > quantity) {
    $toast.default("Số lượng sản phẩm không đủ", { position: "top" });
    count.value = quantity;
  }
});

// handle swiper main product
let swiperProduct = null;

const onSwiper = (swiper) => {
  swiperProduct = swiper;
};

const onSlideChange = () => {
  activeThumb.value = swiperProduct.realIndex;
};

// handle swiper thumb product
const swiperProductThumbRef = ref(null);
const activeThumb = ref(0);

// Tính số slide thumbs
const { width } = useElementSize(swiperProductThumbRef);
const slidePerView = ref(0);
watch(width, () => {
  slidePerView.value = Math.round(width.value / 60);
});

const onThumbnailClick = (index) => {
  activeThumb.value = index;
  swiperProduct.slideTo(index);
};

const handleArrowThumb = (value) => {
  activeThumb.value += value;
  if (activeThumb.value < 0) activeThumb.value = 0;
  if (activeThumb.value > product.value.images.length - 1)
    activeThumb.value = product.value.images.length - 1;
  swiperProduct.slideTo(activeThumb.value);
};

// Handle price product
const productPriceSale = ref(0);
const productPrice = ref(setPrice());

function setPrice() {
  // Get price
  const priceOptionParent =
    product.value.product_price + optionParent.value.price_adjustment;
  let priceTotal = priceOptionParent;

  if (optionChild.value) {
    const priceOptionChild =
      product.value.product_price + optionChild.value.price_adjustment;
    priceTotal =
      priceOptionChild > priceOptionParent ? priceOptionChild : priceOptionParent;
  }

  productPriceSale.value = calcProductPriceSale({
    price: priceTotal,
    discount: product.value.product_discount,
  });

  return priceTotal;
}

// Handle add product to cart
async function addCart() {
  let user = JSON.parse(localStorage.getItem("wdsmart_user"));
  if (!user) {
    $toast.default("Vui lòng đăng nhập", { position: "top" });
    return;
  }

  // get image thumb
  let productThumb = "";
  for (let image of product.value.images) {
    if (image.type === "thumbnail") {
      productThumb = image.image_url;
      break;
    }
  }

  // get option
  let option = {};
  if (optionParent.value) {
    const { _id, value } = optionParent.value;
    option = { option_id: _id, option_value: value };
    option.option_name = product.value.options.option_name;
    // get sub option
    if (optionChild.value) {
      const { _id, value } = optionChild.value;
      option.sub_option = { option_id: _id, option_value: value };
      option.sub_option.option_name = optionParent.value.sub_options.option_name;
    }
  }

  const cartItem = {
    product_id: product.value._id,
    product_name: product.value.product_name,
    product_thumb: productThumb,
    product_url: product.value.product_url,
    price_at_added: productPriceSale.value,
    discount_at_added: product.value.product_discount,
    option,
    quantity: count.value,
  };

  // call service add item to cart
  try {
    const res = await addItem({
      userId: user._id,
      cartItem,
      urlApi: `${urlApi}/api/v1/cart`,
    });
    if (res.status === 201) {
      $toast.success(res.message, {
        position: "top",
      });
      // refresh cart header
      setRefreshCart(true);
    }
  } catch (error) {
    $toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
      position: "top",
    });
  }
}

onMounted(async () => {
  favoriteItemExist.value = await checkProductInFavorite();
});
</script>

<template>
  <!-- Detail -->
  <div class="row">
    <div class="col-12 product-info-detail">
      <div class="bg-color-white">
        <div class="row">
          <!-- Left -->
          <div class="col-8">
            <div class="product-swiper">
              <!-- Swiper active -->
              <swiper
                @swiper="onSwiper"
                @slideChange="onSlideChange"
                :spaceBetween="10"
                :slidesPerView="1"
                class="product-swiper__main"
              >
                <div class="product-swiper__main--heart" @click="toggleProductFavorite">
                  <button>
                    <span
                      ><i
                        :class="favoriteItemExist ? 'bi bi-heart-fill' : 'bi bi-heart'"
                      ></i
                    ></span>
                  </button>
                </div>
                <!-- prev -->
                <button
                  v-show="activeThumb > 0"
                  class="product-swiper__main--btn prev"
                  @click.prevent="handleArrowThumb(-1)"
                >
                  <i class="bi bi-chevron-left"></i>
                </button>
                <swiper-slide v-for="(image, index) in product.images" :key="index">
                  <img :src="image.image_url" :alt="image.alt_text" />
                </swiper-slide>
                <!-- next -->
                <button
                  v-show="activeThumb < product.images.length - 1"
                  class="product-swiper__main--btn next"
                  @click.prevent="handleArrowThumb(1)"
                >
                  <i class="bi bi-chevron-right"></i>
                </button>
              </swiper>
              <!-- Swiper Thumbnail -->
              <swiper
                ref="swiperProductThumbRef"
                :spaceBetween="10"
                :slidesPerView="slidePerView"
                class="product-swiper__thumb"
              >
                <swiper-slide
                  v-for="(image, index) in product.images"
                  :key="index"
                  @click="onThumbnailClick(index)"
                  :class="{ active: activeThumb === index }"
                >
                  <img :src="image.image_url" :alt="image.alt_text" />
                </swiper-slide>
              </swiper>
            </div>
          </div>
          <!-- Right -->
          <div class="col-4">
            <div class="product-content-info">
              <!-- Title -->
              <div class="title">
                <h1>
                  <span class="text">{{ product.product_name }} </span>
                  <span
                    class="subtext"
                    :class="[product.product_quantity > 0 ? 'green' : 'red']"
                  >
                    {{ product.product_quantity > 0 ? "Còn hàng" : "Hết hàng" }}
                  </span>
                </h1>
              </div>
              <!-- Brand -->
              <div class="product-info d-flex">
                <div class="pro-brand">
                  <span>
                    Thương hiệu:
                    <a :href="product.brand_name">{{ product.brand_name }}</a>
                  </span>
                </div>
                <span class="line-info"></span>
                <div class="pro-type">
                  <span>
                    Loại:
                    <a :href="product.brand_name">{{ product.brand_name }}</a>
                  </span>
                </div>
              </div>
              <!-- Price -->
              <div class="product-price">
                <span class="price-now">{{ formatter(productPriceSale) }}</span>
                <span class="price-compare">
                  <del>{{ formatter(productPrice) }}</del>
                </span>
              </div>
              <!-- Option parent -->
              <div class="select-wrap">
                <div class="header">
                  <div class="pro-color">
                    <span
                      >{{ product.options.option_name }}:
                      <b class="fw-bold">{{ optionParent.value }}</b>
                    </span>
                  </div>
                </div>
                <div class="select-list py-3">
                  <div
                    v-for="(option, index) in product.options.option_values"
                    :key="index"
                    class="item"
                    :class="[
                      index === activeOptionParent && option.stock > 0 ? 'active' : '',
                      option.stock > 0 ? '' : 'disabled',
                    ]"
                    @click.prevent="activeOptionParent = index"
                  >
                    <img :src="option.image" :alt="product.name" />
                    <div>
                      <p>{{ option.value }}</p>
                      <p class="mt-2">
                        {{ formatter(product.product_price + option.price_adjustment) }}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <!-- Option childrent -->
              <div v-if="optionChild" class="select-wrap">
                <div class="header">
                  <div class="pro-color">
                    <span
                      >{{ optionParent.sub_options.option_name }}:
                      <b class="fw-bold">{{ optionChild.value }}</b>
                    </span>
                  </div>
                </div>
                <div class="select-list py-3">
                  <div
                    class="item d-block"
                    v-for="(option, index) in optionParent.sub_options.option_values"
                    :key="index"
                    :class="[
                      index === activeOptionChild ? 'active' : '',
                      option.stock > 0 ? '' : 'disabled',
                    ]"
                    @click="activeOptionChild = index"
                  >
                    <p class="text-center">{{ option.value }}</p>
                    <p class="text-center mt-2">
                      {{ formatter(product.product_price + option.price_adjustment) }}
                    </p>
                  </div>
                </div>
              </div>
              <!-- Quantity add cart -->
              <div class="selector-actions">
                <div
                  class="quantity-area d-flex align-items-center justify-content-between"
                >
                  <button type="button" @click.prevent="count--">-</button>
                  <input type="text" min="1" max="999" v-model="count" />
                  <button type="button" @click.prevent="count++">+</button>
                </div>
              </div>
              <!-- Button add cart -->
              <div class="wrap-addcart pt-3">
                <button
                  class="btn btn-primary w-100"
                  :class="product.product_quantity > 0 ? '' : 'disabled'"
                  @click.prevent="addCart"
                >
                  <span class="fw-bold">THÊM VÀO GIỎ</span>
                  <span class="d-block">Giao Tận Nơi Hoặc Nhận Tại Cửa Hàng</span>
                </button>
              </div>
              <!-- Product shop -->
              <div v-if="shops_available" class="location-store">
                <div class="location-store__main">
                  <img
                    class="location-store__img"
                    src="../../assets/images/location_store.webp"
                    alt=""
                  />
                  <p class="location-store__text">
                    Có {{ shops_available.length }} cửa hàng còn sản phẩm
                  </p>
                  <button
                    class="location-store__btn"
                    @click.prevent="
                      showDropdownLocationStore = !showDropdownLocationStore
                    "
                  >
                    {{ showDropdownLocationStore ? "–" : "+" }}
                  </button>
                </div>
                <div v-show="showDropdownLocationStore" class="location-store__dropdown">
                  <div v-for="shop in shops_available" :key="shop._id" class="item">
                    <!-- <div class="location-store__dropdown--title">
                      <i class="bi bi-geo-alt-fill"></i>
                      {{ shop.quan_huyen }}, {{ shop.city }}:
                    </div> -->
                    <p>Số điện thoại: {{ shop.phone_number }}</p>
                    <p>{{ shop.address }}</p>
                  </div>
                </div>
              </div>
            </div>
            <!-- Service -->
            <div class="service-product mt-5">
              <div class="head-title">Cam kết bán hàng</div>
              <ul>
                <li>
                  <i class="bi bi-tencent-qq"></i>
                  <span class="content">Hàng chính hãng. Nguồn gốc rõ ràng</span>
                </li>
                <li>
                  <i class="bi bi-piggy-bank"></i>
                  <span class="content">Tặng máy nếu phát hiện máy sửa chữa</span>
                </li>
                <li>
                  <i class="bi bi-truck"></i>
                  <span class="content">Giao hàng ngay (nội thành TPHCM)</span>
                </li>
                <li>
                  <i class="bi bi-gear"></i>
                  <span class="content">Dùng thử 7 ngày miễn phí</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Content -->
  <div class="block-content-product">
    <!-- Left -->
    <div class="block-content-product__left">
      <product-description :description="product.product_description" />
      <Suspense>
        <template #default>
          <product-rating
            :product-id="product._id"
            :product-name="product.product_name"
          />
        </template>
        <template #fallback>
          <p>Loading ...</p>
        </template>
      </Suspense>
    </div>
    <!-- Right -->
    <div class="block-content-product__right">
      <product-specifications :attributes="product.attributes" />
    </div>
  </div>
</template>
