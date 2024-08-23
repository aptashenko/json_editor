<template>
  <div>
    <label :for="name">
      {{ label }}
    </label>

    <div v-if="!textArea || passwordInput" class="input-wrapper">
      <input
        :name="name"
        :id="name"
        :type="inputType"
        v-model="value"
        :placeholder="placeholder"
        v-on:[focusEvent]="changeEvent"
      />
      <svg-icon
        v-if="passwordInput"
        name="eye"
        :hide="passwordVisible"
        class="eye-btn"
        @click="togglePasswordVisibility"
      />
    </div>

    <textarea
      v-else
      :name="name"
      :id="name"
      v-model="value"
      :placeholder="placeholder"
      v-on:[focusEvent]="changeEvent"
    />

    <transition name="fade" mode="out-in">
      <p v-show="error">
        {{ error }}
      </p>
    </transition>
  </div>
</template>

<script setup>
import { useFocusInput } from '@/composables/useFocusInput.js';
import states from '../../../common/input-fields/index.js';
import { ref, computed } from 'vue';

const value = defineModel();
const error = defineModel('error');
const props = defineProps({
  type: {
    type: String,
    default: 'text',
  },
  textArea: {
    type: Boolean,
    default: false,
  },
  error: {
    type: String,
    default: '',
  },
  id: {
    type: String,
    required: true,
  },
  form: {
    type: Object,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: '',
  },
});

const onFocus = () => {
  props.form[props.id].serverError = '';
  props.form[props.id].validationError = '';
};
const { isFocused, changeEvent, focusEvent } = useFocusInput({
  focus: onFocus,
});

const passwordInput = computed(() => props.name === states.password.id);
const passwordVisible = ref(false);
const inputType = computed(() =>
  passwordVisible.value ? props.type : props.name
);
const togglePasswordVisibility = () => {
  passwordVisible.value = !passwordVisible.value;
};
</script>

<style lang="scss" scoped>
.input-wrapper {
  position: relative;

  .eye-btn {
    position: absolute;
    top: 50%;
    right: 10px;
    transform: translateY(-50%);
  }
}

textarea {
  resize: none;
}
</style>
