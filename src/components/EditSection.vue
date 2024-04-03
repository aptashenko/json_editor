<template>
  <div
      class="edit-section"
  >
    <div class="edit-section__body">
      <json-editor
          :data="typeof initData === 'object' ? initData : {[index]: initData}"
          @update="emit('update', $event)"
      />
    </div>
  </div>
</template>

<script setup>
import JsonEditor from "@/components/JsonEditor.vue";

const props = defineProps({
  initData: {
    type: Object,
    required: true
  },
  index: {
    type: Number,
    required: true
  }
})
const emit = defineEmits(['update'])

</script>

<style lang="scss">
.edit-section {



  &__body {
    padding: 0 10px;
  }


}
</style>
