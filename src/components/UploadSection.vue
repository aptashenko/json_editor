<template>
  <div
      class="upload-section"
  >
    <div>
      <h2 class="upload-section__title">
        Шаг 1. Загузите файл
      </h2>
      <p class="upload-section__subtitle">
        Загрузите исходный файл в формате *.json или *.zip
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
import JSZip from "jszip";
import BaseInputFile from "@/components/ui/BaseInputFile.vue";
import {ref} from "vue";
const emit = defineEmits(['upload-file']);
const allFiles = ref([])
const uploadFile = event => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    if (file.type.includes('json')) {

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

    } else if (file.type.includes('zip')) {
      reader.onload = function(ev) {
        const zip = new JSZip();
        zip.loadAsync(ev.target.result).then(function(contents) {
          contents.forEach(function (relativePath, zipEntry) {
            if (zipEntry.name.endsWith('.json')) {
              zipEntry.async("string").then(function(data) {
                const fileName = zipEntry.name.split('/')[1] || zipEntry.name.split('/')[0]
                const object = {
                  name: fileName,
                  content: JSON.parse(data)
                }
                allFiles.value.push(object)

              });
            }
          });
        });
        emit('update:data', allFiles.value);
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('ERROR! Неверный формат файла')
    }

  }
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
