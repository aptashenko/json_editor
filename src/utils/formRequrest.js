import { handleErrors } from "@/utils/helpers/errors-handler.js"

export const handleFormRequest = async (action, payload, onSuccess = () => {}, form, loading) => {

 loading(true);

 try {
  const {
   data: { data },
   status,
  } = await action(payload);

  if (status === 200 || status === 201 || status === 204) onSuccess(data);
 } catch (error) {
  console.log(error)
  if (error.response.status === 422) {
   const { errors } = error.response.data;
   handleErrors(errors, form);
  }
  console.error(error);
 } finally {
  loading(false);
 }
}
