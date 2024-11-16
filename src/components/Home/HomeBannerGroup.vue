<template>
  <!-- Banner group -->
  <section id="banner-group">
    <div class="container p-0">
      <div class="bg-color-white">
        <div class="row">
          <!-- Item -->
          <HomeBannerGroupItem
            v-for="(bannerItem, index) in listBanners"
            :key="index"
            :bannerObj="bannerItem"
          />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import HomeBannerGroupItem from "./HomeBannerGroupItem.vue";

const listBanners = [
  {
    imageUrl:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:90/plain/https://dashboard.cellphones.com.vn/storage/dknt-oppo-find-x8-home.jpg",
    linkUrl: "/banner-1",
  },
  {
    imageUrl:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/udsv-right-laptop.jpg",
    linkUrl: "/banner-2",
  },
  {
    imageUrl:
      "https://cdn2.cellphones.com.vn/insecure/rs:fill:690:300/q:10/plain/https://dashboard.cellphones.com.vn/storage/right-banner-14-10.jpg",
    linkUrl: "/banner-3",
  },
];
</script>
