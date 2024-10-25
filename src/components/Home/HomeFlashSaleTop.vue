<template>
  <div class="flash-sale-top d-flex align-items-center justify-content-between">
    <h2 class="title d-flex">
      <span>
        <img src="../../assets/images/flashsale-hot.webp" alt="" />
        SẢN PHẨM KHUYẾN MẠI
      </span>
    </h2>
    <div class="list-item-notify">
      <div class="marquee">
        <ul class="list-product-suggess d-flex">
          <li class="item">
            <a href="#"><span>12 Pro Max Giảm 800K</span></a>
          </li>
          <li class="item">
            <a href="#"><span>Xả Kho Xiaomi Giá Cực SỐC</span></a>
          </li>
          <li class="item">
            <a href="#"><span>12 Pro Max Giảm 800K</span></a>
          </li>
          <li class="item">
            <a href="#"><span>Xả Kho Xiaomi Giá Cực SỐC</span></a>
          </li>
          <li class="item">
            <a href="#"><span>12 Pro Max Giảm 800K</span></a>
          </li>
          <li class="item">
            <a href="#"><span>Xả Kho Xiaomi Giá Cực SỐC</span></a>
          </li>
        </ul>
      </div>
    </div>

    <div class="countdown-deal">
      <ul class="list d-flex gap-2">
        <li class="item">
          <strong class="days">{{ props.flashSaleObj.day }}</strong>
          <small>Ngày</small>
        </li>
        <li class="item">
          <strong class="hours">{{ props.flashSaleObj.hour }}</strong>
          <small>Giờ</small>
        </li>
        <li class="item">
          <strong class="minutes">{{ props.flashSaleObj.minute }}</strong>
          <small>Phút</small>
        </li>
        <li class="item">
          <strong class="seconds">{{ props.flashSaleObj.second }}</strong>
          <small>Giây</small>
        </li>
      </ul>
    </div>
  </div>
</template>

<script setup>
const props = defineProps(['flashSaleObj'])
</script>
