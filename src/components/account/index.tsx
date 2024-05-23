'use client';

import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { type User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';
import dayjs from 'dayjs';

import { createClient } from '@/utils/supabase/client';
import { UserType } from '@/types/account';
import { calculateAgeFromBirthday } from '@/utils/common/calculate';

import Avatar from './avatar';
import styles from './index.module.scss';
import { Button, SignoutButton } from '@/components/button';
import Loading from '@/app/loading';

interface AccountFormProps {
  user: User | null;
}

const AccountForm: React.FC<AccountFormProps> = ({ user }) => {
  const supabase = createClient();

  const router = useRouter();

  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [formData, setFormData] = useState<UserType>({
    gender: null,
    username: null,
    phone: null,
    avatar_url: null,
    address: null,
    origin_address: null,
    author_type: null,
    age: null,
  });
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    const { data, error, status } = await supabase
      .from('profiles')
      .select(
        'gender, username, phone, avatar_url, address, origin_address, author_type, age',
      )
      .eq('id', user.id)
      .single();

    if (error && status !== 406) {
      console.error(error);
      alert('에러 발생');
    }

    if (data) {
      setFormData(data);
    }

    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  const updateProfile = async () => {
    if (!user) return;

    const updatedData = {
      ...formData,
      avatar_url: tempAvatarUrl ?? formData.avatar_url,
      id: user.id,
      updated_at: new Date().toISOString(),
    };

    const { error } = await supabase.from('profiles').upsert(updatedData);

    if (error) {
      console.log(error);
      alert('프로필 업데이트에 실패했습니다.');
      setUploading(false);
      return;
    }

    alert('프로필이 업데이트 되었습니다.');
    setTempAvatarUrl(null); // Clear the temporary URL after update
    setUploading(false);
    router.refresh();
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name, type } = e.target;
    let formattedValue;

    switch (type) {
      case 'date':
        formattedValue = dayjs(value).format('YYYY-MM-DD');
        break;
      case 'radio':
        formattedValue = value;
        break;
      default:
        formattedValue = value;
    }

    const fieldName = type === 'radio' ? name : id;

    setFormData((prev) => ({ ...prev, [fieldName]: formattedValue }));
  };

  const handleAvatarUpload = (url: string) => {
    setTempAvatarUrl(url); // Store the uploaded URL temporarily
  };

  return (
    <div className={styles.profiles}>
      <Suspense fallback={<Loading />}>
        <Avatar
          className={styles.avatar}
          uid={user?.id ?? null}
          url={tempAvatarUrl || formData.avatar_url}
          size={150}
          onUpload={handleAvatarUpload}
          uploading={uploading}
          setUploading={setUploading}
        />
        <div className={styles.gender_form}>
          <label htmlFor='author_type'>작성자 유형</label>
          <div>
            <input
              type='radio'
              name='author_type'
              value='본인'
              checked={formData.author_type === '본인'}
              onChange={handleInputChange}
            />
            <label htmlFor='본인 작성'>본인 작성</label>
          </div>
          <div>
            <input
              type='radio'
              name='author_type'
              value='부모'
              checked={formData.author_type === '부모'}
              onChange={handleInputChange}
            />
            <label htmlFor='부모 작성'>부모 작성</label>
          </div>
          <div>
            <input
              type='radio'
              name='author_type'
              value='기타'
              checked={formData.author_type === '기타'}
              onChange={handleInputChange}
            />
            <label htmlFor='기타'>기타</label>
          </div>
        </div>
        <div>
          <label htmlFor='email'>이메일</label>
          <input type='text' id='email' value={user?.email || ''} disabled />
        </div>
        <div className={styles.gender_form}>
          <label htmlFor='gender'>성별</label>
          <div>
            <input
              type='radio'
              name='gender'
              value='male'
              checked={formData.gender === 'male'}
              onChange={handleInputChange}
            />
            <label htmlFor='male'>남성</label>
          </div>
          <div>
            <input
              type='radio'
              name='gender'
              value='female'
              checked={formData.gender === 'female'}
              onChange={handleInputChange}
            />
            <label htmlFor='female'>여성</label>
          </div>
        </div>
        <div>
          <label htmlFor='username'>이름</label>
          <input
            type='text'
            id='username'
            value={formData.username || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='phone'>휴대폰번호</label>
          <input
            type='text'
            id='phone'
            value={formData.phone || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='age'>나이</label>
          <input
            type='date'
            id='age'
            value={formData.age ? dayjs(formData.age).format('YYYY-MM-DD') : ''}
            onChange={handleInputChange}
          />
          <span>
            만{' '}
            {calculateAgeFromBirthday(
              formData.age ? dayjs(formData.age).format('YYYY-MM-DD') : '',
            )}{' '}
            세
          </span>
        </div>
        <div>
          <label htmlFor='address'>현재 거주지</label>
          <input
            type='text'
            id='address'
            value={formData.address || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='address'>주민등록상 거주지</label>
          <input
            type='text'
            id='origin_address'
            value={formData.origin_address || ''}
            onChange={handleInputChange}
          />
        </div>
        <div className={styles.button_group}>
          <Button onClick={updateProfile} disabled={isLoading}>
            {isLoading ? 'Loading..' : '완료'}
          </Button>
          <SignoutButton />
        </div>
      </Suspense>
    </div>
  );
};

export default AccountForm;
