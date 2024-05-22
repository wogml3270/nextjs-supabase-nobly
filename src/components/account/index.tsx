'use client';

import React, { useCallback, useEffect, useState, Suspense } from 'react';
import { type User } from '@supabase/supabase-js';
import { useRouter } from 'next/navigation';

import { createClient } from '@/utils/supabase/client';
import { UserType } from '@/types/account';

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
  });
  const [tempAvatarUrl, setTempAvatarUrl] = useState<string | null>(null);
  const [uploading, setUploading] = useState<boolean>(false);

  const fetchProfile = useCallback(async () => {
    if (!user) return;
    setIsLoading(true);

    const { data, error, status } = await supabase
      .from('profiles')
      .select('gender, username, phone, avatar_url')
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
    const fieldName = type === 'radio' ? name : id;
    setFormData((prev) => ({ ...prev, [fieldName]: value }));
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
        <div>
          <label htmlFor='email'>이메일</label>
          <input id='email' type='text' value={user?.email || ''} disabled />
        </div>
        <div className={styles.gender_form}>
          <label>성별</label>
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
            id='username'
            type='text'
            value={formData.username || ''}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label htmlFor='phone'>휴대폰번호</label>
          <input
            id='phone'
            type='text'
            value={formData.phone || ''}
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
