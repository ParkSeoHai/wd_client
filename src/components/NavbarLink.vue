<script setup>
import { nextTick } from "vue";

// Props import from components/NavbarLink.vue
const { category } = defineProps(["category"]);

// Hàm xử lý click vào icon
const toggleDropdownIcon = (categoryId) => {
  nextTick(() => {
    // remove all active nav
    const navItems = document.querySelectorAll(".nav-group .item");
    navItems.forEach((nav) => {
      // get dropdown
      const subDropdown = nav.querySelector(".nav-dropdown");
      if (nav.classList.contains(`nav-item-${categoryId}`)) {
        if (nav.classList.contains("active")) {
          // hide
          subDropdown.style.display = "none";
          nav.classList.remove("active");
        } else {
          subDropdown.style.display = "grid";
          nav.classList.add("active");
        }
      } else {
        subDropdown.style.display = "none";
        nav.classList.remove("active");
      }
    });
  });
};
</script>

<template>
  <li class="item" :class="`nav-item-${category._id}`">
    <div class="d-flex align-items-center">
      <router-link
        :to="`/danh-muc/${category.category_url}`"
        class="nav-link w-100"
        :title="`${category.category_name}`"
      >
        <span class="content">
          <span class="icon" v-html="category.icon"></span>
          <span>{{ category.category_name }}</span>
        </span>
      </router-link>
      <button class="item__icon" @click="toggleDropdownIcon(category._id)">
        <i v-if="category.subcategories.length > 0" class="bi-chevron-right"></i>
      </button>
    </div>
    <!-- Sub nav -->
    <ul class="nav-dropdown">
      <!-- Item -->
      <li
        class="nav-dropdown__item--lv1"
        v-for="subnav in category.subcategories"
        :key="subnav._id"
      >
        <router-link
          :to="`/danh-muc/${subnav.category_url}`"
          class="nav-dropdown__link lv1"
        >
          {{ subnav.category_name }}
        </router-link>
        <ul class="subnav-dropdown">
          <li
            class="nav-dropdown__item--lv2"
            v-for="subnavItem in subnav.subcategories"
            :key="subnavItem._id"
          >
            <router-link
              :to="`/danh-muc/${subnavItem.category_url}`"
              class="nav-dropdown__link"
              >{{ subnavItem.category_name }}</router-link
            >
          </li>
        </ul>
      </li>
    </ul>
  </li>
</template>
