import { computed, ref } from 'vue';

export function useFocusInput({ focus, blur }) {
  const EVENT_ENUMS = {
    focus: 'focus',
    blur: 'blur',
  };

  const focusEvent = ref(EVENT_ENUMS.focus);
  const isFocused = computed(() => focusEvent.value === EVENT_ENUMS.blur);

  const changeEvent = () => {
    let state;
    if (isFocused.value) {
      state = EVENT_ENUMS.focus;
      if (blur) blur();
    } else {
      state = EVENT_ENUMS.blur;
      if (focus) focus();
    }
    focusEvent.value = state;
  };

  return {
    isFocused,
    focusEvent,
    changeEvent,
  };
}
