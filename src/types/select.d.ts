import React from 'react';

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface SelectProps {
  label?: string;
  value?: string | number;
  onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void;
  id?: string;
  name: string;
  placeholder?: string;
  disabled?: boolean;
  required?: boolean;
  options: SelectOption[];
  sortOptions?: 'asc' | 'desc';
}
