<template>
  <section class="product-detail">
    <!-- Detail -->
    <div class="row">
      <div class="col-12 product-info-detail">
        <div class="bg-color-white">
          <div class="row">
            <!-- Left -->
            <div class="col-8">
              <div class="img-active">
                <button v-if="activeThumbnail > 0" class="btn-arrow btn-arrow-left"
                  @click.prevent="handleImageActive(1)">
                  <i class="bi bi-chevron-compact-left"></i>
                </button>
                <img draggable="false" :src="product.images[activeThumbnail].src" :alt="product.name" />
                <button v-if="activeThumbnail < product.images.length - 1" class="btn-arrow btn-arrow-right"
                  @click.prevent="handleImageActive(-1)">
                  <i class="bi bi-chevron-compact-right"></i>
                </button>
              </div>
              <div class="product-thumb">
                <div class="list" :style="[
                  `width: ${widthThumbnail}px`,
                  `grid-template-columns: repeat(${product.images.length}, 1fr)`,
                  `margin-left: ${marginLeftThumbnail}px`
                ]" @mousemove.prevent="thumbMousemove" @mousedown.prevent="thumbMousedown"
                  @mouseup.prevent="thumbMouseup" @mouseleave.prevent="thumbMouseleave">
                  <div v-for="(item, index) in product.images" :key="index" class="item"
                    :class="index === activeThumbnail ? 'active' : ''" @click.prevent="activeThumbnail = index">
                    <img draggable="false" :src="item.src" :alt="product.name" />
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
                    <span class="text">{{ product.name }}
                      {{ product.colors[activeColor].options[activeOption].value }}</span>
                    <span class="subtext" :class="[
                      product.colors[activeColor].options[activeOption].quantity > 0
                        ? 'green'
                        : 'red'
                    ]">
                      {{
                        product.colors[activeColor].options[activeOption].quantity > 0
                          ? 'Còn hàng'
                          : 'Hết hàng'
                      }}
                    </span>
                  </h1>
                </div>
                <!-- Brand -->
                <div class="product-info d-flex">
                  <div class="pro-brand">
                    <span>
                      Thương hiệu:
                      <a :href="product.brand.name">{{ product.brand.name }}</a>
                    </span>
                  </div>
                  <span class="line-info"></span>
                  <div class="pro-type">
                    <span>
                      Loại:
                      <a :href="product.brand.name">{{ product.brand.name }}</a>
                    </span>
                  </div>
                </div>
                <!-- Price -->
                <div class="product-price">
                  <span class="price-now">{{ formatter(product.priceSale) }}</span>
                  <span class="price-compare">
                    <del>{{ formatter(product.price) }}</del>
                  </span>
                </div>
                <!-- Color -->
                <div class="select-wrap">
                  <div class="header">
                    <div class="pro-color">
                      <span>Màu sắc:
                        <b class="fw-bold">{{ product.colors[activeColor].name }}</b></span>
                    </div>
                  </div>
                  <div class="select-list py-3">
                    <div v-for="(color, index) in product.colors" :key="index" class="item" :class="[
                      index === activeColor && color.quantity > 0 ? 'active' : '',
                      color.quantity > 0 ? '' : 'disabled'
                    ]" @click.prevent="activeColor = index">
                      <img :src="color.image" :alt="product.name" />
                      <div>
                        <p>{{ color.name }}</p>
                        <p class="mt-2">{{ formatter(color.priceSale) }}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <!-- Option -->
                <div class="select-wrap">
                  <div class="header">
                    <div class="pro-color">
                      <span>Kích thước:
                        <b class="fw-bold">{{
                          product.colors[activeColor].options[activeOption].value
                        }}</b></span>
                    </div>
                  </div>
                  <div class="select-list py-3">
                    <div class="item d-block" v-for="(option, index) in product.colors[activeColor].options"
                      :key="index" :class="index === activeOption ? 'active' : ''" @click="activeOption = index">
                      <p class="text-center">{{ option.value }}</p>
                      <p class="text-center mt-2">{{ formatter(option.priceSale) }}</p>
                    </div>
                  </div>
                </div>
                <!-- Quantity add cart -->
                <div class="selector-actions">
                  <div class="quantity-area d-flex align-items-center justify-content-between">
                    <button type="button" @click.prevent="count--">-</button>
                    <input type="text" min="1" max="999" v-model="count" />
                    <button type="button" @click.prevent="count++">+</button>
                  </div>
                </div>
                <!-- Button add cart -->
                <div class="wrap-addcart pt-3">
                  <button class="btn btn-primary w-100" :class="product.quantity > 0 ? '' : 'disabled'"
                    @click.prevent="addCart">
                    <span class="fw-bold">THÊM VÀO GIỎ</span>
                    <span class="d-block">Giao Tận Nơi Hoặc Nhận Tại Cửa Hàng</span>
                  </button>
                </div>
                <!-- Product shop -->
                <div class="location-store">
                  <div v-if="product.colors[activeColor].options[activeOption].productShops.length > 0"
                    class="location-store__main">
                    <img class="location-store__img" src="../../assets/images/location_store.webp" alt="" />
                    <p class="location-store__text">
                      Có
                      {{ product.colors[activeColor].options[activeOption].productShops.length }}
                      cửa hàng còn sản phẩm
                    </p>
                    <button class="location-store__btn"
                      @click.prevent="showDropdownLocationStore = !showDropdownLocationStore">
                      {{ showDropdownLocationStore ? '–' : '+' }}
                    </button>
                  </div>
                  <div v-show="showDropdownLocationStore" class="location-store__dropdown">
                    <div class="item" v-for="address in product.colors[activeColor].options[activeOption]
                      .productShops" :key="address.id">
                      <div class="location-store__dropdown--title">
                        <i class="bi bi-geo-alt-fill"></i>
                        {{ address.district }}, {{ address.city }}:
                      </div>
                      <p>Số điện thoại: {{ address.phoneNumber }}</p>
                      <p>{{ address.address }}</p>
                      <p>{{ address.note }}</p>
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
        <ProductDescription :description="product.description" />
      </div>
      <!-- Property -->
      <div class="col-3">
        <ProductSpecifications :productSpectifications="product.properties" />
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject, ref, watch } from 'vue'
// Components
import ProductDescription from './ProductDescription.vue'
import ProductSpecifications from './ProductSpecifications.vue'

import { fetchApi, formatter } from '@/api/Common.js'

// Props
const props = defineProps(['product'])
// Emits event
const $emits = defineEmits(['update-cart'])
// Route
const $route = inject('$route')

// Product data
const product = ref(props.product)
// Count add to cart
let count = ref(1)
// Variable storage value active thumbnail
const activeThumbnail = ref(0)
// Color
const activeColor = ref(0)
// Option
const activeOption = ref(0)
// Is show dropdown location store
let showDropdownLocationStore = ref(false)
// Variable value margin-left style
let marginLeftThumbnail = ref(0)

// Calc width block thumbnail - 1 item: 95px
const widthThumbnail = product.value.images.length * 95

// Handle click button next/prev image active
function handleImageActive(n) {
  activeThumbnail.value -= n
}

// Watch active color
watch(activeColor, () => {
  // Set value count
  count.value = 1
  // Set value active option
  activeOption.value = 0
  // Change product price
  setPrice()
})

// Watch active option
watch(activeOption, () => {
  // Set value count
  count.value = 1
  // Change product price
  setPrice()
})

// Watch handle count add cart
watch(count, () => {
  // If it not a number
  if (isNaN(count.value)) {
    count.value = 1
  } else if (count.value < 1) {
    count.value = 1
  } else if (
    count.value > product.value.colors[activeColor.value].options[activeOption.value].quantity
  ) {
    alert('Số lượng sản phẩm không đủ')
    count.value = product.value.colors[activeColor.value].options[activeOption.value].quantity
  }
})

// Handle product thumbnail mouse event
let isStartThumbEvent = false
let offsetXArray = []
let widthX = 0
let marginLeftOld = 0

function thumbMousemove(event) {
  if (!isStartThumbEvent) return
  // Check if offsetX already exists in the array
  if (!offsetXArray.includes(event.pageX)) {
    offsetXArray.push(event.pageX)
    let startValueArr = offsetXArray[0]
    let endValueArr = offsetXArray[offsetXArray.length - 1]
    // Giá trị cuối mảng - giá trị đầu mảng
    widthX = endValueArr - startValueArr
    // Tính giá trị margin left
    marginLeftThumbnail.value = widthX + marginLeftOld
  }
}

function thumbMousedown() {
  isStartThumbEvent = true
  offsetXArray = []
  widthX = 0
}

function thumbMouseup() {
  isStartThumbEvent = false
  marginLeftOld += widthX
  if (marginLeftThumbnail.value > 0) {
    marginLeftOld = 0
  } else if (marginLeftThumbnail.value < -(product.value.images.length - 9) * 95) {
    marginLeftOld = -(product.value.images.length - 9) * 95
  }
  marginLeftThumbnail.value = marginLeftOld
}

function thumbMouseleave() {
  isStartThumbEvent = false
  // Handle margin left
  if (marginLeftThumbnail.value > 0) {
    marginLeftOld = 0
  } else if (marginLeftThumbnail.value < -(product.value.images.length - 9) * 95) {
    marginLeftOld = -(product.value.images.length - 9) * 95
  }
  marginLeftThumbnail.value = marginLeftOld
}

// Handle price product
function setPrice() {
  // Get price
  let priceColor = product.value.colors[activeColor.value].price
  let priceSaleColor = product.value.colors[activeColor.value].priceSale
  let priceOption = product.value.colors[activeColor.value].options[activeOption.value].price
  let priceSaleOption =
    product.value.colors[activeColor.value].options[activeOption.value].priceSale
  // Check price get price large
  if (priceColor > priceOption) {
    product.value.price = priceColor
    product.value.priceSale = priceSaleColor
  } else {
    product.value.price = priceOption
    product.value.priceSale = priceSaleOption
  }
}

// Handle add product to cart
function addCart() {
  const cartId = localStorage.getItem('wdsmartcartid')
  if (cartId === null) {
    alert('Vui lòng đăng nhập để thêm sản phẩm vào giỏ hàng')
    return
  }
  // Create object cart item
  const cartItem = {
    cartId: cartId,
    productUrl: product.value.textUrl,
    option:
      product.value.colors[activeColor.value].name +
      ' / ' +
      product.value.colors[activeColor.value].options[activeOption.value].value,
    quantity: count.value
  }

  console.log(cartItem);

  // Call api add cart
  fetchApi(`${$route}/Customer/AddItemCart`, 'POST', cartItem)
    .then((res) => {
      if (res.success === true) {
        // Emit event to App.vue to update cart
        $emits('update-cart')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

setPrice()
</script>
