<script setup>
import NewsItem from "@/components/News/NewsItem.vue";
</script>
<template>
  <section id="section-news">
    <div class="row">
      <div class="col-2">
        <nav class="news-nav">
          <ul>
            <li class="nav-item d-flex align-items-center justify-content-between">
              <p class="d-flex align-items-center nav-text">
                <i class="bi bi-house icon"></i>
                <span>Trang chủ</span>
              </p>
            </li>
            <li class="nav-item d-flex align-items-center justify-content-between">
              <p class="d-flex align-items-center nav-text">
                <i class="bi bi-journal-bookmark icon"></i>
                <span>Tin công nghệ</span>
              </p>
              <span class="icon-right"><i class="bi bi-chevron-right"></i></span>
            </li>
          </ul>
        </nav>
      </div>
      <div class="col-10">
        <news-item></news-item>
      </div>
    </div>
  </section>
</template>
