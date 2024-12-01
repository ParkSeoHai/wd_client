<template>
  <div class="background"></div>
  <Breadcrumb class="position-absolute z-3" :breadcrumb-active="'Tài khoản'" />
  <div class="mb-4" style="min-height: 400px">
    <div class="cloud x1"></div>
    <div class="cloud x2"></div>
    <div class="cloud x3"></div>
    <div class="cloud x4"></div>
    <div class="cloud x5"></div>
    <div class="user-account__block">
      <!-- Left -->
      <div class="user-account__block--left bg-color-white">
        <div class="block__left--header">
          <div class="user__avatar">
            <img v-if="userInfo.avatar" :src="userInfo.avatar" :alt="userInfo.name" />
            <span v-else :style="{ background: textPicture.backgroundColor }">{{
              textPicture.text
            }}</span>
          </div>
          <div class="user__infor">
            <p class="user__infor--name">
              {{ userInfo.name }}
            </p>
            <p class="user__infor--email">{{ userInfo.email }}</p>
          </div>
        </div>
        <div class="block__left--body">
          <ul class="block__left--category">
            <li
              class="block__left--item"
              :class="{ active: tabActive === 0 }"
              @click="tabActive = 0"
            >
              <button class="block__left--link">
                <i class="bi bi-person-fill block__left--icon"></i>
                <span class="ms-3">Thông tin cá nhân</span>
              </button>
            </li>
            <li
              class="block__left--item"
              :class="{ active: tabActive === 1 }"
              @click="tabActive = 1"
            >
              <button class="block__left--link">
                <i class="bi bi-box2-heart-fill block__left--icon"></i>
                <span class="ms-3">Sản phẩm yêu thích</span>
              </button>
            </li>
            <li
              class="block__left--item"
              :class="{ active: tabActive === 2 }"
              @click="tabActive = 2"
            >
              <button class="block__left--link">
                <i class="bi bi-box-fill block__left--icon"></i>
                <span class="ms-3">Đơn hàng</span>
              </button>
            </li>
            <li
              class="block__left--item"
              :class="{ active: tabActive === 3 }"
              @click="tabActive = 3"
            >
              <button class="block__left--link">
                <i class="bi bi-house-fill block__left--icon"></i>
                <span class="ms-3">Địa chỉ giao hàng</span>
              </button>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right -->
      <div class="user-account__block--right user-account__order--right">
        <!-- Tab 0 - infor -->
        <div class="bg-color-white" v-if="tabActive == 0">
          <h2 class="block-right__header">Thông tin tài khoản</h2>
          <div class="block-right__body">
            <div class="block-right__item">
              <label for="name" class="block-right__label">Họ và tên</label>
              <input
                type="text"
                id="name"
                class="block-right__input"
                placeholder="Nhập họ và tên tên"
                v-model="userInfo.name"
              />
            </div>
            <div class="block-right__item">
              <label class="block-right__label">Giới tính</label>
              <div class="d-flex align-items-center">
                <div class="block-right__radio">
                  <input
                    type="radio"
                    id="male"
                    name="gender"
                    value="0"
                    v-model="userInfo.gender"
                  />
                  <label for="male">Nam</label>
                </div>
                <div class="block-right__radio">
                  <input
                    type="radio"
                    id="female"
                    name="gender"
                    value="1"
                    v-model="userInfo.gender"
                  />
                  <label for="female">Nữ</label>
                </div>
              </div>
            </div>
            <div class="block-right__item">
              <label for="email" class="block-right__label">Email</label>
              <input
                type="email"
                id="email"
                class="block-right__input"
                placeholder="Nhập Email"
                disabled
                :value="userInfo.email"
              />
            </div>
            <div class="block-right__item">
              <label for="phoneNumber" class="block-right__label">Số điện thoại</label>
              <input
                type="text"
                id="phoneNumber"
                class="block-right__input"
                placeholder="Nhập số điện thoại"
                v-model="userInfo.phone_number"
              />
            </div>
            <div class="block-right__item">
              <label for="birthday" class="block-right__label">Ngày sinh</label>
              <input
                type="date"
                id="birthday"
                v-model="userInfo.birthday"
                class="block-right__input"
              />
            </div>
            <div class="text-center">
              <button @click.prevent="updateInfoUser" class="btn-base block-right__btn">
                Cập nhật
              </button>
            </div>
          </div>
        </div>
        <!-- Tab 1 - favourite -->
        <div class="bg-color-white" v-else-if="tabActive == 1">
          <div v-if="favorite" class="favorite-tab">
            <div class="list-product">
              <product-item
                v-for="product in favorite.favorite_items"
                :product="product"
                :key="product._id"
              />
            </div>
          </div>
          <div v-else>
            <p>
              Bạn chưa có đơn hàng nào. Mời bạn mua thêm sản phẩm
              <router-link to="/all">tại đây</router-link>.
            </p>
          </div>
        </div>
        <!-- Tab 2 - order -->
        <div v-else-if="tabActive == 2">
          <div class="order-tab">
            <div class="order-group">
              <div class="order-group__header bg-color-white">
                <div class="order-group__nav--group">
                  <ul class="order-group__nav">
                    <li
                      @click="getOrder(), (tabOrderActive = 0)"
                      :class="{ active: tabOrderActive === 0 }"
                      class="order-group__nav--item"
                    >
                      Tất cả
                    </li>
                    <li
                      @click="getOrder('Chờ xử lý'), (tabOrderActive = 1)"
                      :class="{ active: tabOrderActive === 1 }"
                      class="order-group__nav--item"
                    >
                      Chờ xử lý
                    </li>
                    <li
                      @click="getOrder('Đã xác nhận'), (tabOrderActive = 2)"
                      :class="{ active: tabOrderActive === 2 }"
                      class="order-group__nav--item"
                    >
                      Đã xác nhận
                    </li>
                    <li
                      @click="getOrder('Đang giao hàng'), (tabOrderActive = 3)"
                      :class="{ active: tabOrderActive === 3 }"
                      class="order-group__nav--item"
                    >
                      Đang giao hàng
                    </li>
                    <li
                      @click="getOrder('Hoàn thành'), (tabOrderActive = 4)"
                      :class="{ active: tabOrderActive === 4 }"
                      class="order-group__nav--item"
                    >
                      Hoàn thành
                    </li>
                  </ul>
                </div>

                <div class="order-search">
                  <div class="input-group flex-nowrap">
                    <span class="input-group-text"><i class="bi bi-search"></i></span>
                    <input
                      type="text"
                      class="form-control"
                      placeholder="Bạn có thể tìm kiếm theo tên đơn hàng"
                    />
                  </div>
                </div>
              </div>
              <div class="order-group__body">
                <div v-if="orders.length > 0">
                  <div class="order-products">
                    <div
                      v-for="order in orders"
                      :key="order._id"
                      class="order-products__item bg-color-white"
                    >
                      <div class="order-products__item--header">
                        <span class="status__text">{{ order.status }}</span>
                      </div>
                      <div class="order-products__item--body">
                        <ul class="list-cart">
                          <!-- Item -->
                          <li
                            v-for="item in order.order_items"
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
                                  {{ item.option.option_value }}
                                  <span v-if="item.option.sub_option">
                                    / {{ item.option.sub_option?.option_value }}</span
                                  >
                                </p>
                                <span class="product-quantity"
                                  >SL: {{ item.quantity }}</span
                                >
                              </div>
                              <div class="box-prices">
                                <del class="product-price__del">
                                  {{ formatter(item.product_price) }}
                                </del>
                                <p class="product-price">
                                  {{ formatter(item.product_price_sale) }}
                                </p>
                              </div>
                            </div>
                          </li>
                        </ul>
                        <div class="order-total__price">
                          Thành tiền:
                          <span>{{ formatter(order.total_amount) }}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                <div class="order-empty bg-color-white" v-else>
                  <p>Bạn chưa có đơn hàng nào.</p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <!-- Tab 3 - address -->
        <div class="bg-color-white" v-else>
          <div class="block-right__address">
            <div class="block-right__address--header">
              <p class="block-right__header">Địa chỉ của tôi</p>
              <button
                class="btn-base block-right__address--btn"
                :disabled="userInfo.address.length >= 5"
                @click="showModalAddAddress(null)"
              >
                <i class="bi bi-plus"></i>
                <span>Thêm địa chỉ mới</span>
              </button>
            </div>
            <!-- List address -->
            <div class="list-address" v-if="userInfo.address.length > 0">
              <!-- Item -->
              <div
                class="customer-address address-item"
                v-for="item in userInfo.address"
                :key="item._id"
              >
                <!-- Left -->
                <div class="left">
                  <div class="address-item__header">
                    <p class="name">{{ item.name }}</p>
                    <p class="phone">{{ item.phone_number }}</p>
                  </div>
                  <div class="address-item__body">
                    <p class="address">
                      {{ item.detail }}
                    </p>
                    <p v-if="item.default" class="address-default">Mặc định</p>
                  </div>
                </div>
                <!-- Right -->
                <div class="right">
                  <p @click.prevent="showModalAddAddress(item._id)">Cập nhật</p>
                  <p @click.prevent="showModalDelAddress(item._id)">Xóa</p>
                </div>
              </div>
            </div>
            <div v-else class="address-empty">
              <p class="text-center mt-5">
                Bạn chưa có địa chỉ nào. Mời bạn thêm địa chỉ mới.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
  <!-- Modal add new address -->
  <div class="modal-address modal-new__address" v-if="listModalAccount.modalAddAddress">
    <p v-if="idAddressUpdate" class="modal-new__address--header">Cập nhật địa chỉ</p>
    <p v-else class="modal-new__address--header">Địa chỉ mới</p>
    <form @submit.prevent="addCustomerAddress" class="modal-new__address--form">
      <div class="modal-address__group-input">
        <input
          type="text"
          class="form-control"
          placeholder="Họ và tên"
          required
          v-model="addressCustomer.name"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Số điện thoại"
          required
          v-model="addressCustomer.phone_number"
        />
      </div>
      <div class="mt-4 modal-address__group-input">
        <input
          type="text"
          class="form-control"
          placeholder="Tỉnh/ Thành phố"
          required
          v-model="addressCustomer.city"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Quận/Huyện"
          required
          v-model="addressCustomer.quan_huyen"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Phường/Xã"
          required
          v-model="addressCustomer.xa_phuong"
        />
      </div>
      <div class="mt-4 modal-address__group-input">
        <input
          type="text"
          class="form-control"
          placeholder="Địa chỉ cụ thể"
          required
          v-model="addressCustomer.detail"
        />
      </div>
      <div class="form-check d-flex align-items-center modal-new__address--checkbox">
        <input
          class="form-check-input"
          type="checkbox"
          id="defaultAddress"
          v-model="addressCustomer.default"
        />
        <label class="form-check-label" for="defaultAddress"
          >Đặt làm địa chỉ mặc định</label
        >
      </div>
      <div class="modal-address__actions mt-5">
        <button class="btn-base btn-left" @click.prevent="closeModalAddAddress">
          <span>Trở lại</span>
        </button>
        <button class="btn-base btn-right" type="submit">
          <span>Lưu</span>
        </button>
      </div>
    </form>
  </div>
  <!-- Modal confirm delete address -->
  <div class="modal-address modal-del__address" v-if="listModalAccount.modalDelAddress">
    <p class="modal-del__address">Bạn có chắc muốn xoá địa chỉ này?</p>
    <div class="modal-address__actions mt-5">
      <button
        class="btn-base btn-left"
        @click.prevent="
          setModalBackground(false),
            (listModalAccount.modalDelAddress = false),
            (addressCustomer._id = null)
        "
      >
        <span>TRỞ LẠI</span>
      </button>
      <button class="btn-base btn-right">
        <span @click="confirmDelAddress">XÓA</span>
      </button>
    </div>
  </div>
</template>

<script setup>
import Breadcrumb from "@/components/Breadcrumb.vue";
import ProductItem from "@/components/ProductItem.vue";
import { formatter } from "@/service/Common";
import axios from "axios";
import { computed, inject, onMounted, reactive, ref, watch } from "vue";
import { useToast } from "vue-toast-notification";

const $toast = useToast();

const urlApi = inject("url_api");

// inject from app.vue
const user = inject("user");
const listModalAccount = inject("listModalAccount");
const setModalBackground = inject("setModalBackground");

const userInfo = ref({});
const favorite = ref(null);
const orders = ref([]);

const textPicture = computed(() => {
  if (userInfo.value.name) {
    const nameArr = userInfo.value.name.split(" ", 3);
    let txtAvatar = "";
    nameArr.forEach((txt) => {
      if (txt !== "") txtAvatar += txt.slice(0, 1);
    });
    const bgArr = ["#563d78", "#e15026", "#1877f2", "#016f35"];
    const random = Math.floor(Math.random() * bgArr.length);
    return {
      text: txtAvatar,
      backgroundColor: bgArr[random],
    };
  }
  return "AVT";
});

// Handle tabs
const tabActive = ref(0);
const tabOrderActive = ref(0);

// watch change tab
watch(tabActive, async () => {
  // get favorite
  if (tabActive.value === 1) {
    favorite.value = await getFavorite();
  }
  // order
  if (tabActive.value === 2) {
    await getOrder();
    tabOrderActive.value = 0;
  }
});

// get account user
const getAccount = async () => {
  if (!user) {
    window.location.href = "/";
  }
  const response = await axios.get(`${urlApi}/api/v1/user/account/${user._id}`);
  userInfo.value = response.data.metadata.user;
  resetAddressCustomer();
};

// update info user
const updateInfoUser = async () => {
  const { _id, birthday, gender, name, phone_number } = userInfo.value;
  // call api server
  try {
    const response = await axios.post(`${urlApi}/api/v1/user/account/update`, {
      _id,
      birthday,
      gender,
      name,
      phone_number,
    });
    userInfo.value = response.data.metadata.user;
    $toast.success(response.data.message, {
      position: "top",
    });
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

// Handle add new address
const addressCustomer = reactive({
  _id: null,
  name: "",
  phone_number: "",
  city: "",
  quan_huyen: "",
  xa_phuong: "",
  detail: "",
  default: false,
});

// Handle update user address
const showModalAddAddress = (addressId = null) => {
  addressCustomer._id = addressId;
  setModalBackground(true);
  listModalAccount.value.modalAddAddress = true;
  // update
  if (addressId !== null) {
    // find address by id
    const foundAddress = userInfo.value.address.find(
      (item) => item._id.toString() === addressId.toString()
    );
    if (foundAddress) {
      addressCustomer.name = foundAddress.name;
      addressCustomer.phone_number = foundAddress.phone_number;
      addressCustomer.city = foundAddress.city;
      addressCustomer.quan_huyen = foundAddress.quan_huyen;
      addressCustomer.xa_phuong = foundAddress.xa_phuong;
      addressCustomer.detail = foundAddress.detail;
      addressCustomer.default = foundAddress.default;
    } else {
      console.error("error");
    }
  }
};

const closeModalAddAddress = () => {
  listModalAccount.modalAddAddress = false;
  setModalBackground(false);
  resetAddressCustomer();
};

// Handle delete user address
const showModalDelAddress = (addressId) => {
  addressCustomer._id = addressId;
  setModalBackground(true);
  listModalAccount.value.modalDelAddress = true;
};

const confirmDelAddress = async () => {
  if (addressCustomer._id !== null) {
    // call api remove
    try {
      const response = await axios.post(`${urlApi}/api/v1/user/customerAddress/remove`, {
        userId: user._id,
        addressId: addressCustomer._id,
      });
      // success
      userInfo.value.address = response.data.metadata.address;
      addressCustomer._id = null;
      setModalBackground(false);
      listModalAccount.modalDelAddress = false;
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
  } else {
    $toast.error("Đã xảy ra lỗi. Vui lòng thử lại.", {
      position: "top-right",
    });
  }
};

// reset value input add address
const resetAddressCustomer = () => {
  addressCustomer._id = null;
  addressCustomer.name = userInfo.value.name;
  addressCustomer.phone_number = userInfo.value.phone_number;
  addressCustomer.city = "";
  addressCustomer.quan_huyen = "";
  addressCustomer.xa_phuong = "";
  addressCustomer.detail = "";
  addressCustomer.default = false;
};

// add / update customer address
const addCustomerAddress = async () => {
  let url = "";
  let data = {};
  if (addressCustomer._id !== null) {
    // update
    url = `${urlApi}/api/v1/user/customerAddress/update`;
    data = {
      userId: user._id,
      addressItem: addressCustomer,
    };
  } else {
    // add
    url = `${urlApi}/api/v1/user/customerAddress`;
    // get address detail
    addressCustomer.detail += `, ${addressCustomer.xa_phuong}, ${addressCustomer.quan_huyen}, ${addressCustomer.city}, Việt Nam`;
    data = {
      userId: user._id,
      addressItem: addressCustomer,
    };
  }

  // call api server
  try {
    const response = await axios.post(url, data);
    userInfo.value.address = response.data.metadata.address;
    setModalBackground(false);
    listModalAccount.modalAddAddress = false;
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
  }
};

// handle product favorite
const getFavorite = async () => {
  const res = await axios.get(
    `${urlApi}/api/v1/customer/favorite/${user._id}?p=1&limit=10`
  );
  return res.data.metadata;
};

// get order
const getOrder = async (status = "") => {
  const res = await axios.get(`${urlApi}/api/v1/order/${user._id}?status=${status}`);
  orders.value = res.data.metadata;
};

onMounted(async () => {
  setModalBackground(false);
  await getAccount();
});
</script>
