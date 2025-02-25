<script>
import ControlHint from './ControlHint.vue';

export default {
  data() {
    return {
      id: `PROPERTY_${this.control.id}`,
      name: `PROPERTY_${this.control.id}`,
      componentType: `${this.control.property}${
        this.control.type ? '-' + this.control.type : ''
      }`,
    };
  },
  components: {
    ControlHint,
  },
  props: ['control'],
  emits: ['input', 'focus', 'blur', 'hints'],
  methods: {
    componentName() {
      return `control-${this.componentType}`;
    },
    inputAddControl(args) {
      this.$emit('input', {
        ...args,
        control: this.control,
      });
    },
    focusAddControl() {
      this.$emit('focus', {
        control: this.control,
      });
    },
    blurAddControl() {
      this.$emit('blur', {
        control: this.control,
      });
    },
    enterAddControl() {
      this.$emit('enter', {
        control: this.control,
      });
    },
    hintsAddControl(args) {
      this.$emit('hints', {
        ...args,
        control: this.control,
      });
    },
  },
};
</script>

<template>
  <component
    :is="componentName()"
    :control="control"
    :id="id"
    :name="name"
    @input="inputAddControl"
    @focus="focusAddControl"
    @blur="blurAddControl"
    @enter="enterAddControl"
    @hints="hintsAddControl"
  ></component>
</template>

<style>
.twpx-form-control {
  --twpx-form-control-background: #f0f5fc;
  --twpx-form-control-border: #4f74d1;
  --twpx-form-control-active-translate: -22px;
  --twpx-form-control-padding-x: 14px;
  --twpx-form-control-border-radius: 5px;
}
</style>
