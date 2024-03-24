<template>
  <div
      v-for="(value, key) in data"
      :key="path + '.' + key"
      class="json-editor"
      :data-label="typeof value === 'string' ? 'child' : 'parent'"
  >
    <label
        v-if="typeof value === 'string'"
        :for="path + '.' + key"
        class="json-editor__label"
    >
      {{ key }}
    </label>
    <input
        v-if="!isObjectType(value)"
        :value="oldData[key]"
        disabled
        type="text"
        class="json-editor__input"
    />
    <input
        v-if="!isObjectType(value)"
        :id="path + '.' + key"
        v-model="data[key]"
        @input="updateValue(key, data[key])"
        type="text"
        class="json-editor__input"
    />
    <json-editor
        v-else
        :data="value"
        @update-value="updateNestedValue(key, $event)"
        :path="computePath(key)"
    />
  </div>
</template>

<script setup>
import {reactive, ref, toRefs, watch} from "vue";

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

watch(localData, newValue => {
  emit('update', newValue)
}, {deep: true})

const updateValue = (key, value) => {
  localData[key] = value;
}

const updateNestedValue = (key, value) => {
  localData[key] = value
}

const computePath = key => props.path ? `${props.path}.${key}` : key;

const isObjectType = value => typeof value === 'object' && value !== null;;

</script>

<style lang="scss">
.json-editor {
  &[data-label='child'] {
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    margin-bottom: 10px;
    gap: 20px;

    @media (max-width: 480px) {
      padding: 0;
      display: block;
    }
  }
  &[data-label='child'] label {
    text-transform: capitalize;
    display: flex;
    align-items: center;
    cursor: pointer;
    transition: all .25s ease;
    padding: 0 10px;

    &:hover {
      background: rgba(173, 255, 47, 0.2);
    }

    @media (max-width: 480px) {
      display: none;
    }
  }
  &[data-label='child'] input {
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #111113;
    transition: all .25s ease;
    width: 100%;

    @media (max-width: 480px) {
      margin-top: 10px;
    }

    &:hover {
      border: 1px solid green;
      background: rgba(173, 255, 47, 0.2);
    }

    &:focus {
      background: rgba(173, 255, 47, 0.2);
      outline: none;
    }

    &:disabled {
      background: rgba(128, 128, 128, 0.35);
      border: none;
    }
  }
}
</style>
