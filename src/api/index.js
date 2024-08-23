import { baseRequest } from '@/api/instance.js';

import general from '@/api/services/general/index.js';
import auth from "@/api/services/auth/index.js";

export const API = {
  general: general(baseRequest),
  auth: auth(baseRequest),
};
