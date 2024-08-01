<template>
  <div class="the-instruction">
    <h2 class="the-instruction__title">File Requirements:</h2>
    <div class="the-instruction__table">
      <div class="the-instruction__table-one">
        <h3 class="the-instruction__subtitle">Several Files</h3>
        <ul class="the-instruction__list">
          <li>several files should only be uploaded as an archive</li>
          <li>the archive format should only be .zip</li>
          <li>
            the archive structure must strictly adhere to the specified structure
            <img src="@/assets/images/table_example.png" />
            <a href="/ru/localizator/archive_example.zip" download>Download Example</a>
          </li>
        </ul>
      </div>
      <div class="the-instruction__table-two">
        <h3 class="the-instruction__subtitle">One File</h3>
        <ul class="the-instruction__list">
          <li>the file should be in .json format</li>
        </ul>
      </div>
    </div>
  </div>
<!--  <h1>Upload File</h1>-->
<!--  <form @submit.prevent="uploadFile">-->
<!--    <input type="file" ref="fileInput" />-->
<!--    <button type="submit">Upload</button>-->
<!--  </form>-->
<!--  <div v-if="uploadStatus">{{ uploadStatus }}</div>-->
</template>

<style lang="scss" scoped>
.the-instruction {
  padding: 20px;

  &__title {
    font-size: 36px;
    text-align: center;
    margin-bottom: 24px;
  }

  &__subtitle {
    font-size: 24px;
    margin-bottom: 12px;
  }

  &__table {
    display: flex;
    flex-direction: column;
    gap: 24px;
  }

  &__table-one {
    display: flex;
    flex-direction: column;
  }

  &__list {
    padding-left: 40px;
    display: flex;
    flex-direction: column;
    gap: 12px;

    & li {
      & img {
        display: block;
        flex-shrink: 0;
      }

      & a {
        font-weight: 600;
        color: #0077b6;
      }
    }
  }
}
</style>
<script setup>
import SvgIcon from "@/components/shared/SvgIcon.vue";
import {useFetchApi} from "@/composables/useFetchApi.js";
import {ref} from "vue";
const { getFileEntries, getData } = useFetchApi()
import axios from 'axios'

const fileInput = ref(null);
const uploadStatus = ref('');

const uploadFile = async () => {
  const file = fileInput.value?.files[0]; // Получаем выбранный файл

  if (!file) {
    uploadStatus.value = 'No file selected';
    return;
  }

  // Создаём FormData объект и добавляем файл
  const formData = new FormData();
  formData.append('file', file);

  getFileEntries(formData)
};

</script>
