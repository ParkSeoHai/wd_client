<template>
    <div class="background"></div>
    <Breadcrumb
        class="position-absolute z-3"
        :breadcrumbs="breadcrumbs"
        :breadcrumb-active="breadcrumbActive"
    />
    <div class="template-account" style="height: 600px;">
        <div class="cloud x1"></div>
        <div class="cloud x2"></div>
        <div class="cloud x3"></div>
        <div class="cloud x4"></div>
        <div class="cloud x5"></div>
        <div class="template-account__block">
            <h1 class="template-account__heading">Tạo tài khoản</h1>
            <form class="template-account__form" @submit.prevent="submitForm">
                <ul class="template-account__form--errors" v-show="responseErrors">
                    <li
                        v-for="(error, index) in responseErrors"
                        :key="index"
                    >{{ error }}</li>
                </ul>
                <div class="mt-3">
                    <input type="text" v-model="name" :class="nameMessage !== '' ? 'error' : ''" placeholder="Nhập họ và tên (*)">
                    <span v-show="nameMessage !== ''" class="template-account__form--message">{{ nameMessage }}</span>
                </div>
                <div class="mt-3">
                    <input type="email" v-model="email" :class="emailMessage !== '' ? 'error' : ''" placeholder="Nhập email (*)">
                    <span v-show="emailMessage !== ''" class="template-account__form--message">{{ emailMessage }}</span>
                </div>
                <div class="mt-3">
                    <input type="text" v-model="phoneNumber" :class="phoneNumberMessage !== '' ? 'error' : ''" placeholder="Nhập số điện thoại (*)">
                    <span v-show="phoneNumberMessage !== ''" class="template-account__form--message">{{ phoneNumberMessage }}</span>
                </div>
                <div class="mt-3">
                    <input type="password" v-model="password" :class="passwordMessage !== '' ? 'error' : ''" placeholder="Nhập mật khẩu (*)">
                    <span v-show="passwordMessage !== ''" class="template-account__form--message">{{ passwordMessage }}</span>
                </div>
                <div class="mt-3">
                    <input type="password" v-model="confirmPassword" :class="confirmPasswordMessage !== '' ? 'error' : ''" placeholder="Nhập lại mật khẩu (*)">
                    <span v-show="confirmPasswordMessage !== ''" class="template-account__form--message">{{ confirmPasswordMessage }}</span>
                </div>
                <div class="text-center mt-4">
                    <button type="submit" class="btn-base template-account__form--button">Đăng ký</button>
                </div>
            </form>
            <p class="template-account__question my-4">Bạn đã có tài khoản? <a href="/user/login">Đăng nhập ngay</a></p>
        </div>
    </div>
</template>

<script setup>
import { inject, ref, watch } from 'vue';
import Breadcrumb from '@/components/Breadcrumb.vue';
import axios from 'axios';
import {useToast} from 'vue-toast-notification';
import 'vue-toast-notification/dist/theme-sugar.css';
// Breacrumbs
const breadcrumbs = [
    {
        linkUrl: 'user/login',
        linkText: 'Đăng nhập'
    }
];
const breadcrumbActive = 'Đăng ký';

const $route = inject('$route');
const $toast = useToast();

const responseErrors = ref([]);

const message = '(*) Vui lòng không bỏ trống';
const isSubmit = ref(true);
// Name
const name = ref('');
const nameMessage = ref('');
watch(name, () => {
    nameMessage.value = '';
    if(name.value.trim() == '') {
        nameMessage.value = message;
        isSubmit.value = false;
    } else {
        isSubmit.value = true;
    }
});
// Email
const email = ref('');
const emailMessage = ref('');
watch(email, () => {
    emailMessage.value = '';
    if(email.value.trim() == '') {
        emailMessage.value = message;
        isSubmit.value = false;
    } else if(!/^\S+@\S+\.\S+$/.test(email.value)) {
        emailMessage.value = 'Email không hợp lệ';
        isSubmit.value = false;
    } else {
        isSubmit.value = true;
    }
});
// Phone number
const phoneNumber = ref('');
const phoneNumberMessage = ref('');
watch(phoneNumber, () => {
    phoneNumberMessage.value = '';
    if(phoneNumber.value.trim() == '') {
        phoneNumberMessage.value = message;
        isSubmit.value = false;
    } else if(!/^\d{10,11}$/.test(phoneNumber.value)) {
        phoneNumberMessage.value = 'Số điện thoại không hợp lệ';
        isSubmit.value = false;
    } else {
        isSubmit.value = true;
    }
});
// Password
const password = ref('');
const passwordMessage = ref('');
watch(password, () => {
    passwordMessage.value = '';
    if(password.value.trim() == '') {
        passwordMessage.value = message;
        isSubmit.value = false;
    } else if(password.value.length < 6) {
        passwordMessage.value = 'Mật khẩu phải có ít nhất 6 ký tự';
        isSubmit.value = false;
    } else {
        isSubmit.value = true;
    }
});
// Confirm password
const confirmPassword = ref('');
const confirmPasswordMessage = ref('');
watch(confirmPassword, () => {
    confirmPasswordMessage.value = '';
    if(confirmPassword.value.trim() == '') {
        confirmPasswordMessage.value = message;
        isSubmit.value = false;
    } else if(confirmPassword.value !== password.value) {
        confirmPasswordMessage.value = 'Mật khẩu không khớp';
        isSubmit.value = false;
    } else {
        isSubmit.value = true;
    }
});
// Validate form
const validateForm = () => {
    if(name.value.trim() == '') {
        nameMessage.value = message;
        isSubmit.value = false;
    }
    if(email.value.trim() == '') {
        emailMessage.value = message;
        isSubmit.value = false;
    }
    if(phoneNumber.value.trim() == '') {
        phoneNumberMessage.value = message;
        isSubmit.value = false;
    }
    if(password.value.trim() == '') {
        passwordMessage.value = message;
        isSubmit.value = false;
    }
    if(confirmPassword.value.trim() == '') {
        confirmPasswordMessage.value = message;
        isSubmit.value = false;
    }
    return isSubmit.value;
};

const submitForm = () => {
    const isValid = validateForm();
    if(isValid) {
        // Get firstName and lastName from name
        let firstName = name.value.split(' ').slice(-1).join(' ');
        let lastName = name.value.split(' ').slice(0, -1).join(' ');
        // Send request to server
        axios.post(`${$route}/Customer/Register`, {
            firstName: firstName,
            lastName: lastName,
            email: email.value,
            phoneNumber: phoneNumber.value,
            password: password.value
        }).then(response => {
            if(response.data.success) {
                // Show success message
                $toast.success(response.data.message, {
                    position: 'top-right',
                });
                setTimeout(() => {
                    window.location.href = '/user/login';
                }, 3000);
            } else {
                responseErrors.value = response.data.errors;
            }
        }).catch(error => {
            // Show error message
            $toast.error('Đã có lỗi xảy ra, vui lòng thử lại sau', {
                position: 'top-right',
            });
            console.log(error);
        });
    }
};
</script>