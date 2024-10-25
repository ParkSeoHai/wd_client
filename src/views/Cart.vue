<template>
  <Breadcrumb :items="[{ text: 'Home', to: '/' }]" breadcrumb-active="Giỏ hàng" />
  <section id="cart-template" class="cart-page">
    <div class="row">
      <div class="col-9">
        <div class="cart-left bg-color-white">
          <div class="cart-title">
            <h2>Giỏ hàng:</h2>
            <span class="cart-count">{{ props.cartItems.length }} sản phẩm</span>
          </div>
          <div class="cart-list" v-if="props.cartItems.length > 0">
            <!-- Item -->
            <div class="cart-item" v-for="product in props.cartItems" :key="product.id">
              <div class="d-flex cart-item__info--product">
                <div class="cart-item__img">
                  <router-link :to="`/san-pham/${product.textUrl}`">
                    <img :src="product.defaultImage" :alt="product.name" />
                  </router-link>
                </div>
                <div class="cart-item__info">
                  <h3 class="cart-item__info--title">
                    <router-link :to="`/san-pham/${product.textUrl}`">{{
                      product.name
                    }}</router-link>
                  </h3>
                  <div class="cart-item__group--option">
                    <p class="item-option">{{ product.option }}</p>
                    <p class="item-option item-option__price">
                      {{ formatter(product.price) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="cart-item__qty">
                <div class="selector-actions">
                  <div class="quantity-area d-flex align-items-center justify-content-between">
                    <button type="button" @click.prevent="handleQuantity(product.name, 'decrease')">
                      -
                    </button>
                    <input type="text" min="1" max="999" readonly :value="product.quantity" />
                    <button type="button" @click.prevent="handleQuantity(product.name, 'plus')">
                      +
                    </button>
                  </div>
                </div>
                <div class="cart-item__remove">
                  <span @click="removeItemCart(product.textUrl)">Xóa</span>
                </div>
              </div>
              <div class="cart-item__price">
                <span>{{ formatter(product.quantity * product.price) }}</span>
              </div>
            </div>
            <!-- <div class="cart-item">
              <div class="d-flex">
                <div class="cart-item__img">
                  <a href="">
                    <img
                      src="https://product.hstatic.net/200000713019/product/iphone-13-hai-phong-5_64e55ef8030146188826dc010be7f79b_9bab4fd7cdee42ffa34fc35fef3fcb6f_medium.jpg"
                      alt=""
                    />
                  </a>
                </div>
                <div class="cart-item__info">
                  <h3 class="cart-item__info--title">
                    <a href="">iPhone 13 Chính hãng VN/A</a>
                  </h3>
                  <div class="cart-item__group--option">
                    <p class="item-option">Hồng / 256Gb / Chính hãng VNA</p>
                    <p class="item-option item-option__price">19,268,500₫</p>
                  </div>
                </div>
              </div>
              <div class="cart-item__qty">
                <div class="selector-actions">
                  <div class="quantity-area d-flex align-items-center justify-content-between">
                    <button type="button" @click.prevent="count--">-</button>
                    <input type="text" min="1" max="999" v-model="count" />
                    <button type="button" @click.prevent="count++">+</button>
                  </div>
                </div>
                <div class="cart-item__remove">
                  <span>Xóa</span>
                </div>
              </div>
              <div class="cart-item__price">
                <span>38,537,000₫</span>
              </div>
            </div> -->
          </div>
          <div class="cart-empty" v-else>
            <p>
              Giỏ hàng của bạn đang trống. Mời bạn mua thêm sản phẩm
              <router-link to="/">tại đây</router-link>.
            </p>
          </div>
        </div>
      </div>
      <div class="col-3">
        <div class="cart-right bg-color-white">
          <div class="cart-title">
            <p>Thông tin đơn hàng</p>
          </div>
          <p class="cart-total">
            <span>Tổng tiền:</span>
            <span class="cart-total__price">{{ formatter(totalPrice) }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import Breadcrumb from '@/components/Breadcrumb.vue'
import { computed, inject } from 'vue'

import { fetchApi, formatter } from '@/api/Common.js'

const $route = inject('$route') // Route call api

// Emit event to App.vue
const $emits = defineEmits(['update-cart'])
// Props from App.vue
const props = defineProps(['cartItems'])

// Get total price
const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
})

// Handle quantity cart
const handleQuantity = (name, action) => {
  const product = props.cartItems.find(
    (item) => item.name.trim().toLowerCase() === name.trim().toLowerCase()
  )
  // Product is not exist
  if (product == null) {
    alert('Product not found')
    return
  }

  // Update quantity
  let qtyProduct = product.quantity
  if (action === 'decrease') {
    if (qtyProduct == 1) {
      return
    }
    qtyProduct--
  } else {
    if (qtyProduct == product.quantityMax) {
      alert('Số lượng sản phẩm đã đạt giới hạn')
      return
    }
    qtyProduct++
  }
  // Get value cart object
  const cartId = localStorage.getItem('wdsmartcartid')
  const cartItem = {
    cartId: cartId,
    productUrl: product.textUrl,
    option: product.option,
    quantity: qtyProduct
  }
  //Call api update cart item
  fetchApi(`${$route}/Customer/UpdateItemCart`, 'PATCH', cartItem)
    .then(async (res) => {
      if (res.success === true) {
        // Emit event to App.vue to update cart
        $emits('update-cart')
      } else {
        alert('Update cart item failed')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}

// Handle remove item cart
const removeItemCart = (productUrl) => {
  // get cart id from local storage
  const cartId = localStorage.getItem('wdsmartcartid')
  // call api remove item cart
  const url = `${$route}/Customer/RemoveItemCart?cartId=${cartId}&productUrl=${productUrl}`
  fetchApi(url, 'DELETE')
    .then(async (res) => {
      if (res.success === true) {
        // Emit event to App.vue to update cart
        $emits('update-cart')
      } else {
        alert('Delete cart item failed')
      }
    })
    .catch((err) => {
      console.log(err)
    })
}
</script>
