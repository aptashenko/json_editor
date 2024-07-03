<template>
  <div class="sidebar-layout">
    <the-sidebar class="sidebar-layout__sidebar" />
    <div class="sidebar-layout__content">
      <slot />
    </div>
  </div>
</template>
<script setup>
import TheSidebar from "@/components/TheSidebar.vue";
</script>

<style lang="scss" scoped>
.sidebar-layout {
  display: flex;

  &__sidebar {
    width: 20vw;
    min-width: 300px;
    box-shadow: rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px;
  }

  &__content {
    flex: 1;
  }
}
</style>
