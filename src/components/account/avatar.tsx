'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';

import defaultImg from '@public/assets/default_img.png';
import { createClient } from '@/utils/supabase/client';

interface AvatarProps {
  uid: string | null;
  url: string | null;
  size: number;
  onUpload: (url: string) => void;
  className: string;
  uploading: boolean;
  setUploading: (uploading: boolean) => void;
}

const Avatar: React.FC<AvatarProps> = ({
  uid,
  url,
  size,
  onUpload,
  className,
  uploading,
  setUploading,
}) => {
  const supabase = createClient();
  const [avatarUrl, setAvatarUrl] = useState<string | null>(url);

  useEffect(() => {
    const downloadImage = async (path: string) => {
      try {
        const { data, error } = await supabase.storage.from('avatars').download(path);
        if (error) {
          throw error;
        }

        const objectURL = URL.createObjectURL(data);
        setAvatarUrl(objectURL);
      } catch (error) {
        console.error('Error downloading image: ', error);
      }
    };

    if (url) downloadImage(url);
  }, [url, supabase]);

  const uploadAvatar: React.ChangeEventHandler<HTMLInputElement> = async (event) => {
    try {
      setUploading(true);

      if (!event.target.files || event.target.files.length === 0) {
        throw new Error('You must select an image to upload.');
      }

      const file = event.target.files[0];
      const fileExt = file.name.split('.').pop();
      const filePath = `${uid}-${Math.random()}.${fileExt}`;
      setUploading(true);

      // supabase storage에 이미지 저장 (AWS S3랑 비슷)
      const { error: uploadError } = await supabase.storage
        .from('avatars')
        .upload(filePath, file);

      if (uploadError) {
        throw uploadError;
      }

      onUpload(filePath);
    } catch (error) {
      alert('Error uploading avatar!');
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className={className}>
      {avatarUrl ? (
        <Image
          width={size}
          height={size}
          src={avatarUrl}
          alt='Avatar'
          style={{ height: size, width: size }}
        />
      ) : (
        <Image
          width={size}
          height={size}
          src={defaultImg}
          alt='default Avatar'
          style={{ height: size, width: size }}
        />
      )}
      <div style={{ width: size }}>
        <label htmlFor='single'>{uploading ? 'Uploading ...' : 'Upload'}</label>
        <input
          style={{
            visibility: 'hidden',
            position: 'absolute',
          }}
          type='file'
          id='single'
          accept='image/*'
          onChange={uploadAvatar}
          disabled={uploading}
        />
      </div>
    </div>
  );
};

export default Avatar;
