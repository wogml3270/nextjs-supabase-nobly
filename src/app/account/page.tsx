import { createClient } from '@/utils/supabase/server';

import AccountForm from '@/components/account';

const Account = async () => {
  const supabase = createClient();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return <AccountForm user={user} />;
};

export default Account;
