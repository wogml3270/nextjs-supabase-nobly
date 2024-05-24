'use client';

import dayjs from 'dayjs';
import React, { useState } from 'react';

interface FormData {
  [key: string]: string | number | null;
}

export const useInput = (initialValue: FormData) => {
  const [formData, setFormData] = useState(initialValue);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value, name, type } = e.target;
    let formattedValue: string | number | null;

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

  return [formData, setFormData, handleChange] as const;
};
