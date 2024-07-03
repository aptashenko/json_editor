<template>
  <div class="the-notification">
    <button
        class="the-notification__close"
        @click="closeNotify"
    >
      <span>
        <svg-icon name="cancel_notify" />
      </span>
    </button>
    <div class="the-notification__body">
      <h2 class="plain plex-large">
        {{ title }}
      </h2>
      <p class="plain plex-medium">
        {{ text }}
      </p>
    </div>
    <div
        class="the-notification__progress"
        :style="{ width: width + '%' }"
    />
  </div>
</template>
<script setup>
import SvgIcon from '@/components/shared/SvgIcon.vue';
import {computed, onBeforeUnmount, onMounted, ref} from 'vue';
import { useNotification } from '@/composables/useNotification.js';
const { toggleShow } = useNotification();
const props = defineProps({
  title: { type: String, default: '' },
  text: { type: String, default: '' },
  type: { type: String, default: 'error'}
});
let intervalId;
const width = ref(100);
const delay = 8000;
const decrementRate = width.value / delay;

const closeNotify = () => {
  toggleShow();
};

const startInterval = () => {
  intervalId = setInterval(() => {
    width.value -= decrementRate * 10;
    width.value = Math.max(width.value, 0);
    if (width.value <= 0) {
      clearInterval(intervalId);
      closeNotify();
    }
  }, 1);
};

onMounted(startInterval);

onBeforeUnmount(() => {
  clearInterval(intervalId);
});
</script>

<style lang="scss" scoped>
.the-notification {
  position: fixed;
  bottom: 40px;
  left: 50%;

  transform: translateX(-50%);

  width: 100%;

  border-radius: 8px;
  background: #fff;
  border: 1px solid #48cae4;
  box-shadow:
      0px 16px 24px 0px rgba(0, 0, 0, 0.14),
      0px 6px 30px 0px rgba(0, 0, 0, 0.12),
      0px 8px 10px 0px rgba(0, 0, 0, 0.2);
  padding: 12px 16px;
  overflow: hidden;
  max-width: 335px;
  margin: 0 auto;

  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;

  z-index: 100;

  &__progress {
    position: absolute;
    bottom: -10px;
    left: 0;
    width: 100%;
    height: 14px;
    border-radius: 10px;
    transition: all 0.25s linear;
    background: #FF4F4F;
  }

  &__close {
    position: relative;
    flex-shrink: 0;
    background: transparent;
    border: none;
    margin: 0;
    display: flex;
    border-radius: 50%;
    padding: 4px;

    &::before {
      content: '';
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      width: 240px;
      height: 240px;
      pointer-events: none;
    }


    & span {
      display: flex;
      border-radius: 50%;


      & svg {
        cursor: pointer;
        width: 24px;
        height: 24px;
      }
    }
  }

  &__body {
    flex-grow: 1;

    & h2 {
      font-weight: 700 !important;
      line-height: 22px !important;
    }

    & p {
      font-size: 14px !important;
      line-height: 1.5 !important;
      font-weight: 400 !important;
    }
  }
}
</style>
