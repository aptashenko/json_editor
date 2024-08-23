<template>
  <component
    :is="component"
    :to="to"
    :href="href"
    :data-disabled="isDisabled"
    :class="computedClasses"
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
  heading: {
    type: Boolean,
  },
});

const component = computed(() => {
  return (props.to && 'router-link') || (props.href && 'a') || props.tag;
});

const isDisabled = computed(() => Boolean(props.disabled || props.loading));

const mainClass = computed(() => {
  if (props.icon) return 'base-text-button--heading';
});
const computedClasses = computed(() => ['base-text-button', mainClass.value]);
</script>

<style lang="scss" scoped>
.btn {
  display: inline-block;
  padding: 0;
  background-color: transparent;
  border: none;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;

  transition: all 0.25s ease;
  cursor: pointer;

  &[data-disabled='true'] {
    opacity: 0.6;
    pointer-events: none !important;
  }

  &--heading {
    display: block;
    font-size: 24px;
    text-decoration: none;
    color: #333;
  }
}
</style>
