<template>
  <div class="the-sidebar">
    <div class="the-sidebar__head">
      <the-logo />
    </div>
    <div class="the-sidebar__body">
      <parser-form v-if="!jsonData" />
      <div v-else class="the-sidebar__content">
        <div class="the-sidebar__tip">
          <p>
            <span class="red">!!</span> phrases within curly braces don't need to be translated, for example: {terms}, {email}, etc.
          </p>
        </div>
        <div class="the-sidebar__tip">
          <p>
            Total number of characters: <span class="red">{{ symbolsCount }}</span>
          </p>
        </div>
        <base-button
            @click="downloadFile"
        >
          Download result
        </base-button>
        <base-button
            @click="clearData"
            class="the-sidebar__clear"
        >
          Clear
        </base-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import TheLogo from "@/components/TheLogo.vue";
import ParserForm from "@/components/ParserForm.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import {useJsonParser} from "@/composables/useJsonParser.js";
const { jsonData, symbolsCount, downloadFile, clearData } = useJsonParser()

</script>

<style lang="scss" scoped>
.the-sidebar {
  padding: 20px;

  display: flex;
  flex-direction: column;

  &__body {
    flex: 1;
  }

  &__tip {
    border: 1px solid #111113;
    padding: 5px;
    border-radius: 8px;

    & p {
      font-style: italic;

      & .red {
        color: #FF4F4F;
        font-weight: 800;
      }
    }
  }

  &__content {
    display: flex;
    flex-direction: column;
    gap: 10px;
  }

  &__clear {
    background: #FF4F4F !important;
  }
}
</style>
