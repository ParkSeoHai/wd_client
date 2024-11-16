<script setup>
// Props import from components/NavbarLink.vue
const { category } = defineProps(["category"]);
</script>

<template>
  <li class="item">
    <router-link
      :to="`/danh-muc/${category.category_url}`"
      class="nav-link"
      :title="`${category.category_name}`"
    >
      <span class="content">
        <span class="icon" v-html="category.icon"></span>
        <span>{{ category.category_name }}</span>
      </span>
      <i
        v-if="category.subcategories.length > 0"
        class="bi bi-chevron-right icon-arrow"
      ></i>
    </router-link>
    <!-- Sub nav -->
    <ul v-if="category.subcategories.length > 0" class="nav-dropdown">
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
