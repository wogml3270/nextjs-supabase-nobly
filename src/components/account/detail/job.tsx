/* eslint-disable react/no-array-index-key */
import React from 'react';

import { type UserDetailProfile } from '@/types/account';
import { FlexBox } from '@/containers/flexBox';

import { Input } from '@/components/input';
import { Button } from '@/components/button';
import { Select } from '@/components/select';
import { occupations } from '@/components/select/options';

interface JobInformationProps {
  job: UserDetailProfile['job'];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const JobInformation: React.FC<JobInformationProps> = ({ job, setFormData }) => {
  // 기본 핸들러
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => {
      if (name === 'years_of_service') {
        return {
          ...prevState,
          job: {
            ...prevState.job,
            [name]: Number(value),
          },
        };
      }
      return {
        ...prevState,
        job: {
          ...prevState.job,
          [name]: value,
        },
      };
    });
  };

  // salary 핸들러
  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      job: {
        ...prevState.job,
        salary: {
          ...prevState.job?.salary,
          [name]: Number(value),
        },
      },
    }));
  };

  // select box 핸들러
  const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      job: {
        ...prevState.job,
        [name]: value,
      },
    }));
  };

  // 경력 사항 핸들러
  const handleCareerHistoryChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    const newCareerHistory = [...(job?.career_history || [])];
    newCareerHistory[index] = {
      ...newCareerHistory[index],
      [name]: value,
    };
    setFormData((prevState: any) => ({
      ...prevState!,
      job: {
        ...prevState.job,
        career_history: newCareerHistory,
      },
    }));
  };

  // 경력 사항 추가 핸들러
  const addCareerHistory = () => {
    setFormData((prevState: any) => ({
      ...prevState!,
      job: {
        ...prevState.job,
        career_history: [...(prevState?.job?.career_history || []), ''],
      },
    }));
  };

  // 경력 사항 삭제 핸들러
  const removeCareerHistory = (index: number) => {
    const newCareerHistory = job?.career_history.filter((_, i) => i !== index) || [];
    setFormData((prevState: any) => ({
      ...prevState,
      job: {
        ...prevState.job,
        career_history: newCareerHistory,
      },
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h1>직장 정보</h1>
      <FlexBox dir='row'>
        <Input
          type='text'
          name='company_name'
          value={job?.company_name || ''}
          label='회사명'
          onChange={handleInputChange}
          placeholder='회사명'
        />
        <Select
          name='occupation'
          value={job?.occupation || ''}
          label='직업'
          placeholder='직업을 선택하세요'
          onChange={handleSelectChange}
          sortOptions='asc'
          options={occupations}
        />
        <Input
          type='text'
          name='position'
          value={job?.position || ''}
          label='직위'
          onChange={handleInputChange}
          placeholder='직위'
        />
      </FlexBox>
      <FlexBox dir='row'>
        <Input
          type='text'
          name='employment_type'
          value={job?.employment_type || ''}
          label='고용 형태'
          onChange={handleInputChange}
          placeholder='고용 형태'
        />
        <Input
          type='text'
          name='company_address'
          value={job?.company_address || ''}
          label='회사 주소'
          onChange={handleInputChange}
          placeholder='회사 주소'
        />
      </FlexBox>
      <FlexBox dir='row'>
        <Input
          type='date'
          name='hire_date'
          value={job?.hire_date || ''}
          label='입사 날짜'
          onChange={handleInputChange}
          placeholder='입사 날짜'
        />
        <Input
          type='number'
          name='years_of_service'
          value={job?.years_of_service || ''}
          label='재직 연차'
          onChange={handleInputChange}
          placeholder='재직 연차'
        />
      </FlexBox>
      <h2>연봉</h2>
      <FlexBox dir='row'>
        <Input
          type='number'
          name='pre_tax'
          value={job?.salary?.pre_tax || ''}
          label='세전 연봉'
          onChange={handleSalaryChange}
          placeholder='세전 연봉'
        />
        <Input
          type='number'
          name='after_tax'
          value={job?.salary?.after_tax || ''}
          label='세후 연봉'
          onChange={handleSalaryChange}
          placeholder='세후 연봉'
        />
        <Input
          type='number'
          name='other_income'
          value={job?.salary?.other_income || ''}
          label='그 외 수입'
          onChange={handleSalaryChange}
          placeholder='그 외 수입'
        />
      </FlexBox>
      <h2>경력 사항</h2>
      {job &&
        job?.career_history?.map((career, index) => (
          <div
            key={index}
            style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <Input
              type='text'
              value={career.name}
              onChange={(e) => handleCareerHistoryChange(index, e)}
              name='name'
              placeholder='회사명'
              label='회사명'
            />
            <Input
              type='date'
              value={career.start_date}
              onChange={(e) => handleCareerHistoryChange(index, e)}
              name='start_date'
              placeholder='날짜'
              label='입사일'
            />
            <Input
              type='date'
              value={career.end_date}
              onChange={(e) => handleCareerHistoryChange(index, e)}
              name='end_date'
              placeholder='날짜'
              label='퇴사일'
            />
            <Button type='button' onClick={() => removeCareerHistory(index)}>
              삭제
            </Button>
          </div>
        ))}
      <Button type='button' onClick={addCareerHistory}>
        경력 추가
      </Button>
    </div>
  );
};

export { JobInformation };
