import React from 'react';

import { createServer } from '@/utils/supabase/server';

import { FamilyInfo } from '@/components/account/detail/familyInfo';

const FamilyPage = async () => {
  const supabase = createServer();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <FamilyInfo user={user} />;
};

export default FamilyPage;
