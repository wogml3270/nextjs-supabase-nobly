'use client';

import React from 'react';

import { InputProps, TextareaProps } from '@/types/input';

import styles from './input.module.scss';

export const Input: React.FC<InputProps> = ({
  type,
  label,
  value,
  checked,
  onChange,
  id,
  name,
  placeholder,
  readOnly,
  disabled,
  required,
  options,
  unit,
}) => {
  if (type === 'radio' && options) {
    return (
      <div className={styles.input_container}>
        <label className={styles.input_label}>{label || ''}</label>
        <div className={styles.input_radio_wrap}>
          {options.map((option: any) => (
            <div key={option.value} className={styles.input_radio}>
              <input
                type='radio'
                className={styles.input_radio_option}
                value={option.value.toString()}
                checked={value === option.value}
                onChange={onChange}
                id={`${name}_${options.values}`}
                name={name}
                readOnly={readOnly}
                disabled={disabled}
                required={required}
              />
              <label htmlFor={id} className={styles.radio_label}>
                {option.label}
              </label>
            </div>
          ))}
        </div>
      </div>
    );
  }

  if (type === 'checkbox') {
    return (
      <div className={styles.input_container}>
        <div className={styles.input_checkbox_wrap}>
          <input
            type='checkbox'
            className={styles.input_checkbox}
            checked={checked}
            onChange={onChange}
            id={id}
            name={name}
            readOnly={readOnly}
            disabled={disabled}
            required={required}
          />
          <label htmlFor={id} className={styles.checkbox_label}>
            {label}
          </label>
        </div>
      </div>
    );
  }

  // another
  // text, number, date ...
  return (
    <div className={styles.input_container}>
      <label htmlFor={name} className={styles.input_label}>
        {label || ''}
      </label>
      <div className={styles.input_wrap}>
        <input
          type={type}
          className={styles.input_wrap_text}
          value={typeof value === 'boolean' ? '' : value ?? ''}
          onChange={onChange}
          id={id}
          name={name}
          placeholder={placeholder}
          readOnly={readOnly}
          disabled={disabled}
        />
        <span className={styles.input_wrap_unit}>{unit || ''}</span>
      </div>
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
