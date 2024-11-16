<script setup>
import { computed, inject, ref, watch } from "vue";
import { formatter, calcProductPriceSale } from "@/service/Common.js";
import { useToast } from "vue-toast-notification";
import axios from "axios";
import { addItem } from "@/service/CartService";
import ProductDescription from "./ProductDescription.vue";
import ProductSpecifications from "./ProductSpecifications.vue";

const $toast = useToast();

const urlApi = inject("url_api");

// inject from App.vue
const setRefreshCart = inject("setRefreshCart");

const emit = defineEmits([["setBreadcrumb"]]);
// Props
const { productUrl } = defineProps(["productUrl"]);

// Func get product by url
const getProductByUrl = async () => {
  const url = `${urlApi}/api/v1/product/${productUrl}`;
  const res = await axios.get(url);
  return res.data.metadata;
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
// Variable storage value active thumbnail
const activeThumbnail = ref(0);
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
  return optionParent.value.sub_options.option_values.length > 0
    ? optionParent.value.sub_options.option_values[activeOptionChild.value]
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

// Variable value margin-left style
let marginLeftThumbnail = ref(0);

// Calc width block thumbnail - 1 item: 95px
const widthThumbnail = product.value.images.length * 95;

// Handle click button next/prev image active
function handleImageActive(n) {
  activeThumbnail.value -= n;
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
    alert("Số lượng sản phẩm không đủ");
    count.value = quantity;
  }
});

// Handle product thumbnail mouse event
let isStartThumbEvent = false;
let offsetXArray = [];
let widthX = 0;
let marginLeftOld = 0;

function thumbMousemove(event) {
  if (!isStartThumbEvent) return;
  // Check if offsetX already exists in the array
  if (!offsetXArray.includes(event.pageX)) {
    offsetXArray.push(event.pageX);
    let startValueArr = offsetXArray[0];
    let endValueArr = offsetXArray[offsetXArray.length - 1];
    // Giá trị cuối mảng - giá trị đầu mảng
    widthX = endValueArr - startValueArr;
    // Tính giá trị margin left
    marginLeftThumbnail.value = widthX + marginLeftOld;
  }
}

function thumbMousedown() {
  isStartThumbEvent = true;
  offsetXArray = [];
  widthX = 0;
}

function thumbMouseup() {
  isStartThumbEvent = false;
  marginLeftOld += widthX;
  if (marginLeftThumbnail.value > 0) {
    marginLeftOld = 0;
  } else if (marginLeftThumbnail.value < -(product.value.images.length - 9) * 95) {
    marginLeftOld = -(product.value.images.length - 9) * 95;
  }
  marginLeftThumbnail.value = marginLeftOld;
}

function thumbMouseleave() {
  isStartThumbEvent = false;
  // Handle margin left
  if (marginLeftThumbnail.value > 0) {
    marginLeftOld = 0;
  } else if (marginLeftThumbnail.value < -(product.value.images.length - 9) * 95) {
    marginLeftOld = -(product.value.images.length - 9) * 95;
  }
  marginLeftThumbnail.value = marginLeftOld;
}

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
    alert("Vui long dang nhap");
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
</script>

<template>
  <!-- Detail -->
  <div class="row">
    <div class="col-12 product-info-detail">
      <div class="bg-color-white">
        <div class="row">
          <!-- Left -->
          <div class="col-8">
            <div class="img-active">
              <button
                v-if="activeThumbnail > 0"
                class="btn-arrow btn-arrow-left"
                @click.prevent="handleImageActive(1)"
              >
                <i class="bi bi-chevron-compact-left"></i>
              </button>
              <img
                draggable="false"
                :src="product.images[activeThumbnail].image_url"
                :alt="product.images[activeThumbnail].alt_text"
              />
              <button
                v-if="activeThumbnail < product.images.length - 1"
                class="btn-arrow btn-arrow-right"
                @click.prevent="handleImageActive(-1)"
              >
                <i class="bi bi-chevron-compact-right"></i>
              </button>
            </div>
            <div class="product-thumb">
              <div
                class="list"
                :style="[
                  `width: ${widthThumbnail}px`,
                  `grid-template-columns: repeat(${product.images.length}, 1fr)`,
                  `margin-left: ${marginLeftThumbnail}px`,
                ]"
                @mousemove.prevent="thumbMousemove"
                @mousedown.prevent="thumbMousedown"
                @mouseup.prevent="thumbMouseup"
                @mouseleave.prevent="thumbMouseleave"
              >
                <div
                  v-for="(item, index) in product.images"
                  :key="index"
                  class="item"
                  :class="index === activeThumbnail ? 'active' : ''"
                  @click.prevent="activeThumbnail = index"
                >
                  <img draggable="false" :src="item.image_url" :alt="item.alt_text" />
                </div>
              </div>
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
            <!-- <div class="bg-color-white">
              <div class="service-product">
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
            </div> -->
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Description -->
  <div class="row pt-4">
    <div class="col-9">
      <ProductDescription :description="product.product_description" />
    </div>
    <!-- Property -->
    <div class="col-3">
      <ProductSpecifications :attributes="product.attributes" />
    </div>
  </div>
</template>
