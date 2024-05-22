import { createServer } from '@/utils/supabase/server';

import AccountForm from '@/components/account';
import AccountDetailsPage from '@/components/account/detail';

const Account = async () => {
  const supabase = createServer();

  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <div>
      <AccountForm user={user} />
      <AccountDetailsPage user={user} />
    </div>
  );
};

export default Account;
