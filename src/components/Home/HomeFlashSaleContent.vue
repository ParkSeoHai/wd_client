<template>
  <!-- Top -->
  <div class="flash-sale-top d-flex align-items-center justify-content-between">
    <h2 class="title d-flex">
      <span>
        <img src="../../assets/images/flashsale-hot.webp" alt="" />
        SẢN PHẨM KHUYẾN MẠI
      </span>
    </h2>
    <div class="list-item-notify">
      <div class="marquee">
        <ul class="list-product-suggess d-flex">
          <li class="item">
            <a href="#"><span>12 Pro Max Giảm 800K</span></a>
          </li>
          <li class="item">
            <a href="#"><span>Xả Kho Xiaomi Giá Cực SỐC</span></a>
          </li>
          <li class="item">
            <a href="#"><span>12 Pro Max Giảm 800K</span></a>
          </li>
          <li class="item">
            <a href="#"><span>Xả Kho Xiaomi Giá Cực SỐC</span></a>
          </li>
          <li class="item">
            <a href="#"><span>12 Pro Max Giảm 800K</span></a>
          </li>
          <li class="item">
            <a href="#"><span>Xả Kho Xiaomi Giá Cực SỐC</span></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="countdown-deal">
      <ul class="list d-flex gap-2">
        <li class="item">
          <strong class="days">{{ daySale }}</strong>
          <small>Ngày</small>
        </li>
        <li class="item">
          <strong class="hours">{{ hourSale }}</strong>
          <small>Giờ</small>
        </li>
        <li class="item">
          <strong class="minutes">{{ minuteSale }}</strong>
          <small>Phút</small>
        </li>
        <li class="item">
          <strong class="seconds">{{ secondSale }}</strong>
          <small>Giây</small>
        </li>
      </ul>
    </div>
  </div>

  <!-- Body -->
  <div class="flash-sale-body">
    <button
      v-if="circleCount > 1"
      class="btn-arrow btn-arrow-left"
      @click.prevent="handleArrowProduct(1)"
    >
      <i class="bi bi-chevron-compact-left"></i>
    </button>
    <div class="block-body">
      <div
        class="list-product"
        :style="[
          `grid-template-columns: repeat(${productsLength}, 1fr)`,
          `width: ${widthListProduct}px`,
          `margin-left: ${marginLeft}px`,
        ]"
      >
        <!-- Item -->
        <ProductItem
          v-for="product in products"
          :key="product._id"
          :product="product"
          :type="'flash_sale'"
        />
      </div>
      <ul v-if="circleCount > 1" class="list-circle">
        <li
          class="item"
          v-for="n in circleCount"
          :key="n"
          :class="(n - 1) * -widthBlog === marginLeft ? 'active' : ''"
          @click.prevent="handleCircleProduct(n - 1)"
        ></li>
      </ul>
    </div>
    <button
      v-if="circleCount > 1"
      class="btn-arrow btn-arrow-right"
      @click.prevent="handleArrowProduct(-1)"
    >
      <i class="bi bi-chevron-compact-right"></i>
    </button>
  </div>
</template>

<script setup>
import { inject, ref } from "vue";
// Component
import ProductItem from "../ProductItem.vue";
import axios from "axios";

const urlApi = inject("url_api");

const products = ref([]);
const daySale = ref(0),
  hourSale = ref(0),
  minuteSale = ref(0),
  secondSale = ref(0);

const getFlashSale = async () => {
  const res = await axios.get(`${urlApi}/api/v1/flash_sale`);
  return res.data.metadata;
};

// Fetch data
const data = await getFlashSale();

products.value = data.flash_sale_items;

const productsLength = products.value.length || 0;

// Calc count display circle / (1 circle = 5 product)
// const circleCount = Math.ceil(productsLength / 5);
const circleCount = productsLength + 1 - 5;

// Calc width blog all product
const widthListProduct = productsLength * 250;
// Width each blog product
const widthBlog = 250;

// Value style margin left
let marginLeft = ref(0);

// Calc when prev, next blog product
function handleArrowProduct(value) {
  marginLeft.value += value * widthBlog;

  if (marginLeft.value > 0) {
    marginLeft.value = -widthBlog * (circleCount - 1);
  }
  if (marginLeft.value < -widthBlog * (circleCount - 1)) {
    marginLeft.value = 0;
  }
}

// Calc when click circle
function handleCircleProduct(value) {
  marginLeft.value = -(widthBlog * value);
}

const timeRunForwards = (data) => {
  const targetTime = new Date(data.end_time * 1000);

  // Hàm cập nhật đếm ngược
  const countdown = setInterval(() => {
    const now = new Date().getTime(); // Lấy timestamp hiện tại
    const distance = targetTime.getTime() - now; // Khoảng cách thời gian đến mốc đích

    // Tính toán giờ, phút, và giây còn lại
    const days = Math.floor(distance / (1000 * 60 * 60 * 24));
    const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((distance % (1000 * 60)) / 1000);

    // Hiển thị đếm ngược trong console
    daySale.value = days;
    hourSale.value = hours;
    minuteSale.value = minutes;
    secondSale.value = seconds;
    // console.log(`${days} ngày, ${hours} giờ, ${minutes} phút, ${seconds} giây`);

    // Kiểm tra nếu đếm ngược đã hoàn thành
    if (distance < 0) {
      clearInterval(countdown); // Dừng đếm ngược
      console.log("Đếm ngược đã kết thúc");
    }
  }, 1000);
};

timeRunForwards(data);
</script>
