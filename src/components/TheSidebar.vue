<template>
  <div class="the-sidebar">
    <div class="the-sidebar__head">
      <the-logo />
    </div>
    <div class="the-sidebar__body">
      <parser-form />
    </div>
  </div>
</template>

<script setup>
import TheLogo from "@/components/TheLogo.vue";
import ParserForm from "@/components/ParserForm.vue";
</script>

<style lang="scss" scoped>
.the-sidebar {
  padding: 20px;

  display: flex;
  flex-direction: column;

  &__body {
    flex: 1;
  }
}
</style>
