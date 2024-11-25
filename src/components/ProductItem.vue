<script setup>
import { inject, onMounted, ref } from "vue";
import { formatter } from "@/service/Common";
import { useToast } from "vue-toast-notification";
import axios from "axios";

const $toast = useToast();

const user = inject("user");
const urlApi = inject("url_api");

const { product, type } = defineProps(["product", "type"]);

// set product image default
const product_image = ref(
  "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTOU0iaTa57K7OKcsCM3m0tEORCxzbYllHIUQ&s"
);

const favoriteItemExist = ref(false);

// set product image is first image thumbs if exist
const setProductImage = (type = "leave") => {
  const imageThumbsLength = product.imageThumbs.length;
  if (type === "leave" && imageThumbsLength > 0) {
    product_image.value = product.imageThumbs[0].image_url;
  } else if (type === "over" && imageThumbsLength > 1) {
    product_image.value = product.imageThumbs[imageThumbsLength - 1].image_url;
  }
};
setProductImage();

// set icon favorite
const iconFavorite = ref("bi bi-heart");
function setIconFavorite(classIcon) {
  iconFavorite.value = classIcon;
}

// if user was login then check product in favorite
const checkProductInFavorite = async () => {
  if (user) {
    const res = await axios.post(`${urlApi}/api/v1/customer/favorite/checkItem`, {
      userId: user._id,
      productId: product._id,
    });
    return res.data;
  }
};

const toggleServiceProductFavorite = async (urlApi) => {
  // call api
  try {
    const response = await axios.post(urlApi, {
      userId: user._id,
      productId: product._id,
    });
    $toast.success(response.data.message, {
      position: "top",
    });
    return response.data;
  } catch (error) {
    // Kiểm tra lỗi và xử lý phù hợp
    if (error.response) {
      // Lỗi từ server
      $toast.error(error.response.data.message || "Lỗi từ server", {
        position: "top",
      });
      throw new Error(error.response.data.message || "Lỗi từ server");
    } else if (error.request) {
      // Không nhận được phản hồi
      $toast.error("Không có phản hồi từ server. Vui lòng thử lại.", {
        position: "top",
      });
      throw new Error("Không có phản hồi từ server. Vui lòng thử lại.");
    } else {
      // Lỗi khác
      $toast.error("Đã xảy ra lỗi. Vui lòng thử lại.", {
        position: "top",
      });
      throw new Error("Đã xảy ra lỗi. Vui lòng thử lại.");
    }
  }
};

// handle toggle product to favorite
const toggleProductFavorite = async () => {
  // check user
  if (!user) {
    $toast.info("Vui lòng đăng nhập", {
      position: "top",
    });
    return;
  }
  if (favoriteItemExist.value) {
    // remove
    const res = await toggleServiceProductFavorite(
      `${urlApi}/api/v1/customer/favorite/removeItem`
    );
    if (res.status === 200) favoriteItemExist.value = false;
  } else {
    // add
    const res = await toggleServiceProductFavorite(
      `${urlApi}/api/v1/customer/favorite/addItem`
    );
    if (res.status === 201) favoriteItemExist.value = true;
  }
};

onMounted(async () => {
  favoriteItemExist.value = await checkProductInFavorite();
});
</script>

<template>
  <div class="item">
    <router-link :to="`/san-pham/${product.product_url}`">
      <div class="item__price--percent" v-if="product.product_discount > 0">
        <p class="item__price--percent-detail">Giảm {{ product.product_discount }}%</p>
      </div>
      <div
        class="img"
        :class="{ 'image-after--bg': product.flash_sale }"
        @mouseover="setProductImage('over')"
        @mouseleave="setProductImage('leave')"
      >
        <img :src="product_image" :alt="product.product_name" />
        <!-- Hiện icon khi hover item -->
        <div class="icon-hover">
          <i class="bi bi-search"></i>
        </div>
      </div>
      <div class="content">
        <h3 class="title">
          <router-link :to="`/san-pham/${product.product_url}`">
            {{ product.product_name }}
          </router-link>
        </h3>
        <!-- <div class="pt-2">
        <ul v-if="product.colorCount > 0" class="list-variants">
          <li>+{{ product.colorCount }} màu sắc</li>
        </ul> -->
        <div class="box-pro-prices pt-1">
          <span>{{ formatter(product.product_price_sale) }}</span>
          <del
            v-if="product.product_price !== product.product_price_sale"
            class="compare-price d-block pt-2"
            >{{ formatter(product.product_price) }}</del
          >
        </div>
      </div>
    </router-link>

    <ul class="hash-tag-loop">
      <li>Nhập tag hashtag_nội dung hiển thị để show nội dung này</li>
    </ul>

    <!-- Flash sale -->
    <template v-if="type === 'flash_sale' && product.flash_sale">
      <div class="fl_progressbar_group d-flex align-items-center">
        <div class="icon d-flex align-items-center">
          <i class="bi bi-fire"></i>
        </div>
        <span v-if="percentSale >= 90">Sắp cháy hàng</span>
        <span v-else
          >Đã bán <strong>{{ product.flash_sale.quantity_sold }}</strong> sản phẩm</span
        >
      </div>
      <div class="fl_progressbar">
        <div
          class="fl_percent"
          :style="{
            width:
              (product.flash_sale.quantity_sold / product.flash_sale.quantity_sale) *
                100 +
              '%',
          }"
        ></div>
      </div>
    </template>

    <!-- Bottom -->
    <div class="item__bottom">
      <div class="d-flex align-center">
        <!-- <span><i class="bi bi-star-fill" style="color: #f59e0b"></i></span>
        <span class="item__bottom--icon-text">5</span> -->
      </div>
      <div class="d-flex align-center">
        <span class="item__bottom--icon-text">Yêu thích</span>
        <button
          v-if="favoriteItemExist"
          @click="toggleProductFavorite"
          class="ms-2 item__bottom--icon-heart"
        >
          <span><i class="bi bi-heart-fill"></i></span>
        </button>
        <button
          v-else
          @mouseover="setIconFavorite('bi bi-heart-fill')"
          @mouseleave="setIconFavorite('bi bi-heart')"
          @click="toggleProductFavorite"
          class="ms-2 item__bottom--icon-heart"
        >
          <span><i :class="iconFavorite"></i></span>
        </button>
      </div>
    </div>
  </div>
</template>
