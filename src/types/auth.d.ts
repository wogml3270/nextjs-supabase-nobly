import { User } from '@supabase/supabase-js';

import { ValueOf } from '.';

export const ROLE = {
  ROOT_ADMIN: 'ROOT_ADMIN',
  MANAGER: 'MANAGER',
  USER: 'USER',
};

export type RoleTypes = ValueOf<typeof ROLE>;

export interface UserWithRole extends User {
  role: RoleTypes;
}
