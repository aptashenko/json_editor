<template>
  <div
      class="edit-section"
  >
    <p class="edit-section__tips">
      **фразы в фигурных скобках переводить не нужно, пример: {terms}, {email} и т.д.
    </p>
    <div class="edit-section__head">
      <p>
        Ключ (не важно)
      </p>
      <p>
        Исходное значение
      </p>
      <p>
        Новое значение
      </p>
    </div>
    <div class="edit-section__body">
      <json-editor
          :data="fileData"
          @update="updateData"
      />
      <base-button
          @click="downloadFile"
          class="edit-section__button"
      >
        <m-icon name="download" size="1.5rem" color="white" />
        <span data-type="text">Скачать файл</span>
      </base-button>
    </div>
  </div>
</template>

<script setup>
import JsonEditor from "@/components/JsonEditor.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import {ref} from "vue";
import MIcon from "@/components/shared/MIcon.vue";

const props = defineProps({
  initData: {
    type: Object,
    required: true
  },
  fileName: {
    type: String,
    default: 'data.json'
  }
})

const fileData = ref(props.initData)
const updateData = data => {
  fileData.value = data;
}
const downloadFile = () => {
  const data = JSON.stringify(fileData.value);
  const blob = new Blob([data], { type: 'application/json' });
  const url = URL.createObjectURL(blob);
  const a = document.createElement('a');
  a.href = url;
  a.download = props.fileName;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);
  URL.revokeObjectURL(url);
}
</script>

<style lang="scss">
.edit-section {

  &__head {
    position: sticky;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 20px;
    background: burlywood;
    margin-bottom: 10px;
    border-radius: 0 0 10px 10px;

    & p {
      padding: 10px 0px;
      text-align: center;
    }

    @media (max-width: 480px) {
      display: none;
    }
  }

  &__tips {
    margin: 10px;
  }

  &__body {
    padding: 0 10px 20px;
  }

  &__button {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 20px auto 0;
  }
}
</style>
