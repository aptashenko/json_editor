<template>
  <form
      class="parser-form"
  >
    <base-drop-field
        v-model="form.file"
        class="parser-form__input"
        @submit="onSubmit"
    />
  </form>
</template>
<script setup>
import BaseDropField from "@/components/ui/BaseDropField.vue";
import {reactive} from "vue";
import {useJsonParser} from "@/composables/useJsonParser.js";
import {useFetchApi} from "@/composables/useFetchApi.js";

const form = reactive({
  file: null
})

const { uploadFile, symbolsCount } = useJsonParser();
const { getFileEntries } = useFetchApi()
const onSubmit = async () => {
  const formData = new FormData();
  formData.append('file', form.file);

  const {files, count} = await getFileEntries(formData)
  symbolsCount.value = count
  uploadFile(files)
}



</script>

<style lang="scss" scoped>
.parser-form {
  height: 100%;
}
</style>
