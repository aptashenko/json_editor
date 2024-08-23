import { AUTHORIZATION_URLS } from "@/api/services/auth/enums.js";

export default (api) => ({
  LOGIN: payload => api.post(AUTHORIZATION_URLS.login, payload),
});
