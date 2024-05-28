/* eslint-disable no-unused-vars */
import React from 'react';

export interface InputProps {
  type: string;
  label?: string | null;
  value?: string | number | boolean | readonly string[] | null;
  onChange?: (e: React.ChangeEvent<HTMLInputElement>) => void;
  id?: string;
  name?: string;
  placeholder?: string;
  readOnly?: boolean;
  disabled?: boolean;
  required?: boolean;
  options?: {
    value: string | boolean;
    label: string;
  }[];
}

export interface TextareaProps {
  label?: string | null;
  value?: string | null;
  onChange?: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
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
