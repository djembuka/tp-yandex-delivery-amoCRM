import { ref } from 'vue';
import { defineStore } from 'pinia';

export const useLocationStore = defineStore('location', () => {
  const control = ref({
    property: 'hint',
    id: 'id5',
    name: 'OBJECT',
    label: 'ORNZ',
    value: '',
    count: 3,
    action: '/markup/vue/design-system/hints.json',
    required: false,
    disabled: false,
    hints: [],
  });

  function changeControlValue({ control, value }) {
    control.value = value;
  }

  function getControlHints({ control, value, type }) {
    console.log(type);
  }

  return { control, changeControlValue, getControlHints };
});
