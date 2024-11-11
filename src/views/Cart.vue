<script setup>
import { inject, onMounted, ref, watch } from "vue";
import { formatter } from "@/service/Common.js";
import { useToast } from "vue-toast-notification";
import { getCart, removeItem, updateQuantityItem } from "@/service/CartService";
import Breadcrumb from "@/components/Breadcrumb.vue";

const $toast = useToast();

// inject data from App.vue
const user = inject("user");
const urlApi = inject("url_api");

const cart = ref({
  cart_items: [],
  total_price: 0,
  total_quantity: 0,
});

const refreshCartStatus = inject("refreshCartStatus");
const setRefreshCart = inject("setRefreshCart");

watch(refreshCartStatus, async () => {
  if (refreshCartStatus.value) {
    await getCartInfo();
    setRefreshCart(false);
  }
});

// get cart
const getCartInfo = async () => {
  if (user) {
    try {
      const foundCart = await getCart(`${urlApi}/api/v1/cart/${user._id}`);
      cart.value = foundCart;
    } catch (error) {
      $toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
        position: "top-right",
      });
    }
  }
};

// Handle quantity cart
const updateQuantityItemCart = async (cartId, cartItemId, value) => {
  // call service update cart
  try {
    const res = await updateQuantityItem({
      cartId,
      cartItemId,
      value,
      urlApi: `${urlApi}/api/v1/cart/updateQuantityItem`,
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
      position: "top-right",
    });
  }
};

// Handle remove item cart
const removeItemCart = async (cartId, cartItemId) => {
  // call service remove cart
  try {
    const res = await removeItem({
      cartId,
      cartItemId,
      urlApi: `${urlApi}/api/v1/cart/removeItem`,
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
      position: "top-right",
    });
  }
};

onMounted(async () => {
  await getCartInfo();
});
</script>

<template>
  <Breadcrumb breadcrumb-active="Giỏ hàng" />
  <section id="cart-template" class="cart-page">
    <div class="row">
      <div class="col-9">
        <div class="cart-left bg-color-white">
          <div class="cart-title">
            <h2>Giỏ hàng:</h2>
            <span class="cart-count">{{ cart.total_quantity || 0 }} sản phẩm</span>
          </div>
          <div class="cart-list" v-if="cart.cart_items.length > 0">
            <!-- Item -->
            <div class="cart-item" v-for="item in cart.cart_items" :key="item._id">
              <div class="d-flex cart-item__info--product">
                <div class="cart-item__img">
                  <router-link :to="`/san-pham/${item.product_url}`">
                    <img :src="item.product_thumb" :alt="item.product_name" />
                  </router-link>
                </div>
                <div class="cart-item__info">
                  <h3 class="cart-item__info--title">
                    <router-link :to="`/san-pham/${item.product_url}`">{{
                      item.product_name
                    }}</router-link>
                  </h3>
                  <div class="cart-item__group--option">
                    <p class="item-option">
                      {{
                        `${item.option?.option_value} / ${item.option.sub_option?.option_value}`
                      }}
                    </p>
                    <p class="item-option item-option__price">
                      {{ formatter(item.price_at_added) }}
                    </p>
                  </div>
                </div>
              </div>
              <div class="cart-item__qty">
                <div class="selector-actions">
                  <div
                    class="quantity-area d-flex align-items-center justify-content-between"
                  >
                    <button
                      type="button"
                      @click.prevent="updateQuantityItemCart(cart._id, item._id, -1)"
                    >
                      -
                    </button>
                    <input
                      type="text"
                      min="1"
                      max="999"
                      readonly
                      :value="item.quantity"
                    />
                    <button
                      type="button"
                      @click.prevent="updateQuantityItemCart(cart._id, item._id, 1)"
                    >
                      +
                    </button>
                  </div>
                </div>
                <div class="cart-item__remove">
                  <span @click="removeItemCart(cart._id, item._id)">Xóa</span>
                </div>
              </div>
              <div class="cart-item__price">
                <span>{{ formatter(item.quantity * item.price_at_added) }}</span>
              </div>
            </div>
          </div>
          <div class="cart-empty" v-else>
            <span><i class="bi bi-cart2" style="font-size: 7rem"></i></span>
            <p class="mt-4">
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
            <span class="cart-total__price">{{ formatter(cart.total_price) }}</span>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
