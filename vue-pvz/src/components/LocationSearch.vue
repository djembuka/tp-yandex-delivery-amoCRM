<script setup>
import { useLocationStore } from '@/stores/location';
import ControlComponent from './ControlComponent.vue';
// import { ref } from 'vue';

const locationStore = useLocationStore();

const control = locationStore.control;

function input(args) {
  locationStore.changeControlValue(args);
}

function hints(args) {
  locationStore.getControlHints(args);
}

function clickButton() {
  console.log('click button');
}
</script>

<template>
  <div>
    <div
      class="twpx-ydw-location-form-control"
      data-url="/location/response.json"
      data-method="GET"
    >
      <div class="twpx-ydw-location-form-close"></div>
      <div class="twpx-ydw-location-form-label">Регион доставки</div>
      <input type="text" value="" class="twpx-ydw-location-input" />

      <ControlComponent :control="control" @input="input" @hints="hints" />
      <div class="twpx-ydw-location-dropdown">
        <div class="twpx-ydw-location-dropdown-wrapper"></div>
      </div>
      <div class="twpx-ydw-location-form-hint">
        Выберите пункт, приема заказов Яндекс Доставки, куда вы хотите привезти
        ваш заказ.
      </div>
    </div>
    <div
      class="twpx-ydw-location-btn"
      :class="{ 'twpx-ydw-location-btn--disabled': false }"
      @click="clickButton"
    >
      Выбрать пункт выдачи
    </div>
  </div>
</template>

<style>
.twpx-ydw-location-form-control {
  margin-bottom: 24px;
  position: relative;
}
.twpx-ydw-location-form-label {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 14px;
  color: #80868e;
  position: absolute;
  top: 0;
  left: 14px;
  cursor: text;
  -webkit-transition: color 0.2s ease-out, -webkit-transform 0.2s ease-out,
    -webkit-font-size 0.2s ease-out;
  transition: color 0.2s ease-out, transform 0.2s ease-out,
    font-size 0.2s ease-out;
  -webkit-transform: translateY(1rem);
  transform: translateY(1rem);
  pointer-events: none;
  z-index: 10;
}
.twpx-ydw-location-input {
  border: 1px solid #c6cdd3;
  border-radius: 3px;
  height: 48px;
  line-height: 48px;
  width: 100%;
  padding: 0 40px 0 14px;
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  font-size: 14px;
}
.twpx-ydw-location-input:focus {
  border-color: #8d8d8d;
  outline: none;
}
.twpx-ydw-location-form-control--invalid .twpx-ydw-location-form-label {
  color: #ff0000;
}
.twpx-ydw-location-form-control--invalid .twpx-ydw-location-input {
  background-color: #ffefef;
  border-color: #e38080;
}
.twpx-ydw-location-form-control--active .twpx-ydw-location-form-label {
  -webkit-transform: translateY(3px);
  transform: translateY(3px);
  font-size: 9px;
}
.twpx-ydw-location-form-close {
  width: 20px;
  height: 20px;
  position: absolute;
  top: 50%;
  right: 14px;
  margin-top: -10px;
  cursor: pointer;
  opacity: 0;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
  z-index: -1;
}
.twpx-ydw-location-form-close:before {
  content: '';
  position: absolute;
  top: 9px;
  right: 0px;
  border-top: 2px solid #000;
  width: 20px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  z-index: 10;
}
.twpx-ydw-location-form-close:after {
  content: '';
  position: absolute;
  top: 9px;
  right: 0px;
  border-top: 2px solid #000;
  width: 20px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  z-index: 10;
}
.twpx-ydw-location-form-control--close .twpx-ydw-location-form-close {
  opacity: 1;
  z-index: 10;
}
.twpx-ydw-location-form-control--loading .twpx-ydw-location-form-close {
  opacity: 1;
  z-index: 10;
}
.twpx-ydw-location-form-control--loading .twpx-ydw-location-form-close:after {
  height: 16px;
  width: 16px;
  top: calc(50% - 10px);
  animation: circle 1.3s infinite linear;
  border: 2px solid #ff0000;
  border-radius: 50%;
  border-right-color: transparent;
}
.twpx-ydw-location-form-control--loading .twpx-ydw-location-form-close:before {
  display: none;
}
.twpx-ydw-location-form-close:hover {
  opacity: 0.7;
}
.twpx-ydw-location-form-hint {
  font-size: 12px;
  font-style: normal;
  font-weight: 400;
  line-height: 16px; /* 133.333% */
}
</style>
