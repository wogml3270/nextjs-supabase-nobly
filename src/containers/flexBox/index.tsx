import React from 'react';

interface FlexBoxProps {
  children: React.ReactNode;
  dir: 'row' | 'col';
  gap?: string;
  justify?: string;
  items?: string;
  width?: number;
}

export const FlexBox: React.FC<FlexBoxProps> = ({
  children,
  dir,
  gap = '10px',
  justify = 'center',
  items = 'center',
  width,
}) => {
  return (
    <div
      style={{
        display: 'flex',
        flexDirection: dir === 'row' ? 'row' : 'column',
        width: `${width}%`,
        gap,
        justifyContent: justify,
        alignItems: items,
      }}
    >
      {children}
    </div>
  );
};
