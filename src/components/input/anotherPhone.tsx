/* eslint-disable react/no-array-index-key */
import React from 'react';

import { Input } from '.';
import { Button } from '@/components/button';

interface AnotherPhoneProps {
  anotherPhone: string[];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const AnotherPhone: React.FC<AnotherPhoneProps> = ({ anotherPhone, setFormData }) => {
  const handlePhoneChange = (
    index: number,
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const newPhones = [...anotherPhone];
    newPhones[index] = event.target.value;
    setFormData((prevState: any) => ({
      ...prevState,
      another_phone: newPhones,
    }));
  };

  const handleAddPhone = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      another_phone: [...prevState.another_phone, ''],
    }));
  };

  const handleRemovePhone = (index: number) => {
    const newPhones = anotherPhone.filter((_, i) => i !== index);
    setFormData((prevState: any) => ({
      ...prevState,
      another_phone: newPhones,
    }));
  };

  return (
    <div>
      {anotherPhone.map((phone, index) => (
        <div
          key={index}
          style={{ display: 'flex', alignItems: 'center', gap: '1rem', width: '100%' }}
        >
          <Input
            type='text'
            label={`비상연락처-${index + 1}`}
            value={phone}
            onChange={(e) => handlePhoneChange(index, e)}
            placeholder={`Phone number ${index + 1}`}
          />
          <Button type='button' onClick={() => handleRemovePhone(index)}>
            삭제
          </Button>
        </div>
      ))}
      <Button type='button' onClick={handleAddPhone}>
        추가
      </Button>
    </div>
  );
};

export default AnotherPhone;
