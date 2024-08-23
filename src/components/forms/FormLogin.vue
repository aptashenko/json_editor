<template>
  <base-form
    :rules="validationRules"
    :form="formValues"
    @submit-event="onSubmit"
    class="login-form"
    v-slot="{ errors, values }"
  >
   <base-input
    label="Email"
    id="email"
    v-model="values.email.value"
    :form="values"
    :error="errors.email"
    class="form-login__input"
   />
   <base-input
    label="Password"
    id="password"
    v-model="values.password.value"
    :form="values"
    :error="errors.password"
    class="form-login__input"
   />
   <base-button :loading="loading" type="submit">
    login
   </base-button>
  </base-form>
</template>
<script setup>
import BaseForm from '@/components/forms/BaseForm.vue'
import { ref } from 'vue'
import states from '../../common/input-fields/index.js'
import validation from '@/common/validation-rules/index.js'
import BaseInput from "@/components/ui/base/BaseInput.vue";
import {useAuthorization} from "@/composables/useAuthorization.js";
import BaseButton from "@/components/ui/base/BaseButton.vue";
const emit = defineEmits(['on-submit'])

const { login, loading } = useAuthorization();

const formValues = ref({
 email: { ...states.email },
 password: { ...states.password },
})

const validationRules = {
 email: validation.email,
 password: validation.password,
}

const onSubmit = async payload => {
 login(payload, formValues.value)
 emit('on-submit', payload)
}
</script>

<style lang="scss">
.login-form {
 display: flex;
 align-items: center;
 justify-content: center;
 flex-direction: column;

 & label {
  display: flex;
  flex-direction: column;
 }
}
</style>
