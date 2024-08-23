import { ref } from 'vue';
export function useLoading() {
  const isLoading = ref(false);

  const setLoaderState = (value) => {
    isLoading.value = value;
  };

  return {
    setLoaderState,
    isLoading,
  };
}
