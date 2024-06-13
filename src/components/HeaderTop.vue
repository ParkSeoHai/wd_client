<template>
  <div class="header-top d-flex align-items-center">
    <div class="container p-0">
      <div class="row d-flex align-items-center">
        <!-- Logo -->
        <Logo />
        <!-- Search -->
        <div class="col-4 header-search p-0">
          <form id="formSearch" class="header-search-form">
            <div class="form-group">
              <label for="header-search-input" hidden="hidden"></label>
              <input
                type="text"
                class="form-control header-search-input"
                id="header-search-input"
                placeholder="Nhập tìm kiếm..."
              />
            </div>
            <button type="button" class="btn btn-primary btn-search" onclick="searchProduct()">
              <i class="bi bi-search"></i>
            </button>
          </form>
        </div>
        <!-- Actions -->
        <div class="col-5 group-icon-header ps-3">
          <ul class="list-icon-header d-flex align-items-center justify-content-between">
            <!-- Phone number -->
            <li class="item">
              <a href="tel:033301536" class="item-link text-white d-flex align-items-center">
                <span class="icon"><i class="bi bi-telephone-forward"></i></span>
                <span class="text">
                  Hotline
                  <span class="small-text d-block">0333301536</span>
                </span>
              </a>
            </li>
            <!-- Store address -->
            <li class="item item-dropdown" @click="showDropdown('ddownStoreAddress')">
              <div class="header-store block d-flex align-items-center">
                <span class="icon"><i class="bi bi-geo-alt"></i></span>
                <span class="text">
                  Hệ thống
                  <span class="small-text d-flex align-items-center">
                    cửa hàng
                    <i class="bi bi-chevron-down ms-1"></i>
                  </span>
                </span>
                <!-- Drop down -->
                <div
                  v-show="listDropDown.ddownStoreAddress"
                  @click.stop=""
                  class="header-action_dropdown bg-grey-opacity header-store_dropdown"
                >
                  <div class="header-dropdown_content">
                    <div class="icon-close" @click="closeDropdown('ddownStoreAddress')">
                      <i class="bi bi-x"></i>
                    </div>
                    <p class="title">Tìm cửa hàng gần bạn</p>
                    <div class="d-flex align-items-center justify-content-between gap-2 mt-3">
                      <select class="form-select select">
                        <option selected>Chọn tỉnh/thành phố</option>
                        <option value="1">Hà Nội</option>
                        <option value="2">Hồ Chí Minh</option>
                      </select>

                      <select class="form-select select">
                        <option selected>Chọn Quận/huyện</option>
                      </select>
                    </div>
                    <div class="address-count mt-4">
                      <div class="address-detail">
                        <ul class="address-link">
                          <li
                            class="item"
                            v-for="addressShop of addressShops"
                            :key="addressShop.id"
                          >
                            <a href="#" class="infor">
                              <b>{{ addressShop.city }} - {{ addressShop.nameShop }}</b>
                              <span>{{ addressShop.address }}</span>
                              <span class="phoneNumber d-flex align-items-baseline">
                                <i class="bi bi-phone"></i>
                                <span class="ms-1">{{ addressShop.phoneNumber }}</span>
                              </span>
                              <span>{{ addressShop.note }}</span>
                            </a>
                            <a
                              :href="addressShop.urlMap"
                              class="infoLocation d-flex align-items-baseline gap-1"
                            >
                              <i class="bi bi-arrow-bar-right"></i>
                              <span>Chỉ đường</span>
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!-- Login / Register -->
            <li class="item item-dropdown" @click="showDropdown('ddownLogin')">
              <div class="block header-login d-flex align-items-center">
                <span class="icon"><i class="bi bi-person-fill"></i></span>
                <!-- User logged -->
                <span v-if="userLogged" class="text">
                  Tài khoản
                  <span class="small-text d-flex align-items-center">
                    của bạn
                    <i class="bi bi-chevron-down ms-1"></i>
                  </span>
                </span>
                <span v-else class="text">
                  Đăng nhập
                  <span class="small-text d-flex align-items-center">
                    Đăng ký
                    <i class="bi bi-chevron-down ms-1"></i>
                  </span>
                </span>
                <!-- Drop down -->
                <div
                  v-show="listDropDown.ddownLogin"
                  @click.stop=""
                  class="header-action_dropdown bg-grey-opacity"
                >
                  <div class="header-dropdown_content header-dropdown_login">
                    <div class="icon-close" @click="closeDropdown('ddownLogin')">
                      <i class="bi bi-x"></i>
                    </div>
                    <!-- User logged -->
                    <div v-if="userLogged">
                      <p class="title">Thông tin tài khoản</p>
                      <p class="desc mt-4">
                        Tên:
                        <span class="d-inline-block fw-bold my-0" style="font-size: 1.5rem"
                          >{{ user.firstName }} {{ user.lastName }}</span
                        >
                      </p>
                      <p class="desc">
                        Email:
                        <span class="d-inline-block fw-bold my-0" style="font-size: 1.5rem">{{
                          user.email
                        }}</span>
                      </p>
                      <div class="actions d-flex align-items-center gap-3">
                        <a href="/user/account" class="btn btn-primary w-75">Xem chi tiết</a>
                        <a
                          href="/user/logout"
                          @click.prevent="logout"
                          class="btn btn-outline-primary w-25"
                          >Đăng xuất</a
                        >
                      </div>
                    </div>
                    <div v-else>
                      <p class="title">Đăng nhập tài khoản</p>
                      <p class="desc">Nhập email và mật khẩu của bạn</p>
                      <form class="header-form_login" @submit.prevent="submitFormLogin">
                        <ul class="header-form_login--errors" v-show="responseLoginErrors">
                          <li v-for="(error, index) in responseLoginErrors" :key="index">{{ error }}</li>
                        </ul>
                        <div class="mb-2">
                          <input
                            type="email"
                            class="form-control"
                            id="email-login"
                            required
                            placeholder="Email"
                            v-model="email"
                          />
                        </div>
                        <div class="mb-2">
                          <input
                            type="password"
                            class="form-control"
                            id="password-login"
                            required
                            placeholder="Password"
                            v-model="password"
                          />
                        </div>
                        <button type="submit" class="btn btn-login">Đăng nhập</button>
                      </form>
                      <span class="create-account d-block">
                        Khách hàng mới?
                        <a href="/user/register">Tạo tài khoản</a>
                      </span>
                      <span class="forgot-account d-block">
                        Quên mật khẩu?
                        <a href="#">Khôi phục mật khẩu</a>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!-- Cart -->
            <li class="item item-dropdown" @click="showDropdown('ddownCart')">
              <div class="cart">
                <button type="button" class="btn btn-primary d-flex align-items-center cart-btn">
                  <span class="icon">
                    <i class="bi bi-cart"></i>
                    <span class="quantity">{{ props.cartItems.length }}</span>
                  </span>
                  <span class="text">Giỏ hàng</span>
                </button>
                <!-- Drop down -->
                <div
                  v-show="listDropDown.ddownCart"
                  @click.stop=""
                  class="header-action_dropdown bg-grey-opacity header-cart_dropdown"
                >
                  <div class="header-dropdown_content header-dropdown_login">
                    <div class="icon-close" @click="closeDropdown('ddownCart')">
                      <i class="bi bi-x"></i>
                    </div>
                    <p class="title">Giỏ hàng</p>
                    <!-- Cart empty -->
                    <div class="mini_cart_header text-center py-2" v-if="props.cartItems.length == 0">
                      <i class="bi bi-cart2"></i>
                      <p>Hiện chưa có sản phẩm</p>
                      <hr class="text-dark mb-1" />
                      <div class="cart-total d-flex align-items-baseline justify-content-between">
                        <span class="text">TỔNG TIỀN:</span>
                        <span class="prices">0₫</span>
                      </div>
                      <div class="actions d-flex align-items-center justify-content-between py-2">
                        <router-link to="/cart" class="btn btn-primary">XEM GIỎ HÀNG</router-link>
                        <router-link to="thanh-toan" class="btn btn-outline-primary">THANH TOÁN</router-link>
                      </div>
                    </div>
                    <!-- Cart have product -->
                    <div v-else>
                      <ul class="list-cart">
                        <!-- Item -->
                        <li
                          class="item-cart d-flex align-items-center justify-content-between"
                          v-for="item in props.cartItems"
                          :key="item.id"
                        >
                          <div class="cart-product w-100 d-flex align-items-center">
                            <router-link :to="`/san-pham/${item.textUrl}`">
                              <img
                                :src="item.defaultImage"
                                :alt="item.name"
                                class="img-thumb"
                              />
                            </router-link>
                            <div class="product-info w-100">
                              <p class="product-name">
                                <router-link :to="`/san-pham/${item.textUrl}`">
                                  {{ item.name }}
                                </router-link>
                              </p>
                              <p class="product-option">{{ item.option }}</p>
                              <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                  <span class="product-quantity">{{ item.quantity }}</span>
                                  <p class="product-price">
                                    {{ formatter(item.price) }}
                                  </p>
                                </div>
                                <p class="product-del" @click="removeItemCart(item.textUrl)">Xóa</p>
                              </div>
                            </div>
                          </div>
                        </li>
                        <!-- <li class="item-cart d-flex align-items-center justify-content-between">
                          <div class="cart-product w-100 d-flex align-items-center">
                            <a href="">
                              <img
                                src="https://product.hstatic.net/200000713019/product/iphone-13-hai-phong-5_64e55ef8030146188826dc010be7f79b_9bab4fd7cdee42ffa34fc35fef3fcb6f_medium.jpg"
                                alt="Product"
                                class="img-thumb"
                              />
                            </a>
                            <div class="product-info w-100">
                              <p class="product-name">
                                <a href="">iPhone 13 chinh hang VNA</a>
                              </p>
                              <p class="product-option">Hồng / 256Gb / Chính hãng VNA</p>
                              <div class="d-flex align-items-center justify-content-between">
                                <div class="d-flex align-items-center">
                                  <span class="product-quantity">1</span>
                                  <p class="product-price">100.000₫</p>
                                </div>
                                <p class="product-del">Xóa</p>
                              </div>
                            </div>
                          </div>
                        </li> -->
                      </ul>
                      <div class="cart-total d-flex align-items-baseline justify-content-between">
                        <span class="text">TỔNG TIỀN:</span>
                        <span class="prices">{{ formatter(totalPrice) }}</span>
                      </div>
                      <div class="actions d-flex align-items-center justify-content-between py-2">
                        <router-link to="/cart" class="btn btn-primary">XEM GIỎ HÀNG</router-link>
                        <router-link to="thanh-toan" class="btn btn-outline-primary">THANH TOÁN</router-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
<script setup>
import { computed, inject, onMounted, ref } from 'vue'
// Component
import Logo from './Logo.vue'
// Api
import axios from 'axios'
import getAddressShops from '@/api/AddressShopService'
import { formatter, fetchApi } from '@/api/Common.js'

const $emits = defineEmits(['handle-modal', 'update-cart'])
// Props from parent component Header.vue
const props = defineProps(['cartItems'])
const $route = inject('$route') // Route call api

// Handle address shops
const addressShops = ref([])

// Handle cart
const totalPrice = computed(() => {
  return props.cartItems.reduce((total, item) => total + item.price * item.quantity, 0)
})

// List dropdown header
let listDropDown = ref({
  ddownStoreAddress: false,
  ddownLogin: false,
  ddownCart: false
})

// Handle user was login
const userLogged = ref(false)
const user = JSON.parse(localStorage.getItem('wdsmartuser'))
if (user) {
  userLogged.value = true
}

// Handle show dropdown header
function showDropdown(dropDownName) {
  for (let dropDownItem in listDropDown.value) {
    if (dropDownItem === dropDownName) {
      listDropDown.value[dropDownName] = !listDropDown.value[dropDownName]
      // Handle emit event to components/Header.vue
      $emits('handle-modal', listDropDown.value[dropDownName])
    } else {
      listDropDown.value[dropDownItem] = false
    }
  }
}

// Handle close dropdown
function closeDropdown(dropDownName) {
  listDropDown.value[dropDownName] = false
  // Handle emit event to components/Header.vue
  $emits('handle-modal', false)
}

// Handle login dropdown top header form
const email = ref('')
const password = ref('')
const responseLoginErrors = ref([])

function submitFormLogin() {
  responseLoginErrors.value = []
  // Call API login
  axios
    .post(`${$route}/Customer/Login`, {
      email: email.value,
      password: password.value
    })
    .then((response) => {
      console.log(response.data)
      if (response.data.success === true) {
        // Save user info to localStorage
        localStorage.setItem('wdsmartuser', JSON.stringify(response.data.data))
        localStorage.setItem('wdsmartcartid', response.data.data.cartId)
        // Redirect to home page
        window.location.href = '/'
      } else {
        // Show error messages
        responseLoginErrors.value = response.data.errors
      }
    })
    .catch((error) => {
      console.log(error)
    })
}

// Handle logout
function logout() {
  localStorage.removeItem('wdsmartuser')
  localStorage.removeItem('wdsmartcartid')
  window.location.href = '/'
}

// Handle get data address shops
const fetchData = async () => {
  try {
    addressShops.value = await getAddressShops($route)
  } catch (error) {
    throw error.message
  }
}

// Handle remove item cart
const removeItemCart = (productUrl) => {
  // get cart id from local storage
  const cartId = localStorage.getItem('wdsmartcartid')
  // call api remove item cart
  const url = `${$route}/Customer/RemoveItemCart?cartId=${cartId}&productUrl=${productUrl}`
  fetchApi(url, 'DELETE')
    .then((res) => {
        if(res.success === true) {
          // Emit event to App.vue to update cart
          $emits('update-cart')
        }
    })
    .catch((err) => {
        console.log(err);
    });
}

onMounted(fetchData)
</script>
