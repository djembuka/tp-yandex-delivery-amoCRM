<script>
export default {
  data() {
    return {
      controlId: this.id || this.control.id || null,
      controlName: this.name || this.control.name || null,
      focused: false,
      blured: false,
      warning: '',
      hint: this.control.hint_external,

      activeHintItem: {},
      activeHintArray: [],
      hover: false,
      compare: this.controlValue,
    };
  },
  props: ['control', 'id', 'name'],
  emits: ['input', 'focus', 'blur', 'enter', 'hints'],
  computed: {
    hintItems() {
      return this.control.hints || [];
    },
    placeholder() {
      if (this.focused && (!this.controlValue || !this.controlValue.trim())) {
        return this.control.hint_internal;
      } else {
        return '';
      }
    },
    active() {
      return this.focused || !!this.controlValue.trim();
    },
    invalid() {
      return this.blured && !this.validate();
    },
    disabled() {
      return this.control.disabled;
    },
    validateWatcher() {
      return this.control.validateWatcher;
    },
    focusWatcher() {
      return this.control.focusWatcher;
    },
    isClearable() {
      return this.controlValue !== '' && this.hover && !this.isLoading
        ? true
        : false;
    },
    isLoading() {
      return this.control.loading;
    },
    controlValue: {
      get() {
        if (typeof this.control.value === 'object') {
          return this.control.value.value;
        }
        return this.control.value;
      },
      set(value) {
        this.$emit('input', { value });

        if (this.controlValue.length >= this.control.count) {
          this.$emit('hints', { type: 'get', action: this.control.action });
        } else {
          this.$emit('hints', { type: 'set', value: [] });
        }
      },
    },
  },
  watch: {
    hintItems() {
      this.activeHintArray = this.hintItems.map(() => null);
    },
    validateWatcher() {
      this.blured = true;
    },
    focusWatcher() {
      this.$refs.input.focus();
    },
  },
  methods: {
    mouseenter() {
      this.hover = true;
    },
    mouseleave() {
      this.hover = false;
    },
    clearInput() {
      this.$emit('input', { value: '' });
    },
    enterInput() {
      this.$emit('input', { value: this.activeHintItem });
      this.$emit('hints', { type: 'set', value: [] });
      this.$emit('enter');
    },
    clickHint(hint) {
      this.activeHintItem = hint || {};
      this.$emit('input', { value: this.activeHintItem });
      this.$emit('hints', { type: 'set', value: [] });
      this.mouseleave();

      // this.validate();
    },
    upArrow() {
      let activeIndex = this.activeHintArray.indexOf(true);
      let arr = this.activeHintArray.map((elem) => null);

      if (--activeIndex < 0) {
        activeIndex = this.activeHintArray.length - 1;
      }
      arr[activeIndex] = true;
      this.activeHintArray = arr;
      this.activeHintItem = this.hintItems[activeIndex] || {};
    },
    downArrow() {
      let activeIndex = this.activeHintArray.indexOf(true);
      let arr = this.activeHintArray.map((elem) => null);

      if (++activeIndex > this.activeHintArray.length - 1) {
        activeIndex = 0;
      }
      arr[activeIndex] = true;
      this.activeHintArray = arr;
      this.activeHintItem = this.hintItems[activeIndex] || {};
    },
    focus() {
      this.focused = true;
      this.blured = false;

      this.compare = this.controlValue;
      this.$emit('focus');
    },
    blur() {
      this.focused = false;
      this.blured = true;

      setTimeout(() => {
        if (typeof this.control.value !== 'object') {
          this.controlValue = '';
        }
        this.$emit('hints', { type: 'set', value: [] });
      }, 200);

      this.$emit('blur');

      // setTimeout(() => {
      //   this.validate();
      // }, 100);

      // if (this.controlValue !== this.compare) {
      //   this.$emit('autosave');
      //   bitrixLogs(6, `${this.formControl.label}: ${this.controlValue}`);
      // }
    },
    validate() {
      if (
        (this.control.required && this.control.value.trim()) ||
        !this.control.required
      ) {
        if (this.control.regexp) {
          const match = String(this.control.value.trim()).match(
            RegExp(this.control.regexp)
          );
          if (!match) {
            this.warning = this.control.regexp_description;
          } else {
            this.warning = '';
          }
          return match;
        } else {
          return true;
        }
      } else if (this.control.required && !this.control.value) {
        return false;
      }
      return true;
    },
  },
};
</script>

<template>
  <div
    :class="{
      'twpx-form-control': true,
      'twpx-form-control--hint': true,
      'twpx-form-control--active': active,
      'twpx-form-control--invalid': invalid,
      'twpx-form-control--disabled': disabled,
    }"
    @mouseenter="mouseenter"
    @mouseleave="mouseleave"
  >
    <img
      :src="disabled"
      class="twpx-form-control__disabled-icon"
      v-if="false"
    />

    <div class="twpx-form-control__label">{{ control.label }}</div>

    <input
      type="text"
      :id="controlId"
      :name="controlName"
      v-model="controlValue"
      @focus="focus"
      @blur="blur"
      @keydown.enter.prevent="enterInput"
      @keydown.up.prevent="upArrow()"
      @keydown.down.prevent="downArrow()"
      :disabled="disabled"
      ref="input"
      autocomplete="off"
      :placeholder="placeholder"
      class="twpx-form-control__input"
    />

    <div
      class="twpx-form-control-clear"
      @click.prevent="clearInput()"
      v-show="isClearable"
    ></div>
    <div class="twpx-form-control-loader" v-show="isLoading"></div>

    <div class="twpx-form-control-hint" v-if="hintItems.length">
      <div
        v-for="(hint, index) in hintItems"
        :key="hint"
        :data-id="hint.id"
        :data-value="hint.value"
        :class="{ active: activeHintArray[index] }"
        class="twpx-form-control-hint__item"
        @click.prevent="clickHint(hint)"
      >
        {{ hint.value }}
      </div>
    </div>

    <div
      class="twpx-form-control__warning"
      v-html="warning"
      v-if="warning"
    ></div>

    <div class="twpx-form-control__hint" v-html="hint" v-if="hint"></div>
  </div>
</template>

<style>
.twpx-form-control--hint {
  --aas-primary-color: #074c86;
  --aas-input-right-icon-height: 20px;
  --aas-input-right-icon-width: var(--aas-input-right-icon-height);
  --aas-input-right-icon-top: calc(
    (48px - var(--aas-input-right-icon-height)) / 2
  );
  --aas-input-right-icon-right: calc(
    (48px - var(--aas-input-right-icon-width)) / 2
  );
  position: relative;
  margin-bottom: 16px;
  width: 100%;
}
.twpx-form-control--hint.twpx-form-control--active {
  z-index: 101;
}
.twpx-form-control--hint.twpx-form-control--active .twpx-form-control__label {
  -webkit-transform: translateY(var(--twpx-form-control-active-translate));
  transform: translateY(var(--twpx-form-control-active-translate));
  font-size: 0.69rem;
  color: #2b2b2b;
}
.twpx-form-control--hint .twpx-form-control__disabled-icon {
  position: absolute;
  top: 16px;
  right: 16px;
  width: 16px;
  height: 16px;
  pointer-events: none;
  z-index: 10;
}
.twpx-form-control--hint .twpx-form-control__label {
  position: absolute;
  top: 0;
  left: 14px;
  margin: 0;
  padding: 0;
  color: #2b2b2b;
  font-size: 0.69rem;
  -webkit-transition: -webkit-transform 0.2s ease-out,
    -webkit-font-size 0.2s ease-out;
  transition: transform 0.2s ease-out, font-size 0.2s ease-out;
  -webkit-transform: translateY(1.1rem);
  transform: translateY(1.1rem);
  pointer-events: none;
  line-height: 1.1;
}
.twpx-form-control--hint.twpx-form-control--invalid .twpx-form-control__label {
  color: #ff0000;
}
.twpx-form-control--hint.twpx-form-control--disabled .twpx-form-control__label {
  color: #2b2b2b;
  opacity: 0.3;
}
.twpx-form-control--hint .twpx-form-control-loader {
  position: absolute;
  top: var(--aas-input-right-icon-top);
  right: var(--aas-input-right-icon-right);
  width: var(--aas-input-right-icon-width);
  height: var(--aas-input-right-icon-height);
}
.twpx-form-control--hint .twpx-form-control-loader:after {
  content: '';
  position: absolute;
  height: var(--aas-input-right-icon-height);
  width: var(--aas-input-right-icon-width);
  top: 0;
  right: 0;
  -webkit-animation: vue-hint-loader-circle 1.3s infinite linear;
  animation: vue-hint-loader-circle 1.3s infinite linear;
  border: 1px solid var(--aas-primary-color);
  border-radius: 50%;
  border-right-color: transparent;
}

@-webkit-keyframes vue-hint-loader-circle {
  0% {
    -webkit-transform: rotate(0);
  }
  100% {
    -webkit-transform: rotate(360deg);
  }
}
@keyframes vue-hint-loader-circle {
  0% {
    transform: rotate(0);
  }
  100% {
    transform: rotate(360deg);
  }
}
.twpx-form-control-clear {
  position: absolute;
  top: var(--aas-input-right-icon-top);
  right: var(--aas-input-right-icon-right);
  width: var(--aas-input-right-icon-width);
  height: var(--aas-input-right-icon-height);
  cursor: pointer;
  -webkit-transition: opacity 0.3s ease;
  transition: opacity 0.3s ease;
}
.twpx-form-control-clear:hover {
  opacity: 0.7;
}
.twpx-form-control-clear:before {
  content: '';
  position: absolute;
  top: 9px;
  right: -2px;
  border-top: 1px solid var(--aas-primary-color);
  width: 24px;
  -webkit-transform: rotate(45deg);
  transform: rotate(45deg);
  z-index: 10;
}
.twpx-form-control-clear:after {
  content: '';
  position: absolute;
  top: 9px;
  right: -2px;
  border-top: 1px solid var(--aas-primary-color);
  width: 24px;
  -webkit-transform: rotate(-45deg);
  transform: rotate(-45deg);
  z-index: 10;
}
.twpx-form-control--hint .twpx-form-control__input {
  display: block !important;
  width: 100%;
  margin: 0 !important;
  padding: 0 14px !important;
  background-color: var(--twpx-form-control-background) !important;
  border: 1px solid var(--twpx-form-control-background) !important;
  height: 48px !important;
  line-height: 48px;
  border-radius: 3px !important;
  font-family: 'Open Sans', sans-serif;
  font-size: 14px !important;
  -webkit-transition: border-color 0.3s ease;
  transition: border-color 0.3s ease;
  outline: none !important;
  box-shadow: none !important;
  box-sizing: border-box !important;
}
.twpx-form-control--hint .twpx-form-control__input:focus,
.twpx-form-control--hint .twpx-form-control__input:hover {
  outline: none !important;
  border-color: var(--twpx-form-control-border) !important;
}
.twpx-form-control--hint.twpx-form-control--invalid .twpx-form-control__input {
  background-color: #fff5f5 !important;
  border-color: #e38080 !important;
  outline: none !important;
  color: #ff0000 !important;
}
.twpx-form-control--hint.twpx-form-control--disabled .twpx-form-control__input {
  color: #00000055;
  pointer-events: none;
  background-color: var(--twpx-form-control-background) 55 !important;
  border: 1px solid var(--twpx-form-control-background) 55 !important;
}
.twpx-form-control--hint .twpx-form-control__warning,
.twpx-form-control--hint .twpx-form-control__hint {
  font-size: 9pt;
  margin: 5px;
  line-height: 1.1;
}
.twpx-form-control--hint .twpx-form-control__warning {
  color: #ff0000;
}

.twpx-form-control-hint {
  position: absolute;
  top: calc(100% + 1px + 3px);
  left: 0;
  width: 100%;
  background: #fff;
  box-shadow: 0 5px 10px #0000000d;
  border-radius: 0 0 5px 5px;
  font-size: 14px;
  line-height: 1.2;
  z-index: 50;
}

.twpx-form-control-hint__item {
  display: flex;
  align-items: center;
  justify-content: flex-start;
  padding: 20px;
}

.twpx-form-control-hint__item:hover,
.twpx-form-control-hint__item.active {
  background-color: var(--twpx-form-control-background);
  color: #5f7696;
  cursor: pointer;
}

.twpx-form-control-hint__item:first-child {
  margin-top: 0.5rem;
}

.twpx-form-control-hint__item:last-child {
  margin-bottom: 0.5rem;
}
</style>
