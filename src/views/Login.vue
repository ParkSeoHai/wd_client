<template>
  <div class="background"></div>
  <Breadcrumb class="position-absolute z-3" :breadcrumb-active="'Đăng nhập'" />
  <div class="template-account" style="height: 500px">
    <div class="cloud x1"></div>
    <div class="cloud x2"></div>
    <div class="cloud x3"></div>
    <div class="cloud x4"></div>
    <div class="cloud x5"></div>
    <div class="template-account__block">
      <h1 class="template-account__heading">Đăng nhập</h1>
      <form class="template-account__form" @submit.prevent="submitForm">
        <ul class="template-account__form--errors" v-show="responseErrors">
          <li v-for="(error, index) in responseErrors" :key="index">{{ error }}</li>
        </ul>
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
        <div class="mt-3 position-relative">
          <input
            type="password"
            v-model.trim="password"
            class="password-input"
            :class="passwordMessage !== '' ? 'error' : ''"
            placeholder="Nhập mật khẩu (*)"
          />
          <button
            v-show="password"
            type="button"
            class="position-absolute top-50 end-0 me-3 translate-middle-y"
            @click="setShowPassword"
          >
            <i v-if="showPassword" class="bi bi-eye-slash-fill fs-2"></i>
            <i v-else class="bi bi-eye-fill fs-2"></i>
          </button>
          <span v-show="passwordMessage !== ''" class="template-account__form--message">{{
            passwordMessage
          }}</span>
        </div>
        <div class="text-end mt-3">
          <router-link to="/user/forgot-password" class="template-account__form--link"
            >Quên mật khẩu?</router-link
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
              :size="20"
              indeterminate
            ></v-progress-circular>
            Đăng nhập
          </button>
        </div>
        <div class="mt-4" style="font-size: 1.5rem">
          <p>Hoặc đăng nhập với</p>
        </div>
        <div class="template-account__form--buttons mt-2">
          <button type="button" class="btn-base">
            <i class="bi bi-google"></i>
            <span>Google</span>
          </button>
          <button type="button" class="btn-base">
            <i class="bi bi-facebook"></i>
            <span>Facebook</span>
          </button>
        </div>
      </form>
      <p class="template-account__question my-4">
        Bạn chưa có tài khoản? <router-link to="/user/register">Đăng ký ngay</router-link>
      </p>
    </div>
  </div>
</template>

<script setup>
import { inject, onMounted, ref, watch } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { login } from "@/service/AuthService";
import { useToast } from "vue-toast-notification";
import { nextTick } from "vue";

const $toast = useToast();

const loading = ref(false);

const url_api = inject("url_api");
const user = inject("user");

const responseErrors = ref([]);
const message = "(*) Vui lòng không bỏ trống";
const isSubmit = ref(true);
// Email
const email = ref("");
const emailMessage = ref("");
watch(email, () => {
  emailMessage.value = "";
  if (email.value === "") {
    emailMessage.value = message;
    isSubmit.value = false;
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailMessage.value = "Email không hợp lệ";
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Password
const showPassword = ref(false);
const password = ref("");
const passwordMessage = ref("");
watch(password, () => {
  passwordMessage.value = "";
  if (password.value === "") {
    passwordMessage.value = message;
    isSubmit.value = false;
  } else {
    isSubmit.value = true;
  }
});
// Handle show hide password
const setShowPassword = () => {
  showPassword.value = !showPassword.value;
  nextTick(() => {
    const passwordElement = document.querySelector(".password-input");
    passwordElement.type = showPassword.value ? "text" : "password";
  });
};
// Validate form
const validateForm = () => {
  if (email.value.trim() === "") {
    emailMessage.value = message;
    isSubmit.value = false;
  }
  if (password.value.trim() === "") {
    passwordMessage.value = message;
    isSubmit.value = false;
  }
  return isSubmit.value;
};

const submitForm = async () => {
  responseErrors.value = [];
  const isValid = validateForm();
  if (isValid) {
    // Call service login
    loading.value = true;
    setTimeout(async () => {
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
        responseErrors.value.push(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
      } finally {
        loading.value = false;
      }
    }, 1000);
  }
};

onMounted(() => {
  if (user) {
    window.location.href = "/";
  }
});
</script>
