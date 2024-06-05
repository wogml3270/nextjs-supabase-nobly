/* eslint-disable no-restricted-globals */
/* eslint-disable no-alert */
/* eslint-disable react/no-array-index-key */

'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';
import dayjs from 'dayjs';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
import { FlexBox } from '@/containers/flexBox';

import Loading from '@/app/loading';
import styles from './index.module.scss';
import { Input, Textarea } from '@/components/input';
import { MaritalStatus } from '@/components/input/maritalStatus';
import { AnotherPhone } from '@/components/input/anotherPhone';
import { JobInformation } from './job';
import { EducationForm } from './education';
import { FamilyInfo } from './familyInfo';
import { Button } from '@/components/button';
import { MembershipPapersForm } from './membershipPapers';
import { userDetailProfile } from './initialFormData';

interface AccountFormProps {
  user: User | null;
}

const AccountDetailsPage: React.FC<AccountFormProps> = ({ user }) => {
  // supabase 클라이언트 생성자
  const supabase = createClient();

  const router = useRouter();

  const [formData, setFormData] = useState(userDetailProfile);

  const [isLoading, setIsLoading] = useState<boolean>(true);

  // 상세 프로필 가져오기 로직
  const fetchProfileDetail = useCallback(async () => {
    if (!user?.id) return;

    try {
      setIsLoading(true);

      const { data, error } = await supabase
        .from('profiles_detail')
        .select(`*`)
        .eq('id', user?.id)
        .maybeSingle();

      if (error) {
        console.log(error);
      }
      setFormData(data);
    } catch (error) {
      alert('에러 발생');
    } finally {
      setIsLoading(false);
    }
  }, [supabase, user?.id]);

  useEffect(() => {
    if (user?.id) {
      fetchProfileDetail();
    }
  }, [fetchProfileDetail, user?.id]);

  // 상세 프로필 업데이트 로직
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
        setFormData((prevState) => ({
          ...prevState,
          [name]: numericValue < 0 ? 0 : numericValue,
        }));
        break;
      }
      case 'date': {
        const formattedDate = dayjs(value).format('YYYY-MM-DD');
        setFormData((prevState) => ({
          ...prevState,
          [name]: formattedDate,
        }));
        break;
      }
      default:
        setFormData((prevState) => ({
          ...prevState,
          [name]: value,
        }));
        break;
    }
  };

  // 입력값 초기화
  const handleReset = () => {
    if (confirm('입력한 정보를 초기화 하시겠습니까?')) {
      setFormData({
        ...userDetailProfile,
        id: user?.id,
      });
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
      <FlexBox dir='row'>
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
          placeholder='가입비 입력'
        />
        <Input
          type='text'
          name='membership_fee_success'
          value={formData?.membership_fee_success || ''}
          label='성혼비'
          onChange={handleInputChange}
          placeholder='성혼비 입력'
        />
      </FlexBox>
      <FlexBox dir='row'>
        <MembershipPapersForm setFormData={setFormData} />
      </FlexBox>
      <FlexBox dir='row'>
        <Input
          type='text'
          name='charge_manager'
          value={formData?.charge_manager || ''}
          label='담당 매니저'
          onChange={handleInputChange}
          placeholder='담당 매니저 입력'
        />
        <Input
          type='number'
          name='number_of_contracts'
          value={formData?.number_of_contracts || null}
          label='약정 횟수'
          onChange={handleInputChange}
          placeholder='약정 횟수 입력'
        />
      </FlexBox>
      <FlexBox dir='row'>
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
      </FlexBox>
      <FlexBox dir='col'>
        <AnotherPhone
          anotherPhone={formData?.another_phone || []}
          setFormData={setFormData}
        />
      </FlexBox>
      <FlexBox dir='row'>
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
      </FlexBox>
      <Textarea
        value={formData?.memo || ''}
        name='memo'
        label='회원 메모'
        onChange={handleInputChange}
      />
      {/* 결혼 상태 컴포넌트 */}
      <MaritalStatus maritalStatus={formData?.marital_status} setFormData={setFormData} />
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
          { value: '자가', label: '자가' },
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
      <FlexBox dir='row' gap='30px'>
        <Input
          type='number'
          name='residence_level'
          value={formData?.residence_level || ''}
          label='주거지 면적'
          onChange={handleInputChange}
          unit='평'
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
      </FlexBox>
      <Textarea
        name='property'
        value={formData?.property || ''}
        label='본인 재산 (구체적인 정보 기재)'
        onChange={handleInputChange}
      />
      <JobInformation job={formData?.job} setFormData={setFormData} />
      <EducationForm education={formData?.education} setFormData={setFormData} />
      <FamilyInfo familyInfo={formData?.family_info} setFormData={setFormData} />
      <FlexBox dir='row' justify='space-between' width={100}>
        <Button onClick={updateProfile} disabled={isLoading}>
          {isLoading ? 'loading...' : '완료'}
        </Button>
        <Button onClick={handleReset}>초기화</Button>
      </FlexBox>
    </div>
  );
};

export default AccountDetailsPage;
