import { GENERAL_URLS } from '@/api/services/general/enums.js';

export default (api) => ({
  get: () => api.get(GENERAL_URLS.main),
  upload: payload => api.post(GENERAL_URLS.upload, payload),
});
