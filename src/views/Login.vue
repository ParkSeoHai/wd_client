<template>
  <div class="background"></div>
  <Breadcrumb class="position-absolute z-3" :breadcrumb-active="breadcrumbActive" />
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
          <input type="email" v-model="email" :class="emailMessage !== '' ? 'error' : ''"
            placeholder="Nhập email (*)" />
          <span v-show="emailMessage !== ''" class="template-account__form--message">{{
            emailMessage
          }}</span>
        </div>
        <div class="mt-3">
          <input type="password" v-model="password" :class="passwordMessage !== '' ? 'error' : ''"
            placeholder="Nhập mật khẩu (*)" />
          <span v-show="passwordMessage !== ''" class="template-account__form--message">{{
            passwordMessage
          }}</span>
        </div>
        <div class="text-end mt-3">
          <router-link to="/user/forgot-password" class="template-account__form--link">Quên mật khẩu?</router-link>
        </div>
        <div class="text-center mt-4">
          <button type="submit" class="btn-base template-account__form--button">Đăng nhập</button>
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
import { inject, ref, watch } from 'vue'
import axios from 'axios'
import Breadcrumb from '@/components/Breadcrumb.vue'
const breadcrumbActive = 'Đăng nhập'

const $route = inject('$route')

const responseErrors = ref([])
const message = '(*) Vui lòng không bỏ trống'
const isSubmit = ref(true)
// Email
const email = ref('')
const emailMessage = ref('')
watch(email, () => {
  emailMessage.value = ''
  if (email.value === '') {
    emailMessage.value = message
    isSubmit.value = false
  } else if (!/^\S+@\S+\.\S+$/.test(email.value)) {
    emailMessage.value = 'Email không hợp lệ'
    isSubmit.value = false
  } else {
    isSubmit.value = true
  }
})
// Password
const password = ref('')
const passwordMessage = ref('')
watch(password, () => {
  passwordMessage.value = ''
  if (password.value === '') {
    passwordMessage.value = message
    isSubmit.value = false
  } else {
    isSubmit.value = true
  }
})
// Validate form
const validateForm = () => {
  if (email.value.trim() === '') {
    emailMessage.value = message
    isSubmit.value = false
  }
  if (password.value.trim() === '') {
    passwordMessage.value = message
    isSubmit.value = false
  }
  return isSubmit.value
}

const submitForm = () => {
  responseErrors.value = []
  const isValid = validateForm()
  if (isValid) {
    // Call API login
    axios
      .post(`${$route}/Customer/Login`, {
        email: email.value,
        password: password.value
      })
      .then((response) => {
        console.log(response)
        if (response.data.success === true) {
          // Save user info to localStorage
          localStorage.setItem('wdsmartuser', JSON.stringify(response.data.data))
          localStorage.setItem('wdsmartcartid', response.data.data.cartId)
          // Redirect to home page
          window.location.href = '/'
        } else {
          // Show error messages
          responseErrors.value = response.data.errors
        }
      })
      .catch((error) => {
        console.log(error)
      })
  }
}
</script>
