<template>
    <div class="item">
        <div class="img">
            <router-link
                :to="{
                    name: 'product',
                    params: {
                        name: `${props.productObj.name}`
                    }
                }"
            >
                <img :src="props.productObj.defaultImage" :alt="props.productObj.name">
            </router-link>
            <!-- Hiện icon khi hover item -->
            <div class="icon-hover">
                <i class="bi bi-search"></i>
            </div>
        </div>
        <div class="content">
            <h3 class="title">
                <router-link
                    :to="{
                        name: 'product',
                        params: {
                            name: `${props.productObj.name}`
                        }
                    }"
                >
                    {{ props.productObj.name }}
                </router-link>
            </h3>
            <div>
                <ul class="list-variants pt-2">
                    <li>+{{ props.productObj.colorCount }} màu sắc</li>
                </ul>
            </div>
            <div class="box-pro-prices pt-1">
                <span>{{ formatter.format(props.productObj.priceSale) }}</span>
                <del class="compare-price d-block pt-2">{{ formatter.format(props.productObj.price) }}</del>
            </div>
            <ul class="hash-tag-loop">
                <li>Nhập tag hashtag_nội dung hiển thị để show nội dung này</li>
            </ul>
        </div>
    </div>
</template>

<script setup>
const props = defineProps(['productObj']);

const formatter = new Intl.NumberFormat('vi-VN', {
  style: 'currency',
  currency: 'VND',
});
</script>