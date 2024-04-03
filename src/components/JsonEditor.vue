<template>
  <div
      v-for="(value, key) in data"
      :key="path + '.' + key"
      class="json-editor"
      :data-label="typeof value === 'object' ? 'parent' : 'child'"
  >
    <div v-if="!isObjectType(value)" class="json-editor__init-value">
      <p>{{oldData[key]}}</p>
    </div>
    <textarea
        v-if="!isObjectType(value)"
        :id="path + '.' + key"
        v-model="data[key]"
        class="json-editor__input"
        @input="updateValue(key, data[key])"
    />
    <json-editor
        v-else
        :data="value"
        @update-value="updateValue(key, $event)"
        :path="computePath(key)"
    />
  </div>
</template>

<script setup>
import {reactive, toRefs, watch} from "vue";

const props = defineProps({
  data: {
    type: [Object, String],
  },
  path: {
    type: String
  }
})

const emit = defineEmits(['update'])
const oldData = Object.assign({}, props.data);
const { data } = toRefs(props)
const localData = reactive(data);

const updateValue = (key, value) => {
  localData[key] = value;
  emit('update', localData.value)
}
const computePath = key => props.path ? `${props.path}.${key}` : key;

const isObjectType = value => typeof value === 'object' && value !== null;;

</script>

<style lang="scss">
.json-editor {
  &[data-label='child'] {
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    margin-bottom: 10px;
    gap: 20px;

    @media (max-width: 480px) {
      padding: 0;
      display: block;
    }
  }

  &__init-value {
    padding: 5px 0;
  }

  &__input {
    border-radius: 9px;
    padding: 5px;
    resize: vertical;
  }
}
</style>
