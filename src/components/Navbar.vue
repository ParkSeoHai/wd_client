<script setup>
import { onMounted, ref } from "vue";
import NavbarLink from "./NavbarLink.vue";
import axios from "axios";

// Define your reactive data properties here
const categories = ref([]);

const getCategories = async () => {
  try {
    const response = await axios("https://wd-server.vercel.app/api/v1/category");
    return response.data.metadata.categories;
  } catch (error) {
    console.error(error);
  }
};

onMounted(async () => {
  categories.value = await getCategories();
});
</script>

<template>
  <nav class="nav-group">
    <ul class="list-menu-nav">
      <NavbarLink
        v-for="category in categories"
        :key="category.id"
        :category="category"
      />
    </ul>
  </nav>
</template>
