/* eslint-disable react/no-array-index-key */
import React from 'react';

import { type UserDetailProfile } from '@/types/account';

import { Input } from '@/components/input';

interface FamilyInfoProps {
  familyInfo: UserDetailProfile['family_info'] | null;
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const FamilyInfo: React.FC<UserDetailProfile & FamilyInfoProps> = ({
  familyInfo,
  setFormData,
}) => {
  const handleInputChange = (index: number, field: string, value: any) => {
    const updatedFamilyInfo = familyInfo?.map((member, i) =>
      i === index ? { ...member, [field]: value } : member,
    );
    setFormData((prevState: any) => ({
      ...prevState!,
      family_info: updatedFamilyInfo,
    }));
  };

  return (
    <div>
      {familyInfo?.map((member, index) => (
        <div key={index}>
          <Input
            type='text'
            label='관계'
            value={member.relationship}
            onChange={(e) => handleInputChange(index, 'relationship', e.target.value)}
            name={`relationship_${index}`}
          />
          <Input
            type='text'
            label='이름'
            value={member.name}
            onChange={(e) => handleInputChange(index, 'name', e.target.value)}
            name={`name_${index}`}
          />
          <Input
            type='number'
            label='나이'
            value={member.age}
            onChange={(e) =>
              handleInputChange(index, 'age', parseInt(e.target.value, 10))
            }
            name={`age_${index}`}
          />
          <Input
            type='text'
            label='최종 학교'
            value={member.final_school}
            onChange={(e) => handleInputChange(index, 'final_school', e.target.value)}
            name={`final_school_${index}`}
          />
          <Input
            type='text'
            label='최종 학력'
            value={member.final_education}
            onChange={(e) => handleInputChange(index, 'final_education', e.target.value)}
            name={`final_education_${index}`}
          />
          <Input
            type='text'
            label='직업 설명'
            value={member.occupation.job_description}
            onChange={(e) =>
              handleInputChange(index, 'occupation.job_description', e.target.value)
            }
            name={`job_description_${index}`}
          />
          <Input
            type='text'
            label='회사 이름'
            value={member.occupation.company_name}
            onChange={(e) =>
              handleInputChange(index, 'occupation.company_name', e.target.value)
            }
            name={`company_name_${index}`}
          />
          <Input
            type='text'
            label='회사 위치'
            value={member.occupation.company_location}
            onChange={(e) =>
              handleInputChange(index, 'occupation.company_location', e.target.value)
            }
            name={`company_location_${index}`}
          />
          <Input
            type='text'
            label='회사 규모'
            value={member.occupation.company_size}
            onChange={(e) =>
              handleInputChange(index, 'occupation.company_size', e.target.value)
            }
            name={`company_size_${index}`}
          />
          <Input
            type='radio'
            label='이혼 여부'
            value={member.divorce_remarriage.divorced ? 'yes' : 'no'}
            onChange={(e) =>
              handleInputChange(
                index,
                'divorce_remarriage.divorced',
                e.target.value === 'yes',
              )
            }
            name={`divorced_${index}`}
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
          <Input
            type='radio'
            label='재혼 여부'
            value={member.divorce_remarriage.remarried ? 'yes' : 'no'}
            onChange={(e) =>
              handleInputChange(
                index,
                'divorce_remarriage.remarried',
                e.target.value === 'yes',
              )
            }
            name={`remarried_${index}`}
            options={[
              { label: 'Yes', value: 'yes' },
              { label: 'No', value: 'no' },
            ]}
          />
          <Input
            type='date'
            label='사망 연도'
            value={member.death_year || ''}
            onChange={(e) =>
              handleInputChange(
                index,
                'death_year',
                e.target.value ? parseInt(e.target.value, 10) : null,
              )
            }
            name={`death_year_${index}`}
          />
          <Input
            type='text'
            label='비고'
            value={member.remark || ''}
            onChange={(e) => handleInputChange(index, 'remark', e.target.value)}
            name={`remark_${index}`}
          />
        </div>
      ))}
    </div>
  );
};

export { FamilyInfo };
