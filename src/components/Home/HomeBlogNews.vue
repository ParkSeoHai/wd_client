<template>
  <!-- Section home blog -->
  <section class="section-home-blog">
    <div class="container p-0">
      <div class="group-blog">
        <div class="row">
          <!-- News Left -->
          <div class="item-blog col-8">
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
                <div class="col-6">
                  <div class="content">
                    <img src="../../assets/images/blog-1.webp" alt="" />
                    <h3 class="title">
                      <a href="#">
                        So sánh Apple Watch Ultra vs Watch Series 8: Đâu là lựa chọn tốt nhất?
                      </a>
                    </h3>
                    <p class="desc">
                      Apple Watch Ultra vs Watch Series 8 có gì khác biệtApple Watch Ultra và Watch
                      Series 8 là 2 mẫu đồng hồ thông minh
                    </p>
                    <div class="time d-flex align-items-center">
                      <i class="bi bi-calendar3 icon"></i>
                      <span>11/05/2023</span>
                    </div>
                  </div>
                </div>
                <!-- Right  -->
                <div class="col-6">
                  <!-- Item -->
                  <HomeBlogNewsItem v-for="blogNewsItem in listNews1" :key="blogNewsItem.id" :newsObj="blogNewsItem" />
                </div>
              </div>
            </div>
          </div>
          <!-- News right -->
          <div class="item-blog col-4 ps-0">
            <div class="bg-color-white">
              <div class="top-head d-flex justify-content-between align-items-center">
                <h2>Tin tức công nghệ</h2>
                <a href="#">
                  <span>Xem tất cả</span>
                  <i class="bi bi-chevron-double-right"></i>
                </a>
              </div>

              <div class="blog-body">
                <!-- Item -->
                <HomeBlogNewsItem v-for="blogNewsItem in listNews2" :key="blogNewsItem.id" :newsObj="blogNewsItem" />
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
import HomeBlogNewsItem from './HomeBlogNewsItem.vue'

const listNews1 = [
  {
    id: 1,
    title: 'Realme GT Neo 5 ra mắt với chip Snapdragon đầu 8, sạc nhanh 240W',
    image: 'src/assets/images/blog-news-1.webp',
    linkUrl: '/1',
    time: '02/08/2003'
  },
  {
    id: 2,
    title: 'Rò rỉ ảnh chụp thực tế của camera Samsung Galaxy S23 Ultra',
    image: 'src/assets/images/blog-news-3.webp',
    linkUrl: '/2',
    time: '26/12/2023'
  },
  {
    id: 3,
    title: 'MacBook Air 2023 sẽ mang đến những tính năng mới nào khi ra mắt?',
    image: 'src/assets/images/blog-news-4.webp',
    linkUrl: '/3',
    time: '11/05/2023'
  },
  {
    id: 4,
    title: 'Redmi Note 12 Turbo thiết bị bán chạy nhất trong tháng đầu tiên bán ra!',
    image: 'src/assets/images/blog-news-2.webp',
    linkUrl: '/4',
    time: '20/08/2023'
  }
]

const listNews2 = [
  {
    id: 1,
    title: 'Realme GT Neo 5 ra mắt với chip Snapdragon đầu 8, sạc nhanh 240W',
    image: 'src/assets/images/blog-news-1.webp',
    linkUrl: '/1',
    time: '02/08/2003'
  },
  {
    id: 2,
    title: 'Rò rỉ ảnh chụp thực tế của camera Samsung Galaxy S23 Ultra',
    image: 'src/assets/images/blog-news-3.webp',
    linkUrl: '/2',
    time: '26/12/2023'
  },
  {
    id: 3,
    title: 'MacBook Air 2023 sẽ mang đến những tính năng mới nào khi ra mắt?',
    image: 'src/assets/images/blog-news-4.webp',
    linkUrl: '/3',
    time: '11/05/2023'
  },
  {
    id: 4,
    title: 'Redmi Note 12 Turbo thiết bị bán chạy nhất trong tháng đầu tiên bán ra!',
    image: 'src/assets/images/blog-news-2.webp',
    linkUrl: '/4',
    time: '20/08/2023'
  }
]
</script>
