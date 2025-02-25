<script setup>
import { ref } from 'vue';
import TheModalHeader from './TheModalHeader.vue';

const emit = defineEmits(['close']);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
});

// Modal

const showModalFlag = ref(false);

// function showModal() {
//   showModalFlag.value = true;
// }

function closeModal(event) {
  emit('close');
  showModalFlag.value = false;
}
</script>

<template>
  <div v-if="isOpen" class="twpx-modal-overlay" @click="closeModal">
    <div class="twpx-modal-content" @click.stop>
      <TheModalHeader />
      <RouterView />
    </div>
  </div>
</template>

<style>
.twpx-modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: #ffffff80;
  z-index: 1000;
}
.twpx-modal-content {
  display: flex;
  width: calc(100% - 16px * 2);
  max-width: 1024px;
  padding: 16px;
  flex-direction: column;
  align-items: stretch;
  gap: 16px;
  border-radius: 24px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  margin: 100px auto 0;
}
</style>
