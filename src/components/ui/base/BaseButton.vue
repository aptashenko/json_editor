<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :disabled="isDisabled"
    :class="[mainClass]"
  >
    <slot />
  </component>
</template>

<script setup>
import { computed } from 'vue';

const props = defineProps({
  tag: {
    type: String,
    default: 'button',
  },
  to: {
    type: [Object, String],
    default: null,
  },
  href: {
    type: String,
    default: null,
  },
  loading: {
    type: Boolean,
    default: false,
  },
  disabled: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: 'button',
  },
});

const component = computed(
  () => (props.to && 'router-link') || (props.href && 'a') || props.tag
);

const isDisabled = computed(() =>
  Boolean(props.disabled || props.loading || null)
);

const mainClass = computed(
  () =>
    ({
      button: 'base-button',
      icon: 'base-button-icon',
    })[props.type]
);
</script>

<style lang="scss" scoped>
.base-button {
  padding: 8px;
  background: #eca36e;
  color: #fff;
  text-align: center;
  transition: all 0.25s ease;
  cursor: pointer;

  &[disabled='true'] {
    opacity: 0.6;
    pointer-events: none !important;
  }
}

.base-button-icon {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  padding: 8px;

  border: none;
  border-radius: 6px;
  background: gray;
  cursor: pointer;

  &[disabled='true'] {
    opacity: 0.6;
    pointer-events: none !important;
  }
}
</style>
