/* eslint-disable react/no-array-index-key */
import React from 'react';

import { type UserDetailProfile } from '@/types/account';
import { FlexBox } from '@/containers/flexBox';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

interface EducationFormProps {
  education: UserDetailProfile['education'];
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const EducationForm: React.FC<EducationFormProps> = ({ education, setFormData }) => {
  // 기본 핸들러
  const handleEducationChange = (level: string, e: any) => {
    const { name, value, type, checked } = e.target;

    const newValue = type === 'checkbox' ? checked : value; // 체크박스의 경우 checked 값을 사용, 텍스트 입력의 경우 value 값을 사용

    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        [level]: {
          ...prevState.education[level],
          [name]: newValue,
        },
      },
    }));
  };

  // 각 체인지 핸들러
  const handleHighSchoolChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEducationChange('high_school', e);
  const handleCollegeChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEducationChange('college', e);
  const handleUniversityChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEducationChange('university', e);
  const handleGraduateChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEducationChange('graduate_school', e);
  const handlePhdChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    handleEducationChange('phd_school', e);

  // 해외 경험 체인지 핸들러
  const handleOverseasExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => {
      const newOverseasExperience = [...(prevState.education?.overseas_experience || [])];
      newOverseasExperience[index] = {
        ...newOverseasExperience[index],
        [name]: value,
      };
      return {
        ...prevState,
        education: {
          ...prevState.education,
          overseas_experience: newOverseasExperience,
        },
      };
    });
  };

  // 해외 경험 추가 핸들러
  const addOverseasExperience = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        overseas_experience: [
          ...(prevState.education?.overseas_experience || []),
          { type: '', country: '', start_date: '', end_date: '' },
        ],
      },
    }));
  };

  // 해외 경험 삭제 핸들러
  const removeOverseasExperience = (index: number) => {
    setFormData((prevState: any) => {
      const newExperience =
        prevState.education?.overseas_experience?.filter(
          (_: any, i: number) => i !== index,
        ) || [];
      return {
        ...prevState,
        education: {
          ...prevState.education,
          overseas_experience: newExperience,
        },
      };
    });
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', width: '100%' }}>
      <h1>학력 정보</h1>
      <div>
        <h2>고등학교</h2>
        <FlexBox dir='row'>
          <Input
            type='text'
            name='name'
            value={education?.high_school?.name || ''}
            label='학교명'
            placeholder='학교명 입력'
            onChange={handleHighSchoolChange}
          />
          <Input
            type='text'
            name='major'
            value={education?.high_school?.major || ''}
            label='학과명'
            placeholder='학과명 입력'
            onChange={handleHighSchoolChange}
          />
          <Input
            type='text'
            name='location'
            value={education?.high_school?.location || ''}
            label='소재지'
            placeholder='소재지 입력'
            onChange={handleHighSchoolChange}
          />
        </FlexBox>
        <FlexBox dir='row'>
          <Input
            type='date'
            name='start_date'
            value={education?.high_school?.start_date || ''}
            label='입학년도'
            placeholder='입학년도 입력'
            onChange={handleHighSchoolChange}
          />
          <Input
            type='date'
            name='end_date'
            value={education?.high_school?.end_date || ''}
            label='졸업년도'
            placeholder='졸업년도 입력'
            onChange={handleHighSchoolChange}
          />
          <Input
            type='checkbox'
            name='graduated'
            checked={education?.high_school?.graduated}
            label='졸업 여부 체크'
            onChange={handleHighSchoolChange}
          />
        </FlexBox>
      </div>
      <div>
        <h2>전문대학</h2>
        <FlexBox dir='row'>
          <Input
            type='text'
            name='name'
            value={education?.college?.name || ''}
            label='학교명'
            placeholder='학교명 입력'
            onChange={handleCollegeChange}
          />
          <Input
            type='text'
            name='major'
            value={education?.college?.major || ''}
            label='학과명'
            placeholder='학과명 입력'
            onChange={handleCollegeChange}
          />
          <Input
            type='text'
            name='location'
            value={education?.college?.location || ''}
            label='소재지'
            placeholder='소재지 입력'
            onChange={handleCollegeChange}
          />
        </FlexBox>
        <FlexBox dir='row'>
          <Input
            type='date'
            name='start_date'
            value={education?.college?.start_date || ''}
            label='입학년도'
            placeholder='입학년도 입력'
            onChange={handleCollegeChange}
          />
          <Input
            type='date'
            name='end_date'
            value={education?.college?.end_date || ''}
            label='졸업년도'
            placeholder='졸업년도 입력'
            onChange={handleCollegeChange}
          />
          <Input
            type='checkbox'
            name='graduated'
            checked={education?.college?.graduated}
            label='졸업 여부 체크'
            onChange={handleCollegeChange}
          />
        </FlexBox>
      </div>
      <div>
        <h2>대학교</h2>
        <FlexBox dir='row'>
          <Input
            type='text'
            name='name'
            value={education?.university?.name || ''}
            label='학교명'
            placeholder='학교명 입력'
            onChange={handleUniversityChange}
          />
          <Input
            type='text'
            name='major'
            value={education?.university?.major || ''}
            label='학과명'
            placeholder='학과명 입력'
            onChange={handleUniversityChange}
          />
          <Input
            type='text'
            name='location'
            value={education?.university?.location || ''}
            label='소재지'
            placeholder='소재지 입력'
            onChange={handleUniversityChange}
          />
        </FlexBox>
        <FlexBox dir='row'>
          <Input
            type='date'
            name='start_date'
            value={education?.university?.start_date || ''}
            label='입학년도'
            placeholder='입학년도 입력'
            onChange={handleUniversityChange}
          />
          <Input
            type='date'
            name='end_date'
            value={education?.university?.end_date || ''}
            label='졸업년도'
            placeholder='졸업년도 입력'
            onChange={handleUniversityChange}
          />
          <Input
            type='checkbox'
            name='graduated'
            checked={education?.university?.graduated}
            label='졸업 여부 체크'
            onChange={handleUniversityChange}
          />
        </FlexBox>
      </div>
      <div>
        <h2>대학원</h2>
        <FlexBox dir='row'>
          <Input
            type='text'
            name='name'
            value={education?.graduate_school?.name || ''}
            label='학교명'
            placeholder='학교명 입력'
            onChange={handleGraduateChange}
          />
          <Input
            type='text'
            name='major'
            value={education?.graduate_school?.major || ''}
            label='학과명'
            placeholder='학과명 입력'
            onChange={handleGraduateChange}
          />
          <Input
            type='text'
            name='location'
            value={education?.graduate_school?.location || ''}
            label='소재지'
            placeholder='소재지 입력'
            onChange={handleGraduateChange}
          />
        </FlexBox>
        <FlexBox dir='row'>
          <Input
            type='date'
            name='start_date'
            value={education?.graduate_school?.start_date || ''}
            label='입학년도'
            placeholder='입학년도 입력'
            onChange={handleGraduateChange}
          />
          <Input
            type='date'
            name='end_date'
            value={education?.graduate_school?.end_date || ''}
            label='졸업년도'
            placeholder='졸업년도 입력'
            onChange={handleGraduateChange}
          />
          <Input
            type='checkbox'
            name='graduated'
            checked={education?.graduate_school?.graduated}
            label='졸업 여부 체크'
            onChange={handleGraduateChange}
          />
        </FlexBox>
      </div>
      <div>
        <h2>박사 학위</h2>
        <FlexBox dir='row'>
          <Input
            type='text'
            name='name'
            value={education?.phd_school?.name || ''}
            label='학교명'
            placeholder='학교명 입력'
            onChange={handlePhdChange}
          />
          <Input
            type='text'
            name='major'
            value={education?.phd_school?.major || ''}
            label='학과명'
            placeholder='학과명 입력'
            onChange={handlePhdChange}
          />
          <Input
            type='text'
            name='location'
            value={education?.phd_school?.location || ''}
            label='소재지'
            placeholder='소재지 입력'
            onChange={handlePhdChange}
          />
        </FlexBox>
        <FlexBox dir='row'>
          <Input
            type='date'
            name='start_date'
            value={education?.phd_school?.start_date || ''}
            label='입학년도'
            placeholder='입학년도 입력'
            onChange={handlePhdChange}
          />
          <Input
            type='date'
            name='end_date'
            value={education?.phd_school?.end_date || ''}
            label='졸업년도'
            placeholder='졸업년도 입력'
            onChange={handlePhdChange}
          />
          <Input
            type='checkbox'
            name='graduated'
            checked={!!education?.phd_school?.graduated}
            label='졸업 여부 체크'
            onChange={handlePhdChange}
          />
        </FlexBox>
      </div>
      {/* 해외 경험 리스트 렌더링 */}
      <h2>해외 경험</h2>
      {education?.overseas_experience.map((experience, index) => (
        <div key={index}>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              type='text'
              name='type'
              label='유형'
              value={experience?.type || ''}
              onChange={(e) => handleOverseasExperienceChange(index, e)}
            />
            <Input
              type='text'
              name='country'
              label='국가'
              value={experience?.country || ''}
              onChange={(e) => handleOverseasExperienceChange(index, e)}
            />
          </div>
          <div style={{ display: 'flex', gap: '10px' }}>
            <Input
              type='date'
              name='start_date'
              label='출국일'
              value={experience?.start_date || ''}
              onChange={(e) => handleOverseasExperienceChange(index, e)}
            />
            <Input
              type='date'
              name='end_date'
              label='귀국일'
              value={experience?.end_date || ''}
              onChange={(e) => handleOverseasExperienceChange(index, e)}
            />
          </div>
          <div style={{ textAlign: 'right' }}>
            <Button onClick={() => removeOverseasExperience(index)}>삭제</Button>
          </div>
        </div>
      ))}
      <div style={{ textAlign: 'center' }}>
        <Button type='button' onClick={addOverseasExperience}>
          해외 경험 추가
        </Button>
      </div>
    </div>
  );
};

export { EducationForm };
