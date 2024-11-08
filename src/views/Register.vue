<template>
  <div class="background"></div>
  <Breadcrumb
    class="position-absolute z-3"
    :breadcrumbs="breadcrumbs"
    :breadcrumb-active="'Đăng ký'"
  />
  <div class="template-account" style="height: 600px">
    <div class="cloud x1"></div>
    <div class="cloud x2"></div>
    <div class="cloud x3"></div>
    <div class="cloud x4"></div>
    <div class="cloud x5"></div>
    <div class="template-account__block">
      <h1 class="template-account__heading">Tạo tài khoản</h1>
      <form class="template-account__form" @submit.prevent="submitForm">
        <ul class="template-account__form--errors" v-show="responseErrors">
          <li v-for="(error, index) in responseErrors" :key="index">{{ error }}</li>
        </ul>
        <div class="mt-3">
          <input
            type="text"
            v-model.trim.lazy="name"
            :class="nameMessage !== '' ? 'error' : ''"
            placeholder="Nhập họ và tên (*)"
          />
          <span v-show="nameMessage !== ''" class="template-account__form--message">{{
            nameMessage
          }}</span>
        </div>
        <div class="mt-3">
          <input
            type="email"
            v-model.trim.lazy="email"
            :class="emailMessage !== '' ? 'error' : ''"
            placeholder="Nhập email (*)"
          />
          <span v-show="emailMessage !== ''" class="template-account__form--message">{{
            emailMessage
          }}</span>
        </div>
        <div class="mt-3">
          <input
            type="text"
            v-model.trim.lazy="phoneNumber"
            :class="phoneNumberMessage !== '' ? 'error' : ''"
            placeholder="Nhập số điện thoại (*)"
          />
          <span
            v-show="phoneNumberMessage !== ''"
            class="template-account__form--message"
            >{{ phoneNumberMessage }}</span
          >
        </div>
        <div class="mt-3">
          <input
            type="password"
            v-model.trim.lazy="password"
            :class="passwordMessage !== '' ? 'error' : ''"
            placeholder="Nhập mật khẩu (*)"
          />
          <span v-show="passwordMessage !== ''" class="template-account__form--message">{{
            passwordMessage
          }}</span>
        </div>
        <div class="mt-3">
          <input
            type="password"
            v-model.trim.lazy="confirmPassword"
            :class="confirmPasswordMessage !== '' ? 'error' : ''"
            placeholder="Nhập lại mật khẩu (*)"
          />
          <span
            v-show="confirmPasswordMessage !== ''"
            class="template-account__form--message"
            >{{ confirmPasswordMessage }}</span
          >
        </div>
        <div class="text-center mt-4">
          <button
            type="submit"
            :class="{ disabled: loading }"
            class="btn-base template-account__form--button"
          >
            <v-progress-circular
              v-if="loading"
              class="me-4"
              color="primary"
              :size="25"
              indeterminate
            ></v-progress-circular>
            <span>Đăng ký</span>
          </button>
        </div>
      </form>
      <p class="template-account__question my-4">
        Bạn đã có tài khoản? <router-link to="/user/login">Đăng nhập ngay</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { register } from "@/service/AuthService";

const url_api = inject("url_api");

// Breacrumbs
const breadcrumbs = [
  {
    _id: "login",
    category_url: "user/login",
    category_name: "Đăng nhập",
  },
];

const $toast = useToast();

const loading = ref(false);
const responseErrors = ref([]);

const message = "(*) Vui lòng không bỏ trống";
const isSubmit = ref(true);
// Name
const name = ref("");
const nameMessage = ref("");
watch(name, () => {
  nameMessage.value = "";
  if (name.value.trim() == "") {
    nameMessage.value = message;
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Email
const email = ref("");
const emailMessage = ref("");
watch(email, () => {
  emailMessage.value = "";
  if (email.value.trim() == "") {
    emailMessage.value = message;
    isSubmit.value = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailMessage.value = "Email không hợp lệ";
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Phone number
const phoneNumber = ref("");
const phoneNumberMessage = ref("");
watch(phoneNumber, () => {
  phoneNumberMessage.value = "";
  if (phoneNumber.value.trim() == "") {
    phoneNumberMessage.value = message;
    isSubmit.value = false;
  } else if (!/^\d{10,11}$/.test(phoneNumber.value)) {
    phoneNumberMessage.value = "Số điện thoại không hợp lệ";
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Password
const password = ref("");
const passwordMessage = ref("");
watch(password, () => {
  passwordMessage.value = "";
  if (password.value.trim() == "") {
    passwordMessage.value = message;
    isSubmit.value = false;
  } else if (password.value.length < 6) {
    passwordMessage.value = "Mật khẩu phải có ít nhất 6 ký tự";
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Confirm password
const confirmPassword = ref("");
const confirmPasswordMessage = ref("");
watch(confirmPassword, () => {
  confirmPasswordMessage.value = "";
  if (confirmPassword.value.trim() == "") {
    confirmPasswordMessage.value = message;
    isSubmit.value = false;
  } else if (confirmPassword.value !== password.value) {
    confirmPasswordMessage.value = "Mật khẩu không khớp";
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Validate form
const validateForm = () => {
  if (name.value.trim() == "") {
    nameMessage.value = message;
    isSubmit.value = false;
  }
  if (email.value.trim() == "") {
    emailMessage.value = message;
    isSubmit.value = false;
  }
  if (phoneNumber.value.trim() == "") {
    phoneNumberMessage.value = message;
    isSubmit.value = false;
  }
  if (password.value.trim() == "") {
    passwordMessage.value = message;
    isSubmit.value = false;
  }
  if (confirmPassword.value.trim() == "") {
    confirmPasswordMessage.value = message;
    isSubmit.value = false;
  }
  return isSubmit.value;
};

const submitForm = async () => {
  responseErrors.value = [];
  const isValid = validateForm();
  if (isValid) {
    // Call service register
    loading.value = true;
    setTimeout(async () => {
      try {
        const data = await register({
          email: email.value,
          password: password.value,
          name: name.value,
          phone_number: phoneNumber.value,
          urlApi: `${url_api}/api/v1/user/register`,
        });
        // Show success message
        $toast.success(data.message || "Đăng ký tài khoản thành công.", {
          position: "top-right",
        });
        setTimeout(() => {
          window.location.href = "/user/login";
        }, 1000);
      } catch (error) {
        // Show error message
        responseErrors.value.push(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      } finally {
        loading.value = false;
      }
    }, 1000);
  }
};
</script>
