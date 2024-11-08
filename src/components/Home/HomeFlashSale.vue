<template>
  <!-- Section flash sale -->
  <section id="section-flash-sale">
    <div class="container p-0">
      <div class="bg-flash-sale">
        <!-- Content -->
        <Suspense>
          <template #default>
            <HomeFlashSaleContent />
          </template>
          <template #fallback>
            <p>Loading ...</p>
          </template>
        </Suspense>
        <!-- Bottom -->
        <div class="flash-sale-bottom">
          <div class="link">
            <router-link to="/danh-muc/khuyen-mai" class="btn">
              <span>Xem tất cả</span>
              <i class="bi bi-chevron-double-right"></i>
            </router-link>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
// Component
import HomeFlashSaleContent from "./HomeFlashSaleContent.vue";
</script>
