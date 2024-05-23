'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

interface AccountFormProps {
  user: User | null;
}

const AccountDetailsPage: React.FC<AccountFormProps> = ({ user }) => {
  // supabase 클라이언트 생성자
  const supabase = createClient();

  const [userDetails, setUserDetails] = useState<any>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProfileDetail = useCallback(async () => {
    try {
      setLoading(true);

      const { data: detail, error } = await supabase
        .from('profiles_detail')
        .select('*')
        .eq('id', user?.id)
        .single();

      if (error) {
        console.log(error?.message);
      }

      console.log(detail);
    } catch (error) {
      alert('에러 발생');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  // useEffect(() => {
  //   getProfileDetail();
  // }, []);

  return (
    <div>
      <h1>data</h1>
    </div>
  );
};

export default AccountDetailsPage;
