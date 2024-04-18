<template>
  <div
      class="upload-section"
  >
    <div>
      <h2 class="upload-section__title">
        Step 1. Upload the file.
      </h2>
      <p class="upload-section__subtitle">
        Please upload the source file in either *.json or *.zip format.
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
const emit = defineEmits(['upload']);
const allFiles = ref([]);
const texts = ref([]);

const printStrings = item => {
  if (typeof item === 'string') {
    texts.value.push(item)
  } else if (item && typeof item === 'object') {
    Object.values(item).forEach(subItem => {
      printStrings(subItem);
    });
  }
}
const uploadFile = event => {
  const file = event.target.files[0];

  if (file) {
    const reader = new FileReader();

    if (file.type.includes('json')) {

      reader.onload = function(e) {
        const content = e.target.result;
        try {
          const parsedContent = JSON.parse(content);
          const text = Object.values(parsedContent);
          text.forEach(item => { printStrings(item) })
          emit('update:fileName', file.name);
          emit('upload', parsedContent);
          emit('update:allTexts', texts.value)
        } catch (err) {
          alert('ERROR! Parsing error or the file is corrupted:')
          console.error('Parsing error or file is broken:', err);
        }
      };
      reader.readAsText(file);

    } else if (file.type.includes('zip')) {
      reader.onload = function(ev) {
        const zip = new JSZip();
        zip.loadAsync(ev.target.result).then(function(contents) {
          contents.forEach(function (relativePath, zipEntry) {
            if (zipEntry.name.endsWith('index.json')) {
              zipEntry.async("string").then(function(data) {
                const fileName = zipEntry.name.split('/')[0].replace('.json', '');
                const object = {
                  name: fileName,
                  content: JSON.parse(data)
                }
                const text = Object.values(object.content);
                text.forEach(item => { printStrings(item) })
                allFiles.value.push(object)
              });
            }
          });
        });
        emit('upload', allFiles.value);
        emit('update:allTexts', texts.value)
      };
      reader.readAsArrayBuffer(file);
    } else {
      alert('ERROR! Invalid file format or the file is corrupted.')
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
