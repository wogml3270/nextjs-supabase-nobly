'use client';

import React, { useMemo } from 'react';

import { SelectProps } from '@/types/select';

import styles from './index.module.scss';

export const Select: React.FC<SelectProps> = ({
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  disabled,
  required,
  options,
  sortOptions,
}) => {
  // 옵션 정렬 함수
  const sortedOptions = useMemo(() => {
    if (sortOptions === 'asc') {
      return [...options].sort((a, b) => a.label.localeCompare(b.label));
    }
    if (sortOptions === 'desc') {
      return [...options].sort((a, b) => b.label.localeCompare(a.label));
    }
    return options;
  }, [options, sortOptions]);

  return (
    <div className={styles.select_container}>
      {label && (
        <label htmlFor={name} className={styles.select_label}>
          {label}
        </label>
      )}
      <div className={styles.select_wrap}>
        <select
          className={styles.select_box}
          value={value || ''}
          onChange={onChange}
          id={id}
          name={name}
          disabled={disabled}
          required={required}
        >
          <option value='' disabled>
            {placeholder}
          </option>
          {sortedOptions.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};
