export const handleErrors = async (errors, form) => {
 const entries = Object.entries(errors);
 entries.forEach(([key, value]) => {
  form[key].serverError = value[0]
 })
}
