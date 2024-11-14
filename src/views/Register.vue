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
      <div v-if="showVerifyAccount && otp" class="verify-frame">
        <h1 class="template-account__heading">Verify Your Account</h1>
        <p class="verify-frame__desc">
          We sent a verification code to {{ email }}. Please check your email and paste
          the code below.
        </p>
        <v-otp-input v-model="otpInput" class="verify-frame__otp"></v-otp-input>
        <div class="verify-frame__btn-submit">
          <v-btn
            class="my-4 fs-5"
            height="40"
            text="Verify"
            color="#1877f2"
            variant="flat"
            width="40%"
            @click="verifyOTP"
          ></v-btn>
        </div>
        <v-divider class="mt-3 mb-6"></v-divider>
        <div class="mb-3">Need another <strong>code</strong>?</div>
        <v-btn
          class="verify-frame__btn-resend"
          color="primary"
          text="Re-send Email"
          variant="tonal"
          @click="resendEmail"
        ></v-btn>
      </div>
      <template v-else>
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
            <span
              v-show="passwordMessage !== ''"
              class="template-account__form--message"
              >{{ passwordMessage }}</span
            >
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
      </template>
    </div>
  </div>
</template>

<script setup>
import { inject, ref, watch } from "vue";
import Breadcrumb from "@/components/Breadcrumb.vue";
import { useToast } from "vue-toast-notification";
import "vue-toast-notification/dist/theme-sugar.css";
import { register } from "@/service/AuthService";
import axios from "axios";

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

const showVerifyAccount = ref(false);
const otp = ref();
const otpInput = ref();

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

// verify OTP
const verifyOTP = async () => {
  if (otp.value.toString() === otpInput.value) {
    await registerAccount();
  } else {
    $toast.error("Mã OTP không chính xác. Vui lòng thử lại", {
      position: "top",
    });
  }
};

const getOtpEmail = async () => {
  try {
    const res = await axios.post(`${url_api}/api/v1/auth/getOTP`, {
      emailTo: email.value,
    });
    otp.value = res.data;
    showVerifyAccount.value = true;
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

// handle get otp email
const submitForm = async () => {
  responseErrors.value = [];
  const isValid = validateForm();
  if (isValid) {
    // Call service get otp
    loading.value = true;
    await getOtpEmail();
  }
};

// handle resend get otp email
const resendEmail = async () => {
  otpInput.value = "";
  await getOtpEmail();
  $toast.success("Re-send OTP Code Success.", {
    position: "top",
  });
};

// handle register account
const registerAccount = async () => {
  try {
    const data = await register({
      email: email.value,
      password: password.value,
      name: name.value,
      phone_number: phoneNumber.value,
      urlApi: `${url_api}/api/v1/auth/register`,
    });
    // Show success message
    $toast.success(data.message || "Đăng ký tài khoản thành công.", {
      position: "top",
    });
    setTimeout(() => {
      window.location.href = "/user/login";
    }, 1000);
  } catch (error) {
    // Show error message
    $toast.error(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.", {
      position: "top",
    });
    responseErrors.value.push(error.message || "Đã xảy ra lỗi. Vui lòng thử lại.");
    showVerifyAccount.value = false;
    otp.value = false;
    otpInput.value = false;
  } finally {
    loading.value = false;
  }
};
</script>
