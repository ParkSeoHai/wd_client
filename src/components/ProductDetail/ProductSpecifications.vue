<template>
  <div class="bg-color-white">
    <div class="product-property-tab">
      <div class="product-property-tab__title">Thông số kỹ thuật</div>

      <div class="product-property-tab__content" :class="showViewAll ? 'show' : ''">
        <table class="table table-striped product-property-tab__table fs-4">
          <tbody>
            <template v-for="attribute in attributes" :key="attribute._id">
              <tr v-for="item in attribute.details" :key="item._id">
                <td>{{ item.name }}</td>
                <td>{{ item.value }}</td>
              </tr>
            </template>
          </tbody>
        </table>
      </div>

      <div class="view-all-tab">
        <button class="view-all-tab__btn">
          <i class="bi bi-plus-circle view-all-tab__btn--icon"></i>
          Xem cấu hình chi tiết
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
const { attributes } = defineProps(["attributes"]);
</script>
