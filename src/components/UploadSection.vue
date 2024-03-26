<template>
  <div
      class="upload-section"
  >
    <div>
      <h2 class="upload-section__title">
        Шаг 1. Загузите файл
      </h2>
      <p class="upload-section__subtitle">
        Загрузите исходный файл в формате *.json
      </p>
      <base-input-file
          id="json-data"
          @change="uploadFile"
          class="upload-section__input"
      />
    </div>
  </div>
</template>

<script setup>
import BaseInputFile from "@/components/ui/BaseInputFile.vue";
const emit = defineEmits(['upload-file']);

const uploadFile = event => {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function(e) {
    const content = e.target.result;
    try {
      emit('update:fileName', file.name);
      emit('update:data', JSON.parse(content));
    } catch (err) {
      console.error('Ошибка разбора JSON:', err);
    }
  };

  reader.readAsText(file);
}
</script>

<style lang="scss">
.upload-section {
  text-align: center;
  height: 100%;
  display: grid;
  place-items: center;

  &__title {
    font-weight: 600;
    margin-bottom: 8px;
  }

  &__subtitle {
    font-style: italic;
  }

  &__input {
    margin: 40px auto;
  }
}
</style>
