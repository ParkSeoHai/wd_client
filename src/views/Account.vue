<template>
  <div class="background"></div>
  <Breadcrumb class="position-absolute z-3" :breadcrumb-active="breadcrumbActive" />
  <div style="height: 500px">
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
            <img
              v-if="userInfo.picture"
              :src="userInfo.picture"
              :alt="`${userInfo.firstName} ${userInfo.lastName}`"
            />
            <span v-else>{{ textPicture }}</span>
          </div>
          <div class="user__infor">
            <p class="user__infor--name">
              {{ userInfo.firstName }} {{ userInfo.lastName }}
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
              <a href="#" class="block__left--link">
                <i class="bi bi-person-fill block__left--icon"></i>
                <span class="ms-3">Thông tin cá nhân</span>
              </a>
            </li>
            <li
              class="block__left--item"
              :class="{ active: tabActive === 1 }"
              @click="tabActive = 1"
            >
              <a href="#" class="block__left--link">
                <i class="bi bi-box-fill block__left--icon"></i>
                <span class="ms-3">Đơn hàng của bạn</span>
              </a>
            </li>
            <li
              class="block__left--item"
              :class="{ active: tabActive === 2 }"
              @click="tabActive = 2"
            >
              <a href="#" class="block__left--link">
                <i class="bi bi-house-fill block__left--icon"></i>
                <span class="ms-3">Địa chỉ giao hàng</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
      <!-- Right -->
      <div class="user-account__block--right bg-color-white">
        <!-- Tab 0 -->
        <div v-if="tabActive == 0">
          <h2 class="block-right__header">Thông tin tài khoản</h2>
          <div class="block-right__body">
            <div class="block-right__item">
              <label for="name" class="block-right__label">Tên</label>
              <input
                type="text"
                id="name"
                class="block-right__input"
                placeholder="Nhập tên"
                v-model="userInfo.firstName"
              />
            </div>
            <div class="block-right__item">
              <label for="name" class="block-right__label">Họ đệm</label>
              <input
                type="text"
                id="name"
                class="block-right__input"
                placeholder="Nhập họ đệm"
                v-model="userInfo.lastName"
              />
            </div>
            <div class="block-right__item">
              <label class="block-right__label">Giới tính</label>
              <div class="d-flex align-items-center">
                <div class="block-right__radio">
                  <input type="radio" id="nam" name="sex" />
                  <label for="nam">Nam</label>
                </div>
                <div class="block-right__radio">
                  <input type="radio" id="nu" name="sex" />
                  <label for="nu">Nữ</label>
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
                readonly
                v-model="userInfo.email"
              />
            </div>
            <div class="block-right__item">
              <label for="phoneNumber" class="block-right__label">Số điện thoại</label>
              <input
                type="text"
                id="phoneNumber"
                class="block-right__input"
                placeholder="Nhập số điện thoại"
                v-model="userInfo.phoneNumber"
              />
            </div>
            <div class="block-right__item">
              <label for="birthday" class="block-right__label">Ngày sinh</label>
              <input type="date" id="birthday" class="block-right__input" value="" />
            </div>
            <div class="text-center">
              <button class="btn-base block-right__btn">Cập nhật</button>
            </div>
          </div>
        </div>
        <!-- Tab 1 -->
        <div v-else-if="tabActive == 1">
          <div class="block-right__table">
            <div class="table-responsive" v-if="userInfo.order">
              <table class="table">
                <thead>
                  <tr>
                    <th scope="col">Mã đơn hàng</th>
                    <th scope="col">Sản phẩm</th>
                    <th scope="col">Ngày đặt</th>
                    <th scope="col">Trạng thái thanh toán</th>
                    <th scope="col">Vận chuyển</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row">1</th>
                    <td>Mark</td>
                    <td>Otto</td>
                    <td>@mdo</td>
                  </tr>
                  <tr>
                    <th scope="row">2</th>
                    <td>Jacob</td>
                    <td>Thornton</td>
                    <td>@fat</td>
                  </tr>
                  <tr>
                    <th scope="row">3</th>
                    <td colspan="2">Larry the Bird</td>
                    <td>@twitter</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <div class="order-empty" v-else>
              <p>
                Bạn chưa có đơn hàng nào. Mời bạn mua thêm sản phẩm
                <router-link to="/all">tại đây</router-link>.
              </p>
            </div>
          </div>
        </div>
        <!-- Tab 2 -->
        <div v-else>
          <div class="block-right__address">
            <div class="block-right__address--header">
              <p class="block-right__header">Địa chỉ của tôi</p>
              <button
                class="btn-base block-right__address--btn"
                v-if="userInfo.customerAddresses.length <= 5"
                @click="(showModal = true), (showModalAddAddress = true)"
              >
                <i class="bi bi-plus"></i>
                <span>Thêm địa chỉ mới</span>
              </button>
            </div>
            <!-- List address -->
            <div class="list-address" v-if="userInfo.customerAddresses.length > 0">
              <!-- Item -->
              <div
                class="address-item"
                v-for="item in userInfo.customerAddresses"
                :key="item.id"
              >
                <!-- Left -->
                <div class="left">
                  <div class="address-item__header">
                    <p class="name">{{ item.customerName }}</p>
                    <p class="phone">{{ item.phoneNumber }}</p>
                  </div>
                  <div class="address-item__body">
                    <p class="address">
                      {{ item.address }}
                    </p>
                    <p v-if="item.isDefault" class="address-default">Mặc định</p>
                  </div>
                </div>
                <!-- Right -->
                <div class="right">
                  <p @click="updateAddress(item.id)">Cập nhật</p>
                  <p @click="delAddress(item.id)">Xóa</p>
                </div>
              </div>
              <!-- Item -->
              <!-- <div class="address-item">
                <div class="left">
                  <div class="address-item__header">
                    <p class="name">Nguyen Van Hai</p>
                    <p class="phone">0333301536</p>
                  </div>
                  <div class="address-item__body">
                    <p class="address">
                      Ktx Đn 4, Nguyễn Cơ Thạch, Phường Mỹ Đình 2 Phường Mỹ Đình 2, Quận Nam Từ
                      Liêm, Hà Nội
                    </p>
                  </div>
                </div>
                <div class="right">
                  <p>Cập nhật</p>
                  <p>Xóa</p>
                </div>
              </div> -->
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
  <div class="modal-address modal-new__address" v-if="showModalAddAddress">
    <p v-if="idAddressUpdate" class="modal-new__address--header">Cập nhật địa chỉ</p>
    <p v-else class="modal-new__address--header">Địa chỉ mới</p>
    <form @submit.prevent="addAddress" class="modal-new__address--form">
      <div class="d-flex align-items-center gap-4">
        <input
          type="text"
          class="form-control"
          placeholder="Họ và tên"
          required
          v-model="addressName"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Số điện thoại"
          required
          v-model="addressPhone"
        />
      </div>
      <div class="d-flex align-items-center gap-4 mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Tỉnh/ Thành phố"
          required
          v-model="addressCity"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Quận/Huyện"
          required
          v-model="addressDistrict"
        />
        <input
          type="text"
          class="form-control"
          placeholder="Phường/Xã"
          required
          v-model="addressWard"
        />
      </div>
      <div class="d-flex align-items-center gap-4 mt-4">
        <input
          type="text"
          class="form-control"
          placeholder="Địa chỉ cụ thể"
          required
          v-model="addressDetail"
        />
      </div>
      <div class="form-check d-flex align-items-center modal-new__address--checkbox">
        <input
          class="form-check-input"
          type="checkbox"
          id="defaultAddress"
          v-model="addressDefault"
        />
        <label class="form-check-label" for="defaultAddress"
          >Đặt làm địa chỉ mặc định</label
        >
      </div>
      <div class="modal-address__actions mt-5">
        <button
          class="btn-base btn-left"
          @click.prevent="(showModal = false), (showModalAddAddress = false)"
        >
          <span>Trở lại</span>
        </button>
        <button class="btn-base btn-right" type="submit">
          <span>Hoàn thành</span>
        </button>
      </div>
    </form>
  </div>
  <!-- Modal confirm delete address -->
  <div
    class="modal-address modal-del__address"
    v-if="showModalDelAddress && idAddressDel"
  >
    <p class="modal-del__address">Bạn có chắc muốn xoá địa chỉ này?</p>
    <div class="modal-address__actions mt-5">
      <button
        class="btn-base btn-left"
        @click.prevent="(showModal = false), (showModalDelAddress = false)"
      >
        <span>TRỞ LẠI</span>
      </button>
      <button class="btn-base btn-right">
        <span @click.prevent="confirmDel(idAddressDel)">XÓA</span>
      </button>
    </div>
  </div>
  <Modal v-if="showModal" @click="clickModal"></Modal>
</template>

<script setup>
import Modal from "@/components/Modal.vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { inject, onMounted, ref } from "vue";

// Breadcrumb
const breadcrumbActive = "Tài khoản";
// Router web api
const $route = inject("$route");
// Get text picture if user info is not picture
const textPicture = ref();
// Get email from local storage
const email = JSON.parse(localStorage.getItem("wdsmartuser")).email;

const userInfo = ref({});
// Handle tabs
const tabActive = ref(0);
const showModal = ref(false);
const showModalAddAddress = ref(false);
const showModalDelAddress = ref(false);

const clickModal = () => {
  showModal.value = false;
  showModalAddAddress.value = false;
  showModalDelAddress.value = false;
};

// Handle add new address
const addressName = ref();
const addressPhone = ref();
const addressCity = ref();
const addressDistrict = ref();
const addressWard = ref();
const addressDetail = ref();
const addressDefault = ref(false);

// const addAddress = async () => {
//   const router = `${$route}/Customer/AddCustomerAddress?email=${email}`
//   const data = {
//     customerName: addressName.value,
//     city: addressCity.value,
//     district: addressDistrict.value,
//     address: addressDetail.value + ', ' + addressWard.value + ', ' + addressDistrict.value + ', ' + addressCity.value,
//     phoneNumber: addressPhone.value,
//     isDefault: addressDefault.value
//   }
//   const response = await fetchApi(router, 'POST', data)
//   if (response.success) {
//     // If success, close modal, reset data form and fetch data
//     showModalAddAddress.value = false
//     showModal.value = false
//     addressName.value = null
//     addressPhone.value = null
//     addressCity.value = null
//     addressDistrict.value = null
//     addressWard.value = null
//     addressDetail.value = null
//     addressDefault.value = false
//     await fetchData()
//   } else {
//     alert(response.message)
//   }
// }

// Handle update user address
const idAddressUpdate = ref();
const updateAddress = (addressId) => {
  showModal.value = true;
  showModalAddAddress.value = true;
  idAddressUpdate.value = addressId;
};

// Handle delete user address
const idAddressDel = ref();

const delAddress = (addressId) => {
  showModalDelAddress.value = true;
  showModal.value = true;
  idAddressDel.value = addressId;
};

// const confirmDel = async (addressId) => {
//   const router = `${$route}/Customer/DeleteCustomerAddress?addressId=${addressId}`
//   const response = await fetchApi(router, 'DELETE')
//   if (response.success) {
//     showModalDelAddress.value = false
//     showModal.value = false
//     idAddressDel.value = null
//     await fetchData()
//   } else {
//     alert(response.message)
//   }
// }

// // Fetch data user info
// const fetchData = async () => {
//   const response = await fetchApi(`${$route}/Customer/GetInfo?email=${email}`)
//   userInfo.value = response.data
//   textPicture.value = userInfo.value.firstName.slice(0, 1) + userInfo.value.lastName.slice(0, 1)
// }

// onMounted(fetchData)
</script>
