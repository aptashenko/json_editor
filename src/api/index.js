import { baseRequest } from '@/api/instance.js';

import general from '@/api/services/general/index.js';

export const API = {
  general: general(baseRequest),
};
