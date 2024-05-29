'use client';

import { User } from '@supabase/supabase-js';
import React from 'react';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';

export interface familyInfoProps {}

interface AccountFormProps {
  user: User | null;
}

const FamilyInfo: React.FC<AccountFormProps> = ({ user }) => {
  const supabase = createClient();
  const router = useRouter();

  console.log(user);

  return <div>familyInfo</div>;
};

export { FamilyInfo };
