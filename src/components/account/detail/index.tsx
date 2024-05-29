/* eslint-disable react/no-array-index-key */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
import { UserDetailType } from '@/types/account';

import Loading from '@/app/loading';
import styles from './index.module.scss';
import { Input, Textarea } from '@/components/input';
import { MaritalStatus } from '@/components/input/maritalStatus';
import AnotherPhone from '@/components/input/anotherPhone';
import { JobInformation } from './job';
import { EducationForm } from './education';
import { Button } from '@/components/button';

interface AccountFormProps {
  user: User | null;
}

const AccountDetailsPage: React.FC<AccountFormProps> = ({ user }) => {
  // supabase 클라이언트 생성자
  const supabase = createClient();

  const router = useRouter();

  const [formData, setFormData] = useState<UserDetailType | null | undefined>(null);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  const getProfileDetail = useCallback(async () => {
    try {
      setIsLoading(true);

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
      setIsLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    if (user?.id) {
      getProfileDetail();
    }
  }, [getProfileDetail, user?.id]);

  const updateProfile = async () => {
    if (!user) return;

    const { error } = await supabase.from('profiles_detail').upsert(formData);

    if (error) {
      console.log(error);
      alert('프로필 상세 업데이트 실패');
      return;
    }

    alert('프로필 상세 업데이트 성공');
    router.refresh();
  };

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

  useEffect(() => {
    console.log(formData);
  }, [formData]);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div className={styles.profiles_detail}>
      <h1>상세 프로필</h1>
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
          name='counseling_manager'
          value={formData?.counseling_manager || ''}
          onChange={handleInputChange}
          placeholder='상담 매니저 이름을 입력하세요'
        />
        <Input
          type='text'
          label='매칭 매니저'
          name='maching_manager'
          value={formData?.maching_manager || ''}
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
      {/* 결혼 상태 컴포넌트 */}
      <MaritalStatus
        initialFormData={formData?.marital_status}
        onChange={handleInputChange}
      />
      <Input
        type='radio'
        name='living_type'
        value={formData?.living_type || ''}
        label='본인 주거 형태'
        onChange={handleInputChange}
        options={[
          { value: '동거', label: '동거' },
          { value: '독립', label: '독립' },
        ]}
      />
      <Input
        type='radio'
        name='housing_type'
        value={formData?.housing_type || ''}
        label='본인 주거 형태'
        onChange={handleInputChange}
        options={[
          { value: '자가', label: '전세' },
          { value: '전세', label: '전세' },
          { value: '월세', label: '월세' },
        ]}
      />
      <Input
        type='radio'
        name='residence_type'
        value={formData?.residence_type || ''}
        label='주거 유형'
        onChange={handleInputChange}
        options={[
          { value: '아파트', label: '아파트' },
          { value: '주택', label: '주택' },
          { value: '빌라', label: '빌라' },
          { value: '다가구', label: '다가구' },
          { value: '원룸', label: '원룸' },
          { value: '기타', label: '기타' },
        ]}
      />
      <Input
        type='number'
        name='residence_level'
        value={formData?.residence_level || ''}
        label='주거지 면적'
        onChange={handleInputChange}
      />
      <Input
        type='radio'
        name='parents_owner_check'
        value={formData?.parents_owner_check || ''}
        label='거주지 부모 소유'
        onChange={handleInputChange}
        options={[
          { value: true.toString(), label: '예' },
          { value: false.toString(), label: '아니오' },
        ]}
      />
      <Textarea
        name='property'
        value={formData?.property || ''}
        label='본인 재산 (구체적인 정보 기재)'
        onChange={handleInputChange}
      />
      <JobInformation job={formData?.job} setFormData={setFormData} />
      <EducationForm education={formData?.education} setFormData={setFormData} />
      <div style={{ textAlign: 'right' }}>
        <Button onClick={updateProfile} disabled={isLoading}>
          {isLoading ? 'loading...' : '완료'}
        </Button>
      </div>
    </div>
  );
};

export default AccountDetailsPage;
