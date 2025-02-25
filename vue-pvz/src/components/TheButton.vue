<script setup></script>

<template>
  <button id="twpxVuePvzButton" @click.prevent="$emit('clickButton')">
    Button
  </button>
</template>

<style scoped>
#twpxVuePvzButton {
  display: flex;
  padding: 16px 32px;
  justify-content: center;
  align-items: center;
  border-radius: 8px;
  border: 0;
  background: var(--twpx-vue-pvz-red);
  color: var(--twpx-vue-pvz-white);
  text-align: center;
  font-family: 'PT Sans';
  font-size: 16px;
  font-style: normal;
  font-weight: 700;
  line-height: 24px;
  cursor: pointer;
  -webk-t-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
#twpxVuePvzButton:hover {
  opacity: 0.7;
}
</style>
