<template>
  <!-- Banner group -->
  <section id="banner-group">
    <div class="bg-color-white banner-group__block">
      <div class="">
        <div
          class="banner-list"
          :style="[`grid-template-columns: repeat(${listBanners.length}, 1fr);`]"
        >
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
    imageUrl: "https://hbmedia.com.vn/wp-content/uploads/2019/09/Banner_2.jpg",
    linkUrl: "#",
  },
  {
    imageUrl:
      "https://bizweb.dktcdn.net/100/460/635/themes/869995/assets/share_fb_home.jpg?1730777390214",
    linkUrl: "#",
  },
  {
    imageUrl:
      "https://bh19.bantheme.com/wp-content/uploads/2019/11/slide-iPhone-XS-max-VNA.jpg",
    linkUrl: "#",
  },
  {
    imageUrl:
      "https://stcv4.hnammobile.com/uploads/news/large/iphone-14-series-luon-co-san-hang-giao-ngay-khong-can-doi-social.jpg?v=1668565357",
    linkUrl: "#",
  },
];
</script>
