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

        <base-button
            :disabled="loaders.ai_translation"
            class="the-sidebar__quick-translate"
            @click="getAITranslation"
        >
          <the-loader v-if="loaders.ai_translation"/>
          <div v-else class="the-sidebar__quick-translate-content" >
              <span>Quick AI Translate</span>  
              <svg-icon name="openai"  class="the-sidebar__quick-translate-icon"/>
          </div>
        </base-button>
      </div>
    </div>
  </div>
</template>

<script setup>
import SvgIcon from '@/components/shared/SvgIcon.vue';
import TheLogo from "@/components/TheLogo.vue";
import TheLoader from '@/components/TheLoader.vue';
import ParserForm from "@/components/ParserForm.vue";
import BaseButton from "@/components/ui/BaseButton.vue";
import { useJsonParser } from "@/composables/useJsonParser.js";
import { useFetchApi } from '@/composables/useFetchApi';

const { jsonData, symbolsCount, downloadFile, clearData } = useJsonParser()
const { getAITranslation, loaders } = useFetchApi()

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

  &__quick-translate {
    display: flex;
    justify-content: center;
    align-items: center;
    background: #15a180 !important;


    &-content {
      display: inherit;
      justify-content: inherit;
      align-items: inherit;
      gap: 5px;
    }

    &-icon {
      display: block;
      height: 30px;
      width: 30px;
    }
  }
}
</style>
