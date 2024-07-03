<template>
  <sidebar-layout class="main-container">
    <div class="main-container__editor" v-if="jsonData">
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
    <the-instruction />
  </sidebar-layout>
</template>

<script setup>
import {ref, watch} from "vue";
import EditSection from "@/components/EditSection.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import JSZip from "jszip";
import FileSaver from 'file-saver';
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import {useJsonParser} from "@/composables/useJsonParser.js";
import TheInstruction from "@/components/TheInstruction.vue";
const allTexts = ref(null);
const symbolsCount = ref(0);

const { filteredData, updateData, jsonData } = useJsonParser()

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
