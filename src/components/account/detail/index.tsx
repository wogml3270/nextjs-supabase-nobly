/* eslint-disable react/no-array-index-key */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import dayjs from 'dayjs';

import { createClient } from '@/utils/supabase/client';
import { UserDetailType } from '@/types/account';

import Loading from '@/app/loading';
import styles from './index.module.scss';
import { Input, Textarea } from '@/components/input';
import { MaritalStatus } from '@/components/input/maritalStatus';
import AnotherPhone from '@/components/input/anotherPhone';

interface AccountFormProps {
  user: User | null;
}

const AccountDetailsPage: React.FC<AccountFormProps> = ({ user }) => {
  // supabase 클라이언트 생성자
  const supabase = createClient();

  const [formData, setFormData] = useState<UserDetailType | null | undefined>(null);

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
    if (user?.id) {
      getProfileDetail();
    }
  }, [getProfileDetail, user?.id]);

  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value, type } = e.target;

    switch (type) {
      case 'number': {
        const numericValue = Number(value);
        setFormData((prev) => ({
          ...prev!,
          [name]: numericValue < 0 ? 0 : numericValue,
        }));
        break;
      }
      case 'date': {
        const formattedDate = dayjs(value).format('YYYY-MM-DD');
        setFormData((prev) => ({
          ...prev!,
          [name]: formattedDate,
        }));
        break;
      }
      default:
        setFormData((prevState) => ({
          ...prevState!,
          [name]: value,
        }));
        break;
    }

    if (formData!.marital_status) {
      setFormData((prevState: any) => {
        return {
          ...prevState!,
          marital_status: {
            ...prevState!.marital_status,
            [name]: value,
          },
        };
      });
    } else {
      setFormData((prevState) => ({
        ...prevState!,
        [name]: value,
      }));
    }
  };
  console.log(formData);
  if (loading) {
    return <Loading />;
  }

  return (
    <div className={styles.profiles_detail}>
      <div>
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
          value={formData?.membership_fee || ''}
          label='가입비'
          onChange={handleInputChange}
        />
        <Input
          type='text'
          name='membership_fee_success'
          value={formData?.membership_fee_success || ''}
          label='성혼비'
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Input
          type='text'
          name='charge_manager'
          value={formData?.charge_manager || ''}
          label='담당 매니저'
          onChange={handleInputChange}
        />
        <Input
          type='number'
          name='number_of_contracts'
          value={formData?.number_of_contracts || 0}
          label='약정 횟수'
          onChange={handleInputChange}
        />
      </div>
      <div>
        <Input
          type='text'
          label='상담 매니저'
          name='C'
          value={formData?.manager_type?.C || ''}
          onChange={handleInputChange}
          placeholder='상담 매니저 이름을 입력하세요'
        />
        <Input
          type='text'
          label='매칭 매니저'
          name='M'
          value={formData?.manager_type?.M || ''}
          onChange={handleInputChange}
          placeholder='매칭 매니저 이름을 입력하세요'
        />
      </div>
      <div>
        <AnotherPhone
          anotherPhone={formData?.another_phone || []}
          setFormData={setFormData}
        />
      </div>
      <div>
        <Input
          type='date'
          name='service_period_start'
          value={formData?.service_period_start || ''}
          label='서비스 시작일'
          onChange={handleInputChange}
        />
        <Input
          type='date'
          name='service_period_end'
          value={formData?.service_period_end || ''}
          label='서비스 종료일'
          onChange={handleInputChange}
        />
      </div>
      <Textarea
        value={formData?.memo || ''}
        name='memo'
        label='회원 메모'
        onChange={handleInputChange}
      />
      <MaritalStatus
        initialFormData={formData?.marital_status}
        onChange={handleInputChange}
      />
    </div>
  );
};

export default AccountDetailsPage;
