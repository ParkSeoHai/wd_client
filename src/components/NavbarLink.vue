<template>
    <li class="item">
        <router-link 
            :to="`/danh-muc${categoryObj.linkUrl}`"
            class="nav-link"
            :title="`${categoryObj.name}`"
        >
            <span class="content">
                <span class="icon" v-html="categoryObj.icon"></span>
                <span>{{ categoryObj.name }}</span>
            </span>
            <i v-if="categoryObj.subnav.length > 0" class="bi bi-chevron-right icon-arrow"></i>
        </router-link>
        <!-- Sub nav -->
        <ul
            v-if="categoryObj.subnav.length > 0"
            class="nav-dropdown"
        >
            <!-- Item -->
            <li
                class="nav-dropdown__item--lv1"
                v-for="subnav in categoryObj.subnav"
                :key="subnav.id"
            >
                <router-link
                    :to="`/danh-muc${subnav.linkUrl}`"
                    class="nav-dropdown__link lv1"
                >
                    {{ subnav.name }}
                </router-link>
                <ul class="subnav-dropdown">
                    <li
                        class="nav-dropdown__item--lv2"
                        v-for="subnavItem in subnav.subnav"
                        :key="subnavItem.id"
                    >
                        <router-link
                            :to="`/danh-muc${subnavItem.linkUrl}`"
                            class="nav-dropdown__link"
                        >{{ subnavItem.name }}</router-link>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</template>

<script setup>

// Props import from components/NavbarLink.vue
const { categoryObj } = defineProps(['categoryObj']);
</script>