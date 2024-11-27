<template>
  <div class="header-top d-flex align-items-center">
    <div class="container-xl">
      <div class="row d-flex align-items-center">
        <!-- Logo -->
        <Logo />
        <!-- Search -->
        <div class="col-6 col-xl-4 col-lg-5 col-sm-5 header-search pe-5">
          <form id="formSearch" @submit.prevent="submitSearch" class="header-search-form">
            <div class="form-group">
              <label for="header-search-input" hidden="hidden"></label>
              <input
                type="text"
                class="form-control header-search-input"
                id="header-search-input"
                placeholder="Nhập tìm kiếm..."
                v-model.trim="search.input"
                @click.prevent="showDropdown('ddownSearch')"
              />
            </div>
            <button class="btn btn-primary btn-search">
              <i class="bi bi-search"></i>
            </button>
          </form>
          <!-- dropdown -->
          <div
            v-show="listDropDown.ddownSearch"
            @click.stop=""
            class="header-search__dropdown header-action_dropdown bg-grey-opacity"
          >
            <div class="header-dropdown_content">
              <div class="icon-close" @click="closeDropdown('ddownSearch')">
                <i class="bi bi-x"></i>
              </div>
              <p class="title mt-2">Tìm kiếm sản phẩm</p>
              <div v-if="search.input">
                <div v-if="search.loading === true" class="text-center p-5">
                  <v-progress-circular
                    color="primary"
                    indeterminate
                  ></v-progress-circular>
                </div>
                <div v-else>
                  <!-- <template v-if="search.products === null">
                    <p class="py-5 text-center">Vui lòng nhập từ khóa tìm kiếm</p>
                  </template> -->
                  <template v-if="search.products.length > 0">
                    <router-link
                      :to="`/search/result/${search.input}`"
                      class="d-block mt-4 text-end"
                      >Xem tất cả {{ search.products.length }} sản phẩm</router-link
                    >
                    <div class="search-list">
                      <router-link
                        v-for="product in search.products"
                        :key="product._id"
                        :to="`/san-pham/${product.product_url}`"
                        class="search-item"
                      >
                        <div class="search-item__img">
                          <img
                            v-if="product.imageThumbs.length > 0"
                            :src="product.imageThumbs[0].image_url"
                          />
                          <img
                            v-else
                            src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOU0iaTa57K7OKcsCM3m0tEORCxzbYllHIUQ&s"
                          />
                        </div>
                        <div class="search-item__content">
                          <h3 class="search-item__content--title">
                            {{ product.product_name }}
                          </h3>
                          <div class="search-item__content--price">
                            <span class="price-sale">{{
                              formatter(product.product_price_sale)
                            }}</span>
                            <del class="price-del">{{
                              formatter(product.product_price)
                            }}</del>
                          </div>
                        </div>
                      </router-link>
                    </div>
                  </template>
                  <template v-else>
                    <div>
                      <p class="py-5 text-center">Không tìm thấy sản phẩm nào</p>
                    </div>
                  </template>
                </div>
              </div>
              <div v-else>
                <p class="py-5 text-center">Vui lòng nhập từ khóa tìm kiếm</p>
                <!-- <div class="d-flex justify-content-between mt-3">
                  <p>Lịch sử tìm kiếm</p>
                  <button class="header-search__dropdown--link">Xóa tất cả</button>
                </div>
                <ul class="list-history">
                  <li class="item-history">
                    <a href="" class="item-history__link">iPhone 13</a>
                  </li>
                  <li class="item-history">
                    <a href="" class="item-history__link">iPhone 15</a>
                  </li>
                  <li class="item-history">
                    <a href="" class="item-history__link">iPhone 11</a>
                  </li>
                  <li class="item-history">
                    <a href="" class="item-history__link">Samsung</a>
                  </li>
                </ul> -->
              </div>
            </div>
          </div>
        </div>
        <!-- Actions -->
        <div class="col-3 col-xl-5 col-lg-4 col-sm-4 group-icon-header">
          <ul class="list-icon-header d-flex align-items-center">
            <!-- Phone number -->
            <li class="item header-top__contact">
              <a
                href="tel:033301536"
                class="item-link text-white d-flex align-items-center"
              >
                <span class="icon"><i class="bi bi-telephone-forward"></i></span>
                <span class="text">
                  Hotline
                  <span class="small-text d-block">0333301536</span>
                </span>
              </a>
            </li>
            <!-- Store address -->
            <li
              class="item item-dropdown header-top__shop-address"
              @click="showDropdown('ddownStoreAddress')"
            >
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
                    <div
                      class="d-flex align-items-center justify-content-between gap-2 mt-3"
                    >
                      <select class="form-select select" @change="changeSelectCity">
                        <option value="" selected>Chọn tỉnh/thành phố</option>
                        <option
                          v-for="(city, index) in cities"
                          :key="index"
                          :value="city.name"
                        >
                          {{ city.name }}
                        </option>
                      </select>

                      <select class="form-select select" @change="changeSelectQuanHuyen">
                        <option value="" selected>Chọn Quận/huyện</option>
                        <option v-for="(quan_huyen, index) in quan_huyens" :key="index">
                          {{ quan_huyen }}
                        </option>
                      </select>
                    </div>
                    <div class="address-count mt-4">
                      <div class="address-detail">
                        <ul class="address-link">
                          <li
                            class="item"
                            v-for="addressShop of addressShops"
                            :key="addressShop._id"
                          >
                            <a
                              :href="addressShop.url_map"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="infor"
                            >
                              <b
                                >{{ addressShop.city }} - {{ addressShop.name_shop }} CN
                                {{ addressShop.quan_huyen }}</b
                              >
                              <span>{{
                                `${addressShop.detail}, ${addressShop.xa_phuong}, ${addressShop.quan_huyen}`
                              }}</span>
                              <span class="phoneNumber d-flex align-items-baseline">
                                <i class="bi bi-phone"></i>
                                <span class="ms-1"
                                  >Số điện thoại: {{ addressShop.phone_number }}</span
                                >
                              </span>
                              <span>Thời gian hoạt động: {{ addressShop.uptime }}</span>
                            </a>
                            <a
                              :href="addressShop.url_map"
                              target="_blank"
                              rel="noopener noreferrer"
                              class="infoLocation d-flex align-items-baseline gap-1"
                            >
                              <i class="bi bi-geo-alt-fill"></i>
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
                <span v-if="user" class="text">
                  Tài khoản
                  <span class="small-text d-flex align-items-center">
                    của tôi
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
                  class="header-action_dropdown header-login_dropdown-block bg-grey-opacity"
                >
                  <div class="header-dropdown_content header-dropdown_login">
                    <div class="icon-close" @click="closeDropdown('ddownLogin')">
                      <i class="bi bi-x"></i>
                    </div>
                    <!-- User logged -->
                    <div v-if="user">
                      <p class="title">Thông tin tài khoản</p>
                      <p class="desc mt-4">
                        Tên:
                        <span
                          class="d-inline-block fw-bold my-0"
                          style="font-size: 1.5rem"
                          >{{ user.name }}</span
                        >
                      </p>
                      <p class="desc">
                        Email:
                        <span
                          class="d-inline-block fw-bold my-0"
                          style="font-size: 1.5rem"
                          >{{ user.email }}</span
                        >
                      </p>
                      <div class="actions d-flex align-items-center gap-3">
                        <RouterLink
                          to="/user/account"
                          class="btn dropdown_login-btn btn-primary w-75"
                          >Xem chi tiết</RouterLink
                        >
                        <button
                          @click="logout"
                          class="btn dropdown_login-btn btn-outline-primary w-25"
                        >
                          Đăng xuất
                        </button>
                      </div>
                    </div>
                    <div v-else>
                      <p class="title">Đăng nhập tài khoản</p>
                      <p class="desc">Nhập email và mật khẩu của bạn</p>
                      <form class="header-form_login" @submit.prevent="submitFormLogin">
                        <ul
                          class="header-form_login--errors"
                          v-show="responseLoginErrors"
                        >
                          <li v-for="(error, index) in responseLoginErrors" :key="index">
                            {{ error }}
                          </li>
                        </ul>
                        <div class="mb-2">
                          <input
                            type="email"
                            class="form-control"
                            id="email-login"
                            required
                            placeholder="Email"
                            v-model.trim="email"
                          />
                        </div>
                        <div class="mb-2">
                          <input
                            type="password"
                            class="form-control"
                            id="password-login"
                            required
                            placeholder="Password"
                            v-model.trim="password"
                          />
                        </div>
                        <button type="submit" class="btn btn-login">Đăng nhập</button>
                      </form>
                      <span class="create-account d-block">
                        Khách hàng mới?
                        <RouterLink to="/user/register">Tạo tài khoản</RouterLink>
                      </span>
                      <span class="forgot-account d-block">
                        Quên mật khẩu?
                        <RouterLink to="#">Khôi phục mật khẩu</RouterLink>
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </li>
            <!-- Cart -->
            <li class="item item-dropdown" @click="showDropdown('ddownCart')">
              <div class="cart">
                <button
                  type="button"
                  class="btn btn-primary d-flex align-items-center cart-btn"
                >
                  <span class="icon">
                    <i class="bi bi-cart"></i>
                    <span class="quantity">{{ total_quantity }}</span>
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
                    <div
                      v-if="cart.cart_items.length === 0"
                      class="mini_cart_header text-center py-2"
                    >
                      <i class="bi bi-cart2"></i>
                      <p>Hiện chưa có sản phẩm</p>
                      <hr class="text-dark mb-1" />
                      <div
                        class="cart-total d-flex align-items-baseline justify-content-between"
                      >
                        <span class="text">TỔNG TIỀN:</span>
                        <span class="cart-total__price">0₫</span>
                      </div>
                    </div>
                    <!-- Cart have product -->
                    <div v-else>
                      <ul class="list-cart">
                        <!-- Item -->
                        <li
                          class="product-cart item-cart d-flex align-items-center justify-content-between"
                          v-for="item in cart.cart_items"
                          :key="item._id"
                        >
                          <div class="cart-product w-100 d-flex align-items-center">
                            <router-link :to="`/san-pham/${item.product_url}`">
                              <img
                                :src="item.product_thumb"
                                :alt="item.product_name"
                                class="img-thumb"
                              />
                            </router-link>
                            <div class="product-info w-100">
                              <p class="product-name">
                                <router-link :to="`/san-pham/${item.product_url}`">
                                  {{ item.product_name }}
                                </router-link>
                              </p>
                              <p class="product-option">
                                {{ item.option?.option_value }}
                                <span v-if="item.option.sub_option">
                                  / {{ item.option.sub_option?.option_value }}</span
                                >
                              </p>
                              <div
                                class="d-flex align-items-center justify-content-between"
                              >
                                <div class="d-flex align-items-center">
                                  <span class="product-quantity"
                                    >SL: {{ item.quantity }}</span
                                  >
                                  <p class="product-price">
                                    {{ formatter(item.price_at_added) }}
                                  </p>
                                </div>
                                <p
                                  class="product-del"
                                  @click="removeItemCart(cart._id, item._id)"
                                >
                                  Xóa
                                </p>
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
                      <div
                        class="cart-total d-flex align-items-baseline justify-content-between"
                      >
                        <span class="text">TỔNG TIỀN:</span>
                        <span class="cart-total__price">{{
                          formatter(cart.total_price)
                        }}</span>
                      </div>
                    </div>
                    <div
                      class="actions d-flex align-items-center justify-content-between py-2"
                    >
                      <router-link to="/gio-hang" class="btn btn-primary"
                        >XEM GIỎ HÀNG</router-link
                      >
                      <router-link
                        :to="`/thanh-toan/${user?._id}`"
                        class="btn btn-outline-primary"
                        :class="{ disabled: cart.cart_items.length === 0 }"
                        >THANH TOÁN</router-link
                      >
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
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
// Component
import Logo from "./Logo.vue";
// Libs
import axios from "axios";
import debounce from "lodash.debounce";
import { useToast } from "vue-toast-notification";
// Service
import { formatter } from "@/service/Common.js";
import { login } from "@/service/AuthService";
import { getCart, removeItem } from "@/service/CartService";
import { searchProduct } from "@/service/ProductService";
import router from "@/router";

const $toast = useToast();

const url_api = inject("url_api");
// inject from app.vue
const setModalBackground = inject("setModalBackground");
const listDropDown = inject("listDropDownHeader");
const refreshCartStatus = inject("refreshCartStatus");
const setRefreshCart = inject("setRefreshCart");

// get user was login
const user = inject("user");

const cart = ref({
  cart_items: [],
});

const search = reactive({
  input: "",
  products: [],
  loading: false,
});

const total_quantity = computed(() => {
  return cart.value?.total_quantity || 0;
});

watch(
  () => search.input,
  () => {
    search.loading = true;
    search.products = [];
  }
);

watch(
  () => search.input,
  debounce(async () => {
    setTimeout(async () => {
      if (search.input !== "") {
        const res = await searchProduct({
          searchStr: search.input,
          urlApi: url_api,
        });
        search.products = res.metadata;
      } else {
        search.products = [];
      }
      search.loading = false;
    }, 500);
  }, 500)
);

watch(refreshCartStatus, async () => {
  if (refreshCartStatus.value) {
    await getCartInfo();
    setRefreshCart(false);
  }
});

// Handle address shops
const addressShops = ref([]);
const cities = ref([]);
const quan_huyens = ref([]);
let citySelect = "";

// func get data address shops
const getAddressShops = async (url) => {
  const response = await axios.get(url);
  addressShops.value = response.data.metadata.addressShops;
  cities.value = response.data.metadata.cities;
};

// Handle change select option city address
const changeSelectCity = async (event) => {
  citySelect = event.target.value;
  await getAddressShops(`${url_api}/api/v1/address_shop?city=${citySelect}`);

  // set quan_huyen default
  quan_huyens.value = [];
  cities.value.forEach((city) => {
    if (city.name === citySelect) {
      quan_huyens.value = city.quan_huyen;
    }
  });
};

// Handle change select option quan_huyen address
const changeSelectQuanHuyen = async (event) => {
  const valueOption = event.target.value;
  await getAddressShops(
    `${url_api}/api/v1/address_shop?city=${citySelect}&quan_huyen=${valueOption}`
  );
};
// End handle address shops

// Handle show dropdown header
function showDropdown(dropDownName) {
  for (let dropDownItem in listDropDown.value) {
    if (dropDownItem === dropDownName) {
      // Handle emit event to App.vue
      if (listDropDown.value[dropDownItem] === true) {
        setModalBackground(false);
        listDropDown.value[dropDownItem] = false;
      } else {
        setModalBackground(true);
        listDropDown.value[dropDownItem] = true;
      }
    } else {
      listDropDown.value[dropDownItem] = false;
    }
  }
}

// Handle close dropdown
function closeDropdown(dropDownName) {
  listDropDown.value[dropDownName] = false;
  // Handle emit event to App.vue
  setModalBackground(false);
}

// Handle login dropdown top header form
const email = ref("");
const password = ref("");
const responseLoginErrors = ref([]);

const submitFormLogin = async () => {
  responseLoginErrors.value = [];
  // Call service login
  try {
    const data = await login({
      email: email.value,
      password: password.value,
      urlApi: `${url_api}/api/v1/auth/login`,
    });
    // store localstorage
    localStorage.setItem("wdsmart_user", JSON.stringify(data.metadata?.user));
    window.location.href = "/";
  } catch (error) {
    responseLoginErrors.value.push(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
  }
};

// Handle logout
function logout() {
  localStorage.removeItem("wdsmart_user");
  location.reload();
}

// get cart
const getCartInfo = async () => {
  if (user) {
    try {
      const foundCart = await getCart(`${url_api}/api/v1/cart/${user._id}`);
      cart.value = foundCart;
    } catch (error) {
      $toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
        position: "top",
      });
    }
  }
};

// Handle remove item cart
const removeItemCart = async (cartId, cartItemId) => {
  // call service remove cart
  try {
    const res = await removeItem({
      cartId,
      cartItemId,
      urlApi: `${url_api}/api/v1/cart/removeItem`,
    });
    if (res.status === 200) {
      // refresh cart header
      await getCartInfo();
      setRefreshCart(true);
    } else {
      $toast.error("Đã xảy ra lỗi.", {
        position: "top-right",
      });
    }
  } catch (error) {
    $toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
      position: "top",
    });
  }
};

// Handle enter form search
const submitSearch = () => {
  if (search.input !== "") {
    router.push({ path: `/search/result/${search.input}` });
  }
};

onMounted(async () => {
  await getAddressShops(`${url_api}/api/v1/address_shop`);
  await getCartInfo();
});
</script>
