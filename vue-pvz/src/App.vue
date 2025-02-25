<script setup>
import TheButton from './components/TheButton.vue';
import TheModal from './components/TheModal.vue';
</script>

<template>
  <div class="twpx-vue-pvz-app">
    <TheButton @clickButton="console.log('showModal')" />
    <TheModal :isOpen="true" @close="console.log('close')" />
  </div>
</template>

<style>
.twpx-vue-pvz-app {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
