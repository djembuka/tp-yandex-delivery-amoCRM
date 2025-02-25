<script>
export default {
  props: {
    isOpen: {
      type: Boolean,
      required: true,
    },
    page: {
      type: String,
      required: true,
    },
  },
  computed: {
    currentPage() {
      return () => import(`@/views/${this.page}.vue`);
    },
  },
  methods: {
    closeModal() {
      this.$emit('close');
    },
  },
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 8px;
  max-width: 500px;
  width: 100%;
}
</style>

<script setup>
import { ref, computed } from 'vue';

defineEmits(['close']);

const props = defineProps({
  isOpen: {
    type: Boolean,
    required: true,
  },
  page: {
    type: String,
    required: true,
  },
});

const currentPage = computed(() => {
  return () => import(`@/views/${this.page}.vue`);
});

// Modal

const showModalFlag = ref(false);

function showModal() {
  showModalFlag.value = true;
}

function closeModal(event) {
  this.$emit('close');
  showModalFlag.value = false;
}
</script>

<template>
  <div v-if="isOpen" class="twpx-modal-overlay" @click="closeModal">
    <div class="twpx-modal-content" @click.stop>
      <component :is="currentPage" @close="closeModal" />
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
.twpx-modal-body {
  display: flex;
  width: calc(100% - 16px * 2);
  max-width: 1024px;
  padding: 16px;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  border-radius: 16px;
  background: #fff;
  box-shadow: 0px 4px 4px 0px rgba(0, 0, 0, 0.05);
  margin: 100px auto 0;
}
</style>
