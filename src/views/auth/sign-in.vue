<template>
  <div class="sign-in">
    <form-login />
  </div>
</template>
<script setup>
import FormLogin from "@/components/forms/FormLogin.vue";
</script>

<style lang="scss" scoped>
.sign-in {
  min-height: 100vh;
  width: 100%;

  display: grid;
  place-items: center;
}
</style>
