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
    imageUrl: "../../assets/images/banner-group-1.webp",
    linkUrl: "/banner-1",
  },
  {
    imageUrl: "../../assets/images/banner-group-2.webp",
    linkUrl: "/banner-2",
  },
  {
    imageUrl: "../../assets/images/banner-group-3.webp",
    linkUrl: "/banner-3",
  },
];
</script>
