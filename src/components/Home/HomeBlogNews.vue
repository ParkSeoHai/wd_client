<template>
  <!-- Section home blog -->
  <section class="section-home-blog">
    <div class="group-blog">
      <div class="row">
        <!-- News Left -->
        <div class="item-blog col-lg-8">
          <div class="bg-color-white">
            <div class="top-head d-flex justify-content-between align-items-center">
              <h2>Tin tức mới</h2>
              <a href="#">
                <span>Xem tất cả</span>
                <i class="bi bi-chevron-double-right"></i>
              </a>
            </div>
            <div class="blog-body row">
              <!-- Left  -->
              <div class="col-12 col-sm-6">
                <div class="content">
                  <router-link to="/tin-tuc/news-1">
                    <img
                      src="https://cdn-media.sforum.vn/storage/app/media/trannghia/iPhone-XS-Max-san-pham-cu.jpg"
                      alt=""
                    />
                  </router-link>

                  <h3 class="title">
                    <router-link to="/tin-tuc/news-1">
                      So sánh Apple Watch Ultra vs Watch Series 8: Đâu là lựa chọn tốt
                      nhất?
                    </router-link>
                  </h3>
                  <p class="desc">
                    Apple Watch Ultra vs Watch Series 8 có gì khác biệtApple Watch Ultra
                    và Watch Series 8 là 2 mẫu đồng hồ thông minh
                  </p>
                  <div class="time d-flex align-items-center">
                    <i class="bi bi-calendar3 icon"></i>
                    <span>11/05/2023</span>
                  </div>
                </div>
              </div>
              <!-- Right  -->
              <div class="col-12 col-sm-6">
                <!-- Item -->
                <HomeBlogNewsItem
                  v-for="blogNewsItem in listNews1"
                  :key="blogNewsItem.id"
                  :newsObj="blogNewsItem"
                />
              </div>
            </div>
          </div>
        </div>
        <!-- News right -->
        <div class="item-blog col-lg-4">
          <div class="bg-color-white">
            <div class="top-head d-flex justify-content-between align-items-center">
              <h2>Tin tức công nghệ</h2>
              <a href="#">
                <span>Xem tất cả</span>
                <i class="bi bi-chevron-double-right"></i>
              </a>
            </div>

            <div class="blog-body">
              <div class="row">
                <div
                  class="col-sm-6 col-lg-12"
                  v-for="blogNewsItem in listNews2"
                  :key="blogNewsItem.id"
                >
                  <!-- Item -->
                  <HomeBlogNewsItem :newsObj="blogNewsItem" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component
import HomeBlogNewsItem from "./HomeBlogNewsItem.vue";

const listNews1 = [
  {
    id: 1,
    title: "Realme GT Neo 5 ra mắt với chip Snapdragon đầu 8, sạc nhanh 240W",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/trannghia/Oppo-Reno-13-Series-anh-thuc-te-cover.jpg",
    linkUrl: "/tin-tuc/news-2",
    time: "02/08/2003",
  },
  {
    id: 2,
    title: "Rò rỉ ảnh chụp thực tế của camera Samsung Galaxy S23 Ultra",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/ctvseo_12/cach-tang-dung-luong-iphone-16gb-len-32gb.jpg",
    linkUrl: "/tin-tuc/news-3",
    time: "26/12/2023",
  },
  {
    id: 3,
    title: "MacBook Air 2023 sẽ mang đến những tính năng mới nào khi ra mắt?",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/ctvseo_12/cach-cai-nhac-chuong-cho-iphone-bang-garageband.jpg",
    linkUrl: "/tin-tuc/news-4",
    time: "11/05/2023",
  },
  {
    id: 4,
    title: "Redmi Note 12 Turbo thiết bị bán chạy nhất trong tháng đầu tiên bán ra!",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/trannghia/OnePlus-Magnetic-Power-Bank-1.jpg",
    linkUrl: "/tin-tuc/news-5",
    time: "20/08/2023",
  },
];

const listNews2 = [
  {
    id: 1,
    title: "Realme GT Neo 5 ra mắt với chip Snapdragon đầu 8, sạc nhanh 240W",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/doanphuong/tinh-nang-giam-gian-doan-tren-iphone-la-gi-va-cach-dung-hieu-qua/tinh-nang-giam-gian-doan-tren-iphone-la-gi-va-cach-dung-hieu-qua-bg.jpg",
    linkUrl: "/tin-tuc/news-6",
    time: "02/08/2003",
  },
  {
    id: 2,
    title: "Rò rỉ ảnh chụp thực tế của camera Samsung Galaxy S23 Ultra",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/trannghia/Apple-iPhone-15-doanh-so-1.jpg",
    linkUrl: "/tin-tuc/news-7",
    time: "26/12/2023",
  },
  {
    id: 3,
    title: "MacBook Air 2023 sẽ mang đến những tính năng mới nào khi ra mắt?",
    image: "https://cdn-media.sforum.vn/storage/app/media/ctvseo_12/so-sanh-iphone.jpg",
    linkUrl: "/tin-tuc/news-8",
    time: "11/05/2023",
  },
  {
    id: 4,
    title: "Redmi Note 12 Turbo thiết bị bán chạy nhất trong tháng đầu tiên bán ra!",
    image:
      "https://cdn-media.sforum.vn/storage/app/media/ctvseo_12/man-hinh-iphone-bi-cham-xanh.jpg",
    linkUrl: "/tin-tuc/news-9",
    time: "20/08/2023",
  },
];
</script>
