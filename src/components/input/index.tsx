/* eslint-disable no-unused-vars */

'use client';

import React from 'react';

import styles from './input.module.scss';

export interface RadioOption {
  value: string;
  label: string;
}

export interface IndexProps {
  type: string;
  label?: string | null;
  value?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  options?: RadioOption[];
}

export const Input: React.FC<IndexProps> = ({
  type,
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  readOnly,
  disabled,
  options,
}) => {
  return (
    <div className={styles.input_container}>
      {type === 'radio' && options ? (
        <>
          <label className={styles.input_label}>{label || ''}</label>
          {options.map((option: any) => (
            <div key={option.value} className={styles.radio_option}>
              <input
                type='radio'
                className={styles.input_radio}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                id={`${id}-${option.value}`}
                name={name}
                readOnly={readOnly}
                disabled={disabled}
              />
              <label htmlFor={`${id}-${option.value}`} className={styles.radio_label}>
                {option.label}
              </label>
            </div>
          ))}
        </>
      ) : (
        <>
          <label htmlFor={name} className={styles.input_label}>
            {label || ''}
          </label>
          <input
            type={type}
            className={styles.input_text}
            value={value || ''}
            onChange={onChange}
            id={id}
            name={name}
            placeholder={placeholder}
            readOnly={readOnly}
            disabled={disabled}
          />
        </>
      )}
    </div>
  );
};
