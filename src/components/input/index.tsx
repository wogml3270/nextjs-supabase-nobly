/* eslint-disable no-unused-vars */

'use client';

import React from 'react';

import styles from './input.module.scss';

export interface InputProps {
  type: string;
  label?: string | null;
  value?: string | number | null;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  options?: {
    value: string;
    label: string;
  }[];
}

export interface TextareaProps {
  label?: string | null;
  value?: string | null;
  onChange?: (event: React.ChangeEvent<HTMLTextAreaElement>) => void;
  name?: string;
  id?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  rows?: number;
  cols?: number;
  maxLength?: number;
  minLength?: number;
}

export const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  onChange,
  id,
  name,
  placeholder,
  readOnly,
  disabled,
  required,
  options,
}) => {
  return (
    <div className={styles.input_container}>
      {type === 'radio' && options ? (
        <div className={styles.input_radio_wrap}>
          <label className={styles.radio_label}>{label || ''}</label>
          {options.map((option: any) => (
            <div key={option.value} className={styles.input_radio}>
              <input
                type='radio'
                className={styles.input_radio_option}
                value={option.value}
                checked={value === option.value}
                onChange={onChange}
                id={id}
                name={name}
                readOnly={readOnly}
                disabled={disabled}
                required={required}
              />
              <label htmlFor={option.value} className={styles.radio_label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      ) : (
        <>
          <label htmlFor={name} className={styles.input_label}>
            {label || ''}
          </label>
          <input
            type={type}
            className={styles.input_text}
            value={value ?? ''}
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

export const Textarea: React.FC<TextareaProps> = ({
  label,
  value,
  onChange,
  name,
  id,
  placeholder,
  readOnly,
  disabled,
  required,
  rows,
  cols,
  maxLength,
  minLength,
}) => {
  return (
    <div className={styles.input_container}>
      {label && (
        <label htmlFor={name} className={styles.input_label}>
          {label}
        </label>
      )}
      <textarea
        className={styles.input_textarea}
        value={value ?? ''}
        onChange={onChange}
        name={name}
        id={id}
        placeholder={placeholder}
        readOnly={readOnly}
        disabled={disabled}
        rows={rows}
        cols={cols}
        required={required}
        maxLength={maxLength}
        minLength={minLength}
      />
    </div>
  );
};
