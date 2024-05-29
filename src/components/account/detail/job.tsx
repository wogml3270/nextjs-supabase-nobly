/* eslint-disable react/no-array-index-key */
import React from 'react';

import { type UserDetailType } from '@/types/account';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

interface JobInformationProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const JobInformation: React.FC<UserDetailType & JobInformationProps> = ({
  job,
  setFormData,
}) => {
  const handleInputChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      job: {
        ...prevState.job,
        [name]: value,
      },
    }));
  };

  const handleSalaryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      job: {
        ...prevState.job,
        salary: {
          ...prevState.job.salary,
          [name]: Number(value),
        },
      },
    }));
  };

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
      ...prevState,
      job: {
        ...prevState.job,
        career_history: newCareerHistory,
      },
    }));
  };

  const addCareerHistory = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      job: {
        ...prevState.job,
        career_history: [...(prevState?.job?.career_history || []), ''],
      },
    }));
  };

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
      <Input
        type='text'
        name='company_name'
        value={job?.company_name || ''}
        label='회사명'
        onChange={handleInputChange}
        placeholder='회사명'
      />
      <Input
        type='text'
        name='occupation'
        value={job?.occupation || ''}
        label='직업'
        onChange={handleInputChange}
        placeholder='직업/업무 분야'
      />
      <Input
        type='text'
        name='position'
        value={job?.position || ''}
        label='직위'
        onChange={handleInputChange}
        placeholder='직위'
      />
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
      <Input
        type='date'
        name='hire_date'
        value={job?.hire_date || ''}
        label='입사 년월'
        onChange={handleInputChange}
        placeholder='입사 년월'
      />
      <Input
        type='number'
        name='years_of_service'
        value={job?.years_of_service || ''}
        label='재직 연차'
        onChange={handleInputChange}
        placeholder='재직 연차'
      />
      <h4>연봉</h4>
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
      <h4>경력 사항</h4>
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
