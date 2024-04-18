<template>
  <div class="main-container">
    <upload-section
        v-if="!jsonData"
        v-model:fileName="inputFileName"
        @upload="uploadData"
        v-model:allTexts="allTexts"
    />
    <div class="main-container__editor" v-else>
      <p class="main-container__tips">
        **phrases within curly braces don't need to be translated, for example: {terms}, {email}, etc.
      </p>
      <div class="main-container__head">
        <p>
          Original value, a total of <b>{{symbolsCount}}</b> characters.
        </p>
        <p>
          New value
        </p>
      </div>
      <edit-section
          v-for="(data, idx) of filteredData"
          :file-name="inputFileName"
          :init-data="data"
          :index="idx"
          :symbols="symbolsCount"
          @update="updateData({content: $event, index: idx})"
      />
      <base-button
          @click="downloadFile"
          class="main-container__button"
      >
        <m-icon name="download" size="1.5rem" color="white" />
        <span data-type="text">Download</span>
      </base-button>
    </div>
  </div>
</template>

<script setup>
import {computed, ref, watch} from "vue";
import UploadSection from "@/components/UploadSection.vue";
import EditSection from "@/components/EditSection.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
const inputFileName = ref(null)
const jsonData = ref(null);
const allTexts = ref(null);
const symbolsCount = ref(0)

const filteredData = computed(() => {
  if(jsonData.value.length) {
    return jsonData.value.map(item => item.content)
  } else {
    return jsonData.value
  }
});
const updateData = ({content, index}) => {
  if (jsonData.value.length) {
    jsonData.value[index].content = content;
  } else {
    const [key, value] = Object.entries(content)[0];
    if (key !== index) {
      jsonData.value[index] = content;
    } else {
      jsonData.value[index] = value;
    }
  }
}
const downloadFile = async () => {

  if (jsonData.value.length) {
    const zip = new JSZip();
    await jsonData.value.forEach(item => {
      const content = JSON.stringify(item.content);
      const name = item.name;
      const folder = zip.folder(name)
      folder.file("index.json", content)
    })

    zip.generateAsync({ type: 'blob' }).then(function (content) {
      const name = prompt('Введите имя файла')
      FileSaver.saveAs(content, `${name}.zip`);
    });
  } else if (typeof jsonData.value === 'object') {
      const data = JSON.stringify(jsonData.value);
      const blob = new Blob([data], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = inputFileName.value;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
  } else {
    alert('ERROR')
  }
}

const uploadData = data => {
  jsonData.value = data;
}

const symbolsCounter = () => {
  const regexTags = /<[^>]*>/g;
  const regexBracketsContent = /\{[^{}]*\}/g;
  const regexPunctuation = /[^\p{L}]/gu;

  allTexts.value.forEach(string => {
    if (string) {
      const onlyText = string.replaceAll(regexTags, '');
      const withoutBrackets = onlyText.replaceAll(regexBracketsContent, '');
      const withoutPunctuation = withoutBrackets.replaceAll(regexPunctuation, '');
      const onlyTextsLength = withoutPunctuation.length;
      symbolsCount.value += onlyTextsLength;
    }
  })
}

watch(allTexts, symbolsCounter, {deep: true})

</script>

<style lang="scss">
.main-container {
  height: 100%;

  &__head {
    position: sticky;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
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

  &__button {
    display: flex;
    align-items: center;
    gap: 5px;
    margin: 20px auto 0;
  }
}
</style>
