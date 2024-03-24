<template>
  <span
      class="material-icons"
      :style="[settings]"
  >
    {{name}}
  </span>
</template>

<script setup>
import {computed} from "vue";

const props = defineProps({
  name: {
    type: String
  },
  size: {
    type: String,
    default: 'md'
  },
  color: {
    type: String,
    default: '#111113'
  }
})

const iconSize = computed(() => ({
  sm: '2rem',
  md: '3rem',
  lg: '4rem'
})[props.size])

const settings = computed(() => ({
  'font-size': iconSize.value || props.size,
  color: props.color
}))
</script>
