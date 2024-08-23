<template>
  <form @submit.prevent="submit">
    <slot :errors="errors" :values="props.form" />
  </form>
</template>

<script setup>
import { useFormValidate } from '@/composables/useFormValidate.js'
import { computed, ref } from 'vue'
import { useI18n } from "vue-i18n"

const emit = defineEmits(['on-submit'])
const props = defineProps({
  form: {
    type: Object,
    required: true
  },
  rules: {
    type: Object,
    required: true
  }
})
const { t } = useI18n()

const isEqual = value => value === props.form.password.value

const formRules = computed(() => {
  if (!props.rules.confirm_password) return props.rules
  else {
    return {
      ...props.rules,
      confirm_password: {
        value: {
          ...props.rules.confirm_password.value,
          isEqual,
        }
      }
    }
  }
})

const errors = computed(() => {
  const result = {};
  const entries = Object.entries(props.form);
  entries.forEach(([key, value]) => {
    result[key] = value.serverError ? value.serverError : errorMessage(key, value.validationError)
  })

  return result
})

const errorMessage = (key, value) => value ? t(`validation.${key}.${value}`) : '';

const { validate } = useFormValidate(formRules.value, props.form);

const resetForm = () => {
  const keys = Object.keys(props.form);
  keys.forEach((key) => {
   props.form[key].value = ''
   props.form[key].valid = false;
   props.form[key].validationError = '';
   props.form[key].serverError = '';
  })
}

const submit = async () => {
  const valid = await validate();

  if (valid) {
    const keys = Object.keys(props.form);
    const payload = {};
    keys.forEach((key) => {
     payload[key] = props.form[key].value;
    })
    emit('submit-event', payload);
    resetForm()
  }
}

defineExpose({submit})
</script>
