import React, { useState, useEffect } from 'react';

import { type MaritalStatusType } from '@/types/account';

import { Input } from '.';

interface MaritalStatusProps {
  initialFormData?: MaritalStatusType | null;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export const MaritalStatus: React.FC<MaritalStatusProps> = ({
  initialFormData,
  onChange,
}) => {
  const [formData, setFormData] = useState(
    initialFormData || {
      status: '',
      reason: null,
      children: {
        birth: false,
        custody: {
          self: false,
          spouse: false,
        },
        sons: 0,
        daughters: 0,
      },
    },
  );

  useEffect(() => {
    if (initialFormData !== undefined) {
      setFormData(
        initialFormData || {
          status: '',
          reason: null,
          children: {
            birth: false,
            custody: {
              self: false,
              spouse: false,
            },
            sons: 0,
            daughters: 0,
          },
        },
      );
    }
  }, [initialFormData]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    onChange(event);
  };

  return (
    <Input
      type='radio'
      label='결혼 상태'
      name='status'
      value={formData.status}
      onChange={handleInputChange}
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
