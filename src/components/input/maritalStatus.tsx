import React from 'react';

import { type UserDetailProfile } from '@/types/account';

import { Input } from '.';

interface MaritalStatusProps {
  maritalStatus?: UserDetailProfile['marital_status'] | null;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

export const MaritalStatus: React.FC<MaritalStatusProps> = ({
  maritalStatus,
  setFormData,
}) => {
  const handleStatusChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState: any) => ({
      ...prevState,
      marital_status: {
        ...prevState?.marital_status,
        [name]: value,
      },
    }));
  };

  return (
    <Input
      type='radio'
      label='결혼 상태'
      name='status'
      value={maritalStatus?.status}
      onChange={handleStatusChange}
      options={[
        { value: '초혼', label: '초혼' },
        { value: '재혼', label: '재혼' },
        { value: '사실혼', label: '사실혼' },
        { value: '삼혼이상', label: '삼혼이상' },
        { value: '재혼-사별', label: '재혼-사별' },
        { value: '재혼-이혼', label: '재혼-이혼' },
      ]}
    />
  );
};
