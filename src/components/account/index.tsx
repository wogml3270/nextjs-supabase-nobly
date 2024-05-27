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
import { Input } from '@/components/input';

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
      .select('*')
      .eq('id', user.id)
      .single();

    if (error && status !== 406) {
      console.error(error);
    }

    if (data) {
      setFormData(data);
    }

    setIsLoading(false);
  }, [user, supabase]);

  useEffect(() => {
    if (user?.id) {
      fetchProfile();
    }
  }, [fetchProfile, user?.id]);

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
    const { name, value, type } = e.target;

    if (type === 'date') {
      dayjs(value).format('YYYY-MM-DD');
    }

    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className={styles.profiles}>
      <Suspense fallback={<Loading />}>
        <Avatar
          className={styles.avatar}
          uid={user?.id ?? null}
          url={tempAvatarUrl || formData.avatar_url}
          size={150}
          onUpload={(url: string) => setTempAvatarUrl(url)}
          uploading={uploading}
          setUploading={setUploading}
        />
        <Input
          type='radio'
          label='작성자 유형'
          name='author_type'
          value={formData.author_type || ''}
          onChange={handleInputChange}
          options={[
            { value: '본인', label: '본인 작성' },
            { value: '부모', label: '부모 작성' },
            { value: '기타', label: '기타' },
          ]}
        />

        <Input type='text' label='이메일' value={user?.email} disabled />
        <Input
          type='radio'
          label='성별'
          name='gender'
          value={formData.gender || ''}
          onChange={handleInputChange}
          options={[
            { value: 'male', label: '남' },
            { value: 'female', label: '여' },
          ]}
        />
        <Input
          type='text'
          label='이름'
          value={formData.username || ''}
          name='username'
          onChange={handleInputChange}
        />
        <Input
          type='text'
          label='휴대폰번호'
          value={formData.phone || ''}
          name='phone'
          onChange={handleInputChange}
        />
        <Input
          type='date'
          label='나이'
          value={formData.age ? dayjs(formData.age).format('YYYY-MM-DD') : ''}
          name='age'
          onChange={handleInputChange}
        />
        <span>
          만{' '}
          {calculateAgeFromBirthday(
            formData.age ? dayjs(formData.age).format('YYYY-MM-DD') : '',
          )}{' '}
          세
        </span>
        <Input
          type='text'
          label='현재 거주지'
          value={formData.address || ''}
          name='address'
          onChange={handleInputChange}
        />
        <Input
          type='text'
          label='주민등록상 거주지'
          value={formData.origin_address || ''}
          name='origin_address'
          onChange={handleInputChange}
        />
        <div className={styles.button_group}>
          <Button onClick={updateProfile} disabled={isLoading}>
            {isLoading ? 'loading...' : '완료'}
          </Button>
          <SignoutButton />
        </div>
      </Suspense>
    </div>
  );
};

export default AccountForm;
