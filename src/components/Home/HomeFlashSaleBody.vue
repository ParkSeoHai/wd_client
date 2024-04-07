<template>
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
                    `margin-left: ${marginLeft}px`
                ]"
            >
                <!-- Item -->
                <HomeFlashSaleBodyItem
                    v-for="product in props.products"
                    :key="product.id"
                    :productObj="product"
                />
            </div>
            <ul
                v-if="circleCount > 1"
                class="list-circle"
            >
                <li class="item"
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
import { ref } from 'vue';
// Component
import HomeFlashSaleBodyItem from './HomeFlashSaleBodyItem.vue';

const props = defineProps(['products']);
const productsLength = props.products.length;

// Calc count display circle / (1 circle = 5 product)
const circleCount = Math.ceil(productsLength / 5);

// Calc width blog all product
const widthListProduct = productsLength * 250;
// Width each blog product
const widthBlog = 250 * 5;

// Value style margin left
let marginLeft = ref(0);

// Calc when prev, next blog product
function handleArrowProduct(value) {
    marginLeft.value += value * widthBlog;

    if(marginLeft.value > 0) {
        marginLeft.value = -widthBlog * (circleCount - 1);
    } if(marginLeft.value < -widthBlog * (circleCount - 1)) {
        marginLeft.value = 0;
    }
}

// Calc when click circle
function handleCircleProduct(value) {
    marginLeft.value = -(widthBlog * value);
}

</script>