<script setup>
import { computed, inject, onMounted, reactive, ref } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { getCart } from "@/service/CartService";
import { useToast } from "vue-toast-notification";
import { formatter } from "@/service/Common";
import axios from "axios";

const $toast = useToast();

const urlApi = inject("url_api");
const user = inject("user");
const listModalOrder = inject("listModalOrder");
const setModalBackground = inject("setModalBackground");

// get props from router
const { userId } = defineProps(["userId"]);

const cart = ref({
  cart_items: [],
});

const userInfo = ref({
  address: [],
});

const loading = ref(false);
const orderNote = ref("");
const orderPriceShipping = ref(15000);
// payment method
const paymentMethods = ref([
  {
    img: "/src/assets/images/cod.svg",
    text: "Thanh toán khi giao hàng (COD)",
    value: "Thanh toán khi nhận hàng",
    active: true,
  },
  {
    img: "/src/assets/images/order-method-card.svg",
    text: "Chuyển khoản qua ngân hàng",
    value: "Chuyển khoản qua ngân hàng",
    active: false,
  },
]);

const handleActiveMethod = (index) => {
  paymentMethods.value = paymentMethods.value.map((item, i) => {
    if (i === index) item.active = true;
    else item.active = false;
    return item;
  });
};

// model address customer
const loadingModal = ref(false);
const addressCustomerModel = reactive({
  _id: null,
  name: "",
  phone_number: "",
  city: "",
  quan_huyen: "",
  xa_phuong: "",
  detail: "",
  default: false,
});

// id address shipping active
const addressIdActive = ref(null);

// `computed` để tính giá trị dựa trên `selectedAddressId` hoặc địa chỉ mặc định
const addressShipping = computed(() => {
  if (userInfo.value && Array.isArray(userInfo.value.address)) {
    // Nếu có `selectedAddressId`, trả về địa chỉ được chọn
    if (addressIdActive.value) {
      return (
        userInfo.value.address.find((item) => item._id === addressIdActive.value) || null
      );
    }
    // Nếu không có, trả về địa chỉ mặc định
    return userInfo.value.address.find((item) => item.default === true) || null;
  }
  return null;
});

// get cart
const getCartInfo = async () => {
  if (userId === user._id) {
    try {
      const foundCart = await getCart(`${urlApi}/api/v1/cart/${userId}`);
      cart.value = foundCart;
    } catch (error) {
      $toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
        position: "top",
      });
    }
  }
};

// get infor user
const getInfoUser = async () => {
  const response = await axios.get(`${urlApi}/api/v1/user/account/${userId}`);
  userInfo.value = response.data.metadata.user;
  resetAddressCustomer();
};

// Change address ship active
const changeSelectAddress = (addressId) => {
  if (addressId) {
    addressIdActive.value = addressId;
  }
};

// Show modal add / updte address customer
const showModalAddAddress = (addressId) => {
  resetAddressCustomer();
  // find address
  if (addressId) {
    const foundAddress = userInfo.value.address.find((item) => item._id === addressId);
    if (foundAddress) {
      addressCustomerModel._id = foundAddress._id;
      addressCustomerModel.name = foundAddress.name;
      addressCustomerModel.phone_number = foundAddress.phone_number;
      addressCustomerModel.city = foundAddress.city;
      addressCustomerModel.quan_huyen = foundAddress.quan_huyen;
      addressCustomerModel.xa_phuong = foundAddress.xa_phuong;
      addressCustomerModel.detail = foundAddress.detail;
      addressCustomerModel.default = foundAddress.default;
    }
  }
  listModalOrder.value.modalAddAddressShipping = true;
};

// reset data addressCustomerModel
const resetAddressCustomer = () => {
  addressCustomerModel._id = null;
  addressCustomerModel.name = userInfo.value.name;
  addressCustomerModel.phone_number = userInfo.value.phone_number;
  addressCustomerModel.city = "";
  addressCustomerModel.quan_huyen = "";
  addressCustomerModel.xa_phuong = "";
  addressCustomerModel.detail = "";
  addressCustomerModel.default = false;
};

// Add / update customer address
const submitAddAddress = async () => {
  console.log(addressCustomerModel);
  let url = "";
  let data = {};
  if (addressCustomerModel._id !== null) {
    // update
    url = `${urlApi}/api/v1/user/customerAddress/update`;
    data = {
      userId: userInfo.value._id,
      addressItem: addressCustomerModel,
    };
  } else {
    // add
    url = `${urlApi}/api/v1/user/customerAddress`;
    // get address detail
    addressCustomerModel.detail += `, ${addressCustomerModel.xa_phuong}, ${addressCustomerModel.quan_huyen}, ${addressCustomerModel.city}, Việt Nam`;
    data = {
      userId: userInfo.value._id,
      addressItem: addressCustomerModel,
    };
  }

  // call api server
  try {
    loadingModal.value = true;
    const response = await axios.post(url, data);
    userInfo.value.address = response.data.metadata.address;
    listModalOrder.value.modalAddAddressShipping = false;
    // active address shipping
    if (addressCustomerModel._id) changeSelectAddress(addressCustomerModel._id);
    else
      changeSelectAddress(userInfo.value.address[userInfo.value.address.length - 1]._id);
    resetAddressCustomer();
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
  } finally {
    loadingModal.value = false;
  }
};

// Submit order
const addOrder = async () => {
  if (!addressShipping.value) {
    $toast.default("Vui lòng chọn địa chỉ giao hàng", {
      position: "top",
    });
    listModalOrder.value.modalChangeAddressShipping = true;
    setModalBackground(true);
    return;
  }

  const paymentMethod = paymentMethods.value.find((item) => item.active === true);

  // get data order
  const dataPost = {
    userId,
    orderItems: cart.value.cart_items,
    orderNote: orderNote.value,
    paymentMethod: paymentMethod.value,
    addressShipping: addressShipping.value,
    priceShipping: orderPriceShipping.value,
  };
  try {
    loading.value = true;
    const response = await axios.post(`${urlApi}/api/v1/order`, dataPost);
    if (response.data.status === 201) {
      $toast.success(response.data.message, {
        position: "top",
      });
    }
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
  } finally {
    loading.value = false;
  }
};

onMounted(async () => {
  setModalBackground(false);
  await getCartInfo();
  await getInfoUser();
});
</script>

<template>
  <breadcrumb breadcrumb-active="Thông tin giao hàng" />
  <section id="order-template">
    <div class="row bg-color-white w-100 mx-auto">
      <div class="col-lg-6 col-md-12 order-left ps-0">
        <div class="group-address">
          <h2 class="title">
            <span><i class="bi bi-geo-alt icon"></i></span>
            Địa chỉ giao hàng
          </h2>
          <div class="address-shipping">
            <div v-if="addressShipping" class="left">
              <div class="address-item__header">
                <p class="name">{{ addressShipping.name }}</p>
                <p class="phone">{{ addressShipping.phone_number }}</p>
              </div>
              <div class="address-item__body">
                <p class="address">D/c: {{ addressShipping.detail }}</p>
                <p v-if="addressShipping.default" class="address-default">Mặc định</p>
              </div>
            </div>
            <div class="right">
              <button
                @click.prevent="
                  setModalBackground(true),
                    (listModalOrder.modalChangeAddressShipping = true)
                "
                class="btn-change__address"
              >
                Thay đổi
              </button>
            </div>
          </div>
        </div>
        <div class="order-method">
          <p class="title">Phương thức thanh toán</p>
          <div class="order-list">
            <div
              v-for="(item, index) in paymentMethods"
              :key="index"
              class="order-item"
              :class="{ active: item.active }"
              @click="handleActiveMethod(index)"
            >
              <img :src="item.img" :alt="item.text" class="order-item__img" />
              <p class="order-item__text">{{ item.text }}</p>
              <span class="order-item__icon--active">
                <i class="bi bi-check"></i>
              </span>
            </div>
          </div>
        </div>
        <div class="shop-voucher d-none">
          <h2 class="title">
            <span><i class="bi bi-ticket-perforated icon"></i></span>
            Voucher
            <button
              @click="(listModalOrder.modalListVoucher = true), setModalBackground(true)"
              class="title-btn"
            >
              Chọn voucher
            </button>
          </h2>
        </div>
      </div>
      <div class="col-lg-6 col-md-12 order-right">
        <p class="title">Sản phẩm</p>
        <template v-if="cart.cart_items.length > 0">
          <ul class="list-cart">
            <!-- Item -->
            <li
              v-for="item in cart.cart_items"
              :key="item._id"
              class="product-cart item-cart d-flex align-items-center justify-content-between"
            >
              <div class="cart-product w-100 d-flex align-items-center">
                <img
                  :src="item.product_thumb"
                  :alt="item.product_name"
                  class="img-thumb"
                />
                <div class="product-info w-100">
                  <p class="product-name">{{ item.product_name }}</p>
                  <p class="product-option">
                    {{ item.option?.option_value }}
                    <span v-if="item.option.sub_option">
                      / {{ item.option.sub_option?.option_value }}</span
                    >
                  </p>
                  <span class="product-quantity">SL: {{ item.quantity }}</span>
                </div>
                <p class="product-price">{{ formatter(item.product_price_sale) }}</p>
              </div>
            </li>
          </ul>
          <div class="block-note">
            <p class="note-label">Ghi chú đơn hàng</p>
            <v-textarea
              row-height="25"
              rows="2"
              variant="outlined"
              auto-grow
              shaped
              placeholder="Ghi chú"
              class="block-note__input"
              v-model.trim="orderNote"
            ></v-textarea>
          </div>
          <div class="order-summary">
            <div class="order-summary__overview">
              <div class="order-summary__line">
                <span>Tạm tính</span>
                <span>{{ formatter(cart.total_price) }}</span>
              </div>
              <div class="order-summary__line">
                <span>Phí vận chuyển</span>
                <span>{{ formatter(orderPriceShipping) }}</span>
              </div>
            </div>
            <div class="order-summary__total--price">
              <div class="order-summary__line">
                <span>Tổng thanh toán</span>
                <span class="total-price">{{
                  formatter(cart.total_price + orderPriceShipping)
                }}</span>
              </div>
            </div>
          </div>
          <div class="group-bottom">
            <router-link to="/gio-hang" class="group-bottom__link">Giỏ hàng</router-link>
            <button
              @click.prevent="addOrder"
              class="btn group-bottom__btn"
              :class="{ disabled: loading }"
            >
              <v-progress-circular
                v-if="loading"
                :size="25"
                color="#fff"
                indeterminate
              ></v-progress-circular>
              Đặt hàng
            </button>
          </div>
        </template>
      </div>
    </div>
    <!-- Modal show list address customer -->
    <div
      v-if="listModalOrder.modalChangeAddressShipping"
      class="modal-order modal-list__address--customer"
    >
      <div class="modal-order__header">
        <p class="title">Địa chỉ của tôi</p>
        <button
          v-if="userInfo.address.length < 5"
          @click="showModalAddAddress(null)"
          class="modal-order__btn primary"
        >
          <i class="bi bi-plus icon"></i>
          <span class="text">Thêm địa chỉ mới</span>
        </button>
      </div>
      <div class="modal-order__body">
        <!-- List address -->
        <div class="list-address" v-if="userInfo.address.length > 0">
          <!-- Item -->
          <div
            v-for="address in userInfo.address"
            :key="address._id"
            class="customer-address address-item"
          >
            <!-- Left -->
            <div class="left address-item__left">
              <input
                class="form-check-input"
                type="radio"
                name="addressShipping"
                :id="address._id"
                value="option1"
                :checked="address._id === addressShipping._id"
                @change="changeSelectAddress(address._id)"
              />
              <label :for="address._id">
                <div class="address-item__header">
                  <p class="name">{{ address.name }}</p>
                  <p class="phone">{{ address.phone_number }}</p>
                </div>
                <div class="address-item__body">
                  <p class="address">
                    {{ address.detail }}
                  </p>
                  <p v-if="address.default" class="address-default">Mặc định</p>
                </div>
              </label>
            </div>
            <!-- Right -->
            <div class="right">
              <p @click.prevent="showModalAddAddress(address._id)">Cập nhật</p>
            </div>
          </div>
        </div>
        <div v-else>
          <p class="list-address__empty">
            Bạn chưa có địa chỉ nào. Mời bạn thêm địa chỉ mới để thực hiện đặt hàng
          </p>
        </div>
        <div v-if="loadingModal" class="modal-order__body--loading">
          <v-progress-circular
            :size="40"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
      <div class="modal-order__bottom">
        <button
          @click="
            (listModalOrder.modalChangeAddressShipping = false), setModalBackground(false)
          "
          class="modal-order__btn"
        >
          Hủy
        </button>
      </div>
    </div>
    <!-- Modal add new address -->
    <div
      v-if="listModalOrder.modalAddAddressShipping"
      class="modal-order modal-add__address--customer"
    >
      <div class="modal-order__header">
        <p class="title">Địa chỉ mới</p>
      </div>
      <form @submit.prevent="submitAddAddress" class="modal-new__address--form">
        <div class="modal-order__body">
          <div class="modal-address__group-input">
            <input
              type="text"
              class="form-control"
              placeholder="Họ và tên"
              required
              v-model.trim="addressCustomerModel.name"
            />
            <input
              type="text"
              class="form-control"
              placeholder="Số điện thoại"
              required
              v-model.trim="addressCustomerModel.phone_number"
            />
          </div>
          <div class="mt-4 modal-address__group-input">
            <input
              type="text"
              class="form-control"
              placeholder="Tỉnh/ Thành phố"
              required
              v-model.trim="addressCustomerModel.city"
            />
            <input
              type="text"
              class="form-control"
              placeholder="Quận/Huyện"
              required
              v-model.trim="addressCustomerModel.quan_huyen"
            />
          </div>
          <div class="mt-4 modal-address__group-input">
            <input
              type="text"
              class="form-control"
              placeholder="Phường/Xã"
              required
              v-model.trim="addressCustomerModel.xa_phuong"
            />
          </div>
          <div class="mt-4 modal-address__group-input">
            <input
              type="text"
              class="form-control"
              placeholder="Địa chỉ cụ thể"
              required
              v-model.trim="addressCustomerModel.detail"
            />
          </div>
          <div
            class="form-check d-flex align-items-center mt-4 modal-new__address--checkbox"
          >
            <input
              class="form-check-input me-3"
              type="checkbox"
              id="defaultAddress"
              v-model="addressCustomerModel.default"
            />
            <label class="form-check-label mt-1" for="defaultAddress"
              >Đặt làm địa chỉ mặc định</label
            >
          </div>
          <div v-if="loadingModal" class="modal-order__body--loading">
            <v-progress-circular
              :size="40"
              color="primary"
              indeterminate
            ></v-progress-circular>
          </div>
        </div>
        <div class="modal-order__bottom">
          <button
            @click="listModalOrder.modalAddAddressShipping = false"
            class="modal-order__btn"
          >
            Hủy
          </button>
          <button type="submit" class="modal-order__btn primary">Lưu</button>
        </div>
      </form>
    </div>
    <!-- Modal show list voucher -->
    <div
      v-if="listModalOrder.modalListVoucher"
      class="modal-order modal-list__shop--voucher"
    >
      <div class="modal-order__header">
        <p class="title">Chọn Voucher</p>
      </div>
      <div class="modal-order__body">
        <!-- List address -->
        <div class="list-voucher"></div>
        <div v-if="loadingModal" class="modal-order__body--loading">
          <v-progress-circular
            :size="40"
            color="primary"
            indeterminate
          ></v-progress-circular>
        </div>
      </div>
      <div class="modal-order__bottom">
        <button
          @click="(listModalOrder.modalListVoucher = false), setModalBackground(false)"
          class="modal-order__btn"
        >
          Hủy
        </button>
        <button class="modal-order__btn primary">OK</button>
      </div>
    </div>
  </section>
</template>
