<template>
  <!-- Section product -->
  <section class="section_collection_group">
    <div class="container p-0">
      <div>
        <div class="row">
          <div class="col-6">
            <Suspense>
              <template #default>
                <!-- Sản phẩm mới -->
                <HomeCollectionGroupItem
                  :title="'Sản phẩm mới'"
                  :linkHref="'/san-pham-moi'"
                  :urlApi="`${urlApi}/api/v1/product/new/all`"
                />
              </template>
              <template #fallback>
                <p>Loading ...</p>
              </template>
            </Suspense>
          </div>

          <div class="col-6">
            <Suspense>
              <template #default>
                <!-- Sản phẩm bán chạy -->
                <HomeCollectionGroupItem
                  :title="'Sản phẩm bán chạy'"
                  :linkHref="'/san-pham-ban-chay'"
                  :urlApi="`${urlApi}/api/v1/product/new/all?limit=10`"
                />
              </template>
              <template #fallback>
                <p>Loading ...</p>
              </template>
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { inject } from "vue";
import HomeCollectionGroupItem from "./HomeCollectionGroupItem.vue";

const urlApi = inject("url_api");
</script>
