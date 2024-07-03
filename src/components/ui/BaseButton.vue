<template>
  <button class="base-button">
    <slot />
  </button>
</template>

<script setup>
defineProps({
  label: {
    type: String
  }
})
</script>

<style lang="scss">
.base-button {
  background: #0077b6;
  color: #fff;
  border: none;
  padding: 16px 24px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: 600;
  transition: all .25s ease;

  &:hover {
    background: rgba(0, 119, 182, 0.85);
  }

  & span[data-type='text'] {
    font-weight: inherit;
    font-style: inherit;
    font-size: inherit;
    font-family: inherit;
  }
}
</style>
