<script setup>
import HeaderLogo from './svg/HeaderLogo.vue';
</script>

<template>
  <div class="twpx-modal-header">
    <div class="twpx-modal-header-logo">
      <HeaderLogo />
      <span>в другой день</span>
    </div>
    <a href="" class="twpx-modal-header-button">Написать в поддержку</a>
  </div>
</template>

<style>
.twpx-modal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 32px;
  gap: 10px;
  border-radius: 16px;
  background: var(--twpx-vue-pvz-light-grey);
}
.twpx-modal-header-logo {
  display: flex;
  align-items: center;
  gap: 16px;
}
.twpx-modal-header-logo span {
  color: #000;
  font-family: 'PT Sans';
  font-size: 18px;
  font-style: normal;
  font-weight: 700;
  line-height: 18px; /* 100% */
}
a.twpx-modal-header-button {
  display: flex;
  padding: 8px 16px;
  justify-content: center;
  align-items: center;
  gap: 10px;
  border-radius: 8px;
  background: var(--Base-Yellow, #fce000);
  text-align: center;
  font-size: 14px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px; /* 171.429% */
  text-decoration: none;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
a.twpx-modal-header-button:hover {
  opacity: 0.7;
}
</style>
