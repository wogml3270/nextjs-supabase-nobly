'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import dayjs from 'dayjs';

import { createClient } from '@/utils/supabase/client';
import { UserDetailType } from '@/types/account';

import Loading from '@/app/loading';
import styles from './index.module.scss';
import { Input } from '@/components/input';

interface AccountFormProps {
  user: User | null;
}

const AccountDetailsPage: React.FC<AccountFormProps> = ({ user }) => {
  // supabase 클라이언트 생성자
  const supabase = createClient();

  const [formData, setFormData] = useState<UserDetailType | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const getProfileDetail = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error } = await supabase
        .from('profiles_detail')
        .select('*')
        .eq('id', user?.id)
        .maybeSingle();

      if (error) {
        console.log(error);
      } else {
        setFormData(data);
      }
    } catch (error) {
      alert('에러 발생');
    } finally {
      setLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    if (user?.id || formData) {
      getProfileDetail();
    }
  }, [user, getProfileDetail]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type } = e.target;

    if (type === 'date') {
      dayjs(value).format('YYYY-MM-DD');
    }

    // setFormData((prev) => ({ ...prev, [name]: value }));
  };

  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.profiles_detail}>
      <Input
        type='text'
        name='partner_id'
        value={formData?.partner_id || ''}
        label='파트너 아이디'
        onChange={handleInputChange}
      />
      <Input
        type='text'
        name='membership_fee'
        value={Number(formData?.membership_fee).toLocaleString() || ''}
        label='가입비'
        onChange={handleInputChange}
      />
      <Input
        type='text'
        name='membership_fee_success'
        value={Number(formData?.membership_fee_success).toLocaleString() || ''}
        label='성혼비'
        onChange={handleInputChange}
      />
      <p>담당 매니저: {formData?.charge_manager ?? '없음'}</p>
      <p>약정 횟수: {formData?.number_of_contracts ?? '없음'}</p>
      <p>서비스 시작일: {formData?.service_period_start ?? '없음'}</p>
      <p>서비스 종료일: {formData?.service_period_end ?? '없음'}</p>
      <p>메모: {formData?.memo ?? '없음'}</p>
      <p>결혼 상태: {formData?.marital_status?.status ?? '없음'}</p>
      {formData?.marital_status?.children && (
        <div>
          <p>
            자녀 출생 여부: {formData.marital_status.children.birth ? '예' : '아니오'}
          </p>
          <p>
            본인 양육 여부:{' '}
            {formData.marital_status.children.custody.self ? '예' : '아니오'}
          </p>
          <p>
            배우자 양육 여부:{' '}
            {formData.marital_status.children.custody.spouse ? '예' : '아니오'}
          </p>
          <p>아들 수: {formData.marital_status.children.sons}</p>
          <p>딸 수: {formData.marital_status.children.daughters}</p>
        </div>
      )}
    </div>
  );
};

export default AccountDetailsPage;
