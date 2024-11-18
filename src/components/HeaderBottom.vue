<script setup lang="ts">
import { inject } from "vue";
import Navbar from "./Navbar.vue";

const showNavHeaderBottom = inject("showNavHeaderBottom");
const setModalBackground = inject("setModalBackground");

const toggleNavDropdown = () => {
  showNavHeaderBottom.value = !showNavHeaderBottom.value;
  if (showNavHeaderBottom.value) {
    setModalBackground(true);
  } else {
    setModalBackground(false);
  }
};
</script>

<template>
  <div class="header-bottom">
    <div class="container-xl">
      <div class="navigation">
        <!-- dropdown nav -->
        <div v-if="showNavHeaderBottom" class="navigation_dropdown home-slider row">
          <navbar class="col-3" />
        </div>
        <div class="row d-flex align-items-center">
          <div class="col-3">
            <div
              @click="toggleNavDropdown"
              class="block-left d-flex align-items-center cursor-pointer"
            >
              <span class="icon">
                <i class="bi bi-command"></i>
              </span>
              <span class="title">DANH MỤC SẢN PHẨM</span>
            </div>
          </div>
          <div class="col-9">
            <ul class="list d-flex align-items-center">
              <li class="item">
                <a href="#">
                  <span class="icon">
                    <i class="bi bi-tencent-qq"></i>
                  </span>
                  <span class="title">Chính sách bảo hành</span>
                </a>
              </li>
              <li class="item">
                <a href="#">
                  <span class="icon">
                    <i class="bi bi-piggy-bank"></i>
                  </span>
                  <span class="title">Tra cứu bảo hành</span>
                </a>
              </li>
              <li class="item">
                <a href="#">
                  <span class="icon">
                    <i class="bi bi-truck"></i>
                  </span>
                  <span class="title">Trả góp online</span>
                </a>
              </li>
              <li class="item d-none">
                <a href="#">
                  <span class="icon">
                    <i class="bi bi-gear"></i>
                  </span>
                  <span class="title">Hướng dẫn thiết lập</span>
                </a>
              </li>
              <li class="item d-none">
                <a href="#">
                  <span class="icon">
                    <i class="bi bi-tools"></i>
                  </span>
                  <span class="title">Tính năng</span>
                </a>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
