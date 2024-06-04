'use client';

import React from 'react';

import { Input } from '@/components/input';

interface MembershipPapersFormProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const MembershipPapersForm: React.FC<MembershipPapersFormProps> = ({ setFormData }) => {
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, files } = e.target;
    const file = files ? files[0] : null;

    setFormData((prevFormData: any) => ({
      ...prevFormData,
      membership_papers: {
        ...prevFormData.membership_papers,
        [name]: file,
      },
    }));
  };

  return (
    <div>
      <Input type='file' name='id_card' label='신분증' onChange={handleFileChange} />
      <Input type='file' name='photo' label='사진' onChange={handleFileChange} />
      <Input
        type='file'
        name='family_certificate'
        label='가족관계증명서'
        onChange={handleFileChange}
      />
      <Input
        type='file'
        name='graduation_certificate'
        label='졸업 증명서'
        onChange={handleFileChange}
      />
      <Input
        type='file'
        name='employment_certificate'
        label='재직증명서'
        onChange={handleFileChange}
      />
      <Input
        type='file'
        name='license_copy'
        label='자격증 사본'
        onChange={handleFileChange}
      />
    </div>
  );
};

export { MembershipPapersForm };
