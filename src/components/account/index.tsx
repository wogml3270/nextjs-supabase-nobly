'use client';

import React, { useCallback, useEffect, useState } from 'react';
import { type User } from '@supabase/supabase-js';

import { createClient } from '@/utils/supabase/client';

import Avatar from './avatar';

interface FormData {
  full_name: string | null;
  username: string | null;
  website: string | null;
  avatar_url: string | null;
}

const AccountForm = ({ user }: { user: User | null }) => {
  const supabase = createClient();
  const [loading, setLoading] = useState<boolean>(true);
  // formData 상태를 객체로 관리
  const [formData, setFormData] = useState<FormData>({
    full_name: null,
    username: null,
    website: null,
    avatar_url: null,
  });

  const getProfile = useCallback(async () => {
    try {
      setLoading(true);

      const { data, error, status } = await supabase
        .from('profiles')
        .select(`full_name, username, website, avatar_url`)
        .eq('id', user?.id)
        .single();

      if (error && status !== 406) {
        console.log(error);
        throw error;
      }

      if (data) {
        // data를 바로 formData 상태에 반영
        setFormData({
          full_name: data.full_name,
          username: data.username,
          website: data.website,
          avatar_url: data.avatar_url,
        });
      }
    } catch (error) {
      alert('Error loading user data!');
    } finally {
      setLoading(false);
    }
  }, [user, supabase]);

  useEffect(() => {
    getProfile();
  }, [user, getProfile]);

  async function updateProfile() {
    try {
      setLoading(true);

      const updatedData = {
        ...formData,
        id: user?.id,
        updated_at: new Date().toISOString(),
      };

      const { error } = await supabase.from('profiles').upsert(updatedData);

      if (error) throw error;
      alert('정보 수정 완료');
    } catch (error) {
      alert('정보 수정 실패');
    } finally {
      setLoading(false);
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [id]: value,
    }));
  };

  return (
    <div>
      <Avatar
        uid={user?.id ?? null}
        url={formData.avatar_url}
        size={150}
        onUpload={(url) => {
          setFormData({
            ...formData,
            avatar_url: url,
          });
          updateProfile();
        }}
      />
      <div>
        <label htmlFor='email'>Email</label>
        <input id='email' type='text' value={user?.email} disabled />
      </div>
      <div>
        <label htmlFor='fullName'>Full Name</label>
        <input
          id='fullName'
          type='text'
          value={formData?.full_name || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='username'>Username</label>
        <input
          id='username'
          type='text'
          value={formData?.username || ''}
          onChange={handleChange}
        />
      </div>
      <div>
        <label htmlFor='website'>Website</label>
        <input
          id='website'
          type='url'
          value={formData?.website || ''}
          onChange={handleChange}
        />
      </div>

      <div>
        <button onClick={updateProfile} disabled={loading}>
          {loading ? 'Loading ...' : 'Update'}
        </button>
      </div>

      <div>
        <form action='/auth/signout' method='post'>
          <button type='submit'>Sign out</button>
        </form>
      </div>
    </div>
  );
};

export default AccountForm;
