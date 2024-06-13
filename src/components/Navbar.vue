<template>
    <nav class="nav-group">
        <ul class="list-menu-nav">
            <NavbarLink
                v-for="category in categories"
                :key="category.id"
                :categoryObj="category"
            />
        </ul>
    </nav>
</template>

<script setup>

import { inject, onMounted, ref } from 'vue';
import NavbarLink from './NavbarLink.vue';
// Api
import { getCategoriesByLevel } from '@/api/CategoryService';

// Route api
const $route = inject('$route');

// Define your reactive data properties here
const categoriesLv1 = ref([]);
const categoriesLv2 = ref([]);
const categoriesLv3 = ref([]);
const categories = ref([]);

// Get subnav by category id
function getSubNav(categoryId, categories) {
    let subnav = [];
    categories.forEach(category => {
        if(category.categoryId === categoryId) {
            let subnavObj = {
                id: category.id,
                name: category.name,
                linkUrl: `/${category.textUrl}`,
                subnav: []
            }
            subnav.push(subnavObj);
        }
    })
    return subnav;
}

// Async function to fetch categories
const fetchCategories = async () => {
  try {
    // Asign value
    categoriesLv1.value = await getCategoriesByLevel($route, 1);
    categoriesLv2.value = await getCategoriesByLevel($route, 2);
    categoriesLv3.value = await getCategoriesByLevel($route, 3);
    // Get value categories
    categoriesLv1.value.forEach(category => {
        const subnav = getSubNav(category.id, categoriesLv2.value);
        const navItem = {
            id: category.id,
            name: category.name,
            linkUrl: `/${category.textUrl}`,
            icon: category.icon,
            subnav: subnav
        };

        subnav.forEach(item => {
            const subnav = getSubNav(item.id, categoriesLv3.value);
            item.subnav = subnav;
        })

        categories.value.push(navItem)
    });
  } catch (error) {
    console.error(error.message);
  }
};

// Call the fetchCategories function when component is mounted
onMounted(fetchCategories);

</script>