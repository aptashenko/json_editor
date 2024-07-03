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

const form = reactive({
  file: null
})

const { uploadFile } = useJsonParser();
const onSubmit = () => {
  uploadFile(form.file)
}



</script>

<style lang="scss" scoped>
.parser-form {
  height: 100%;
}
</style>
