<template>
    <!-- Breadcrumb -->
    <nav aria-label="breadcrumb">
        <ol class="breadcrumb mb-0">
            <li
                class="breadcrumb-item"
            >
                <a
                    href="/"
                    class="breadcrumb__link"
                >
                    Trang chủ
                </a>
            </li>

            <li
                class="breadcrumb-item"
                v-for="(breadcrumb, index) in breadcrumbs"
                :key="index"
            >
                <a
                    :href="`/${breadcrumb.linkUrl}`"
                    class="breadcrumb__link"
                >
                    {{ breadcrumb.linkText }}
                </a>
            </li>

            <li class="breadcrumb-item active">
                {{ breadcrumbActive }}
            </li>
        </ol>
    </nav>
</template>

<script setup>

const { breadcrumbs, breadcrumbActive } = defineProps(['breadcrumbs', 'breadcrumbActive']);

</script>