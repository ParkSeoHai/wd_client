<template>
  <!-- Home Slider -->
  <section id="home-slider" class="home-slider">
    <div class="row">
      <div class="col-lg-3">
        <!-- Navbar -->
        <navbar class="nav-home__slider" />
      </div>
      <div class="col-lg-9 pt-3 home-banner-slider">
        <div class="banner-slider">
          <button
            v-if="imageSliders.length > 1"
            @click.prevent="showSlider(-1)"
            class="btn-arrow btn-arrow-left"
          >
            <i class="bi bi-chevron-compact-left"></i>
          </button>
          <router-link :to="sliderShow.link" class="slider-link">
            <img :src="sliderShow.image" alt="" />
          </router-link>
          <button
            v-if="imageSliders.length > 1"
            @click.prevent="showSlider(1)"
            class="btn-arrow btn-arrow-right"
          >
            <i class="bi bi-chevron-compact-right"></i>
          </button>
          <ul class="list-circle" v-if="imageSliders.length > 1">
            <li
              class="item"
              v-for="n in imageSliders.length"
              :key="n"
              :class="sliderIndex === n - 1 ? 'active' : ''"
              @click.prevent="handleCircle(n - 1)"
            ></li>
          </ul>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { ref, watch } from "vue";
import Navbar from "../Navbar.vue";

// Slider show
const imageSliders = [
  {
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/sliding-home-iphone-16-pro-km-moi.webp",
    link: "#",
  },
  {
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/oppo-find-x8-mo-ban-home-6-12-24.jpg",
    link: "#",
  },
  {
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/mc-m4-mb.jpg",
    link: "#",
  },
  {
    image:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/vivo-y19s-16-12.png",
    link: "#",
  },
];

// Slider index showing
let sliderIndex = ref(0);
// Slider is showing
let sliderShow = ref(imageSliders[sliderIndex.value]);

watch(sliderIndex, () => {
  sliderShow.value = imageSliders[sliderIndex.value];
});

// Next slider after 10s
setInterval(() => {
  showSlider(1);
}, 10000);

// Calc value slider index active
function showSlider(n) {
  sliderIndex.value += n;
  if (sliderIndex.value > imageSliders.length - 1) {
    sliderIndex.value = 0;
  }
  if (sliderIndex.value < 0) {
    sliderIndex.value = imageSliders.length - 1;
  }
}

// Handle when click circle item
function handleCircle(n) {
  sliderIndex.value = n;
}
</script>
