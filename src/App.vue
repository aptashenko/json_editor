<template>
  <sidebar-layout class="main-container">
    <div class="main-container__editor" v-if="jsonData">
      <div class="main-container__head">
        <p>
          Original value
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
          @update="updateData({content: $event, index: idx})"
      />
    </div>
    <the-instruction v-else />
  </sidebar-layout>
  <teleport to="body">
    <base-notification v-if="globalNotification.component" />
  </teleport>
</template>

<script setup>
import BaseNotification from '@/components/Notifications/BaseNotification.vue';
import EditSection from "@/components/EditSection.vue";
import SidebarLayout from "@/layouts/SidebarLayout.vue";
import {useJsonParser} from "@/composables/useJsonParser.js";
import TheInstruction from "@/components/TheInstruction.vue";
import {useNotification} from "@/composables/useNotification.js";
const { globalNotification } = useNotification();
const { filteredData, updateData, jsonData, inputFileName, allTexts, downloadFile } = useJsonParser()



</script>

<style lang="scss">
.main-container {
  height: 100%;

  &__editor {
    height: 100vh;
    overflow-y: auto;
  }

  &__head {
    position: sticky;
    top: 0;
    left: 0;
    display: grid;
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 20px;
    background: #caf0f8;
    margin-bottom: 10px;

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
