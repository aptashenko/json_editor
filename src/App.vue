<template>
  <div class="main-container">
    <upload-section
        v-if="!jsonData"
        v-model:data="jsonData"
    />
    <edit-section
        v-else
        :init-data="jsonData"
    />
  </div>
</template>

<script setup>
import {ref} from "vue";
import UploadSection from "@/components/UploadSection.vue";
import EditSection from "@/components/EditSection.vue";

const jsonData = ref(null)

</script>

<style lang="scss">
.main-container {
  height: 100%;
}
</style>
