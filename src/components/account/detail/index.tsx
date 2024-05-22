'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';
import { UserType } from '@/types/account';

const AccountDetailsPage = ({ user }: { user: User | null }) => {
  // supabase 클라이언트 생성자
  const supabase = createClient();

  const [userDetails, setUserDetails] = useState<UserType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProfileDetail = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles_detail')
        .select(``)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }
    } catch (error) {
      alert('에러 발생');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfileDetail();
  }, []);

  return (
    <div>
      <h1>User Details</h1>
    </div>
  );
};

export default AccountDetailsPage;
