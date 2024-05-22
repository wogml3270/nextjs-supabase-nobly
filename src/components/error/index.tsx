import React from 'react';

export interface ErrorProps {
  message?: string;
}

export const Error: React.FC<ErrorProps> = ({ message = 'Error' }) => {
  return <div style={{ color: 'red', fontSize: '3rem' }}>{message}</div>;
};
