import useVuelidate from '@vuelidate/core';
export function useFormValidate(validationRules, form) {
  const v$ = useVuelidate(validationRules, form).value;
  const validate = async () => {
    const keys = Object.keys(form);
    for (const key of keys) {
      const hasValidationCheck = typeof form[key]?.valid === 'boolean';
      if (hasValidationCheck) {
        form[key].valid = await v$[key]?.value.$validate();
        form[key].validationError = v$[key].value.$error ? v$[key].value.$errors[0].$validator : '';
      }
    }

    const values = Object.values(form);

    return values.every((item) => !item.validationError);
  };

  return {
    validate,
  };
}
