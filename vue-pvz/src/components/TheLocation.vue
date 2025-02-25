<script setup>
import LocationSearch from './LocationSearch.vue';
</script>

<template>
  <div class="twpx-ydw-location">
    <div class="twpx-ydw-location-error">
      <div class="twpx-ydw-location-error-content">
        Не найден номер заказа.<br />Ошибка в ключе Яндекс Карт<br />Не найден
        пункт самопривоза.
      </div>
    </div>
    <div class="twpx-ydw-location-title">Выберите регион доставки</div>
    <div class="twpx-ydw-location-text">
      Для того, чтобы ускорить загрузку точек самовывоза, уточните город
      отправления.
    </div>
    <LocationSearch />
  </div>
</template>

<style>
.twpx-ydw-location {
  font-size: 14px;
  display: flex;
  padding: 32px;
  flex-direction: column;
  gap: 16px;
  border-radius: 16px;
  background: var(--twpx-vue-pvz-light-grey);
}
/*
.twpx-ydw-location--error .twpx-ydw-location-form {
  display: none;
} */
.twpx-ydw-location-title {
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px;
}
.twpx-ydw-location-text {
  font-size: 14px;
  font-style: normal;
  font-weight: 400;
  line-height: 18px; /* 128.571% */
}

.twpx-ydw-location-error {
  background: transparent linear-gradient(90deg, #d50303 0%, #9d0000 100%) 0% 0%
    no-repeat padding-box;
  border-radius: 3px;
  padding: 16px 16px 16px 64px;
  color: #fff;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  font-size: 14px;
  position: relative;
  margin-bottom: 24px;
  align-items: center;
  display: none;
}
.twpx-ydw-location--error .twpx-ydw-location-error {
  display: flex;
}
.twpx-ydw-location-error img,
.twpx-ydw-location-error svg {
  position: absolute;
  width: 24px;
  height: 24px;
  top: calc(50% - 12px);
  left: 20px;
  z-index: 10;
}
.twpx-ydw-location-error a {
  color: #fff;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
.twpx-ydw-location-error a:hover {
  color: #fff;
  opacity: 0.7;
}

@keyframes circle {
  0% {
    -webkit-transform: rotate(0);
    transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
    transform: rotate(360deg);
  }
}

.twpx-ydw-location-dropdown {
  position: relative;
}
.twpx-ydw-location-dropdown-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  background-color: #fff;
  z-index: 10;
}
.twpx-ydw-location-dropdown-item {
  min-height: 48px;
  padding: 14px;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #000;
  border-bottom: 1px solid #eee;
  opacity: 0.7;
  cursor: pointer;
}
.twpx-ydw-location-dropdown-item:last-child {
  border-bottom: none;
}
.twpx-ydw-location-dropdown-item:hover,
.twpx-ydw-location-dropdown-item.twpx-ydw-location-dropdown-item--active {
  opacity: 1;
}
.twpx-ydw-location-btn {
  border-radius: 7px;
  height: 64px;
  display: flex;
  align-items: center;
  justify-content: center;
  font-family: Arial, Helvetica, sans-serif;
  font-size: 16px;
  cursor: pointer;
  background-color: #fc3f1d;
  color: #ffffff;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
.twpx-ydw-location-btn:hover {
  opacity: 0.7;
}
.twpx-ydw-location-btn.twpx-ydw-location-btn--disabled {
  background-color: #ededed;
  color: #a7abb1;
  cursor: default;
  pointer-events: none;
}
.twpx-ydw-location-back {
  color: #000;
  font-size: 12px;
  font-family: 'Open Sans', Arial, Helvetica, sans-serif;
  background-color: #e5e5e5;
  border-radius: 7px;
  line-height: 40px;
  height: 40px;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  text-align: center;
  cursor: pointer;
  margin: 65px 0 30px;
  position: relative;
}
.twpx-ydw-location-back:hover {
  opacity: 0.7;
}
.twpx-ydw-location-back svg {
  position: absolute;
  top: calc(50% - 5px);
  left: 14px;
  width: 7px;
  height: 10px;
  z-index: 10;
}
</style>
