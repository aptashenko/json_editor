<template>
  <router-view />
  <teleport to="body">
    <base-notification v-if="globalNotification.component" />
  </teleport>
</template>

<script setup>
import BaseNotification from '@/components/Notifications/BaseNotification.vue';
import {useNotification} from "@/composables/useNotification.js";
import {useAuthorization} from "@/composables/useAuthorization.js";
const { globalNotification } = useNotification();

const { user } = useAuthorization();
const checkIsAuth = () => {
  if (!localStorage.getItem('token')) return
  user.value.isAuth = true;
}

checkIsAuth()
</script>
