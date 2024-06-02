import React from 'react';

interface FlexBoxProps {
  children: React.ReactNode;
  dir: 'row' | 'col';
  gap?: string;
  justify?: string;
  items?: string;
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  dir,
  gap = '10px',
  justify = 'center',
  items = 'center',
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: dir === 'row' ? 'row' : 'column',
        gap,
        justifyContent: justify,
        alignItems: items,
      }}
    >
      {children}
    </div>
  );
};
