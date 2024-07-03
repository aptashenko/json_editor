<template>
  <transition v-bind="globalNotification.props.transition" @after-leave="close">
    <component
      v-if="globalNotification.showContent"
      :is="globalNotification.component"
      v-bind="globalNotification.props"
    />
  </transition>
</template>

<script setup>
import { onMounted, onUnmounted } from 'vue';
import { useNotification } from '@/composables/useNotification.js';

const { close, globalNotification, toggleShow } = useNotification();
const keydownListener = (event) => {
  if (event.key === 'Escape') toggleShow();
};

onMounted(() => {
  document.addEventListener('keydown', keydownListener);
  toggleShow();
});

onUnmounted(() => {
  document.removeEventListener('keydown', keydownListener);
});
</script>

<style lang="scss" scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 1s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>
