import React from 'react';

import { type UserDetailType } from '@/types/account';

import { Input } from '@/components/input';
import { Button } from '@/components/button';

interface EducationFormProps {
  setFormData: React.Dispatch<React.SetStateAction<any>>;
}

const EducationForm: React.FC<UserDetailType & EducationFormProps> = ({
  education,
  setFormData,
}) => {
  const handleHighSchoolChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        high_school: {
          ...prevState.education.high_school,
          [name]: value,
        },
      },
    }));
  };

  const handlelCollegeChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        college: {
          ...prevState.education.college,
          [name]: value,
        },
      },
    }));
  };
  const handlelUniversityChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        university: {
          ...prevState.education.university,
          [name]: value,
        },
      },
    }));
  };
  const handlelGraduateChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        graduate_school: {
          ...prevState.education.graduate_school,
          [name]: value,
        },
      },
    }));
  };
  const handlelPhdChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => ({
      ...prevState,
      education: {
        ...prevState.education,
        phd_school: {
          ...prevState.education.phd_school,
          [name]: value,
        },
      },
    }));
  };

  const handleOverseasExperienceChange = (
    index: number,
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prevState: any) => {
      const newOverseasExperience = [...(prevState?.overseas_experience || [])];
      newOverseasExperience[index] = {
        ...newOverseasExperience[index],
        [name]: value,
      };
      return {
        ...prevState,
        overseas_experience: newOverseasExperience,
      };
    });
  };

  const addOverseasExperience = () => {
    setFormData((prevState: any) => ({
      ...prevState,
      overseas_experience: [
        ...(prevState?.overseas_experience || []),
        { type: '', country: '', start_date: '', end_date: '' },
      ],
    }));
  };

  const removeOverseasExperience = (index: number) => {
    setFormData((prevState: any) => {
      const newExperience =
        prevState?.overseas_experience?.filter((_: any, i: any) => i !== index) || [];
      return {
        ...prevState,
        overseas_experience: newExperience,
      };
    });
  };

  if (!education) return null;

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <h2>교육 정보</h2>
      <div>
        <h3>고등학교</h3>
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
          value={education?.high_school?.graduated}
          //   checked={education?.high_school?.graduated}
          label='졸업 여부 체크'
          onChange={handleHighSchoolChange}
        />
      </div>
      <div>
        <h3>전문대학</h3>
        <Input
          type='text'
          name='name'
          value={education?.college?.name || ''}
          label='학교명'
          placeholder='학교명 입력'
          onChange={handlelCollegeChange}
        />
        <Input
          type='text'
          name='major'
          value={education?.college?.major || ''}
          label='학과명'
          placeholder='학과명 입력'
          onChange={handlelCollegeChange}
        />
        <Input
          type='text'
          name='location'
          value={education?.college?.location || ''}
          label='소재지'
          placeholder='소재지 입력'
          onChange={handlelCollegeChange}
        />
        <Input
          type='date'
          name='start_date'
          value={education?.college?.start_date || ''}
          label='입학년도'
          placeholder='입학년도 입력'
          onChange={handlelCollegeChange}
        />
        <Input
          type='date'
          name='end_date'
          value={education?.college?.end_date || ''}
          label='졸업년도'
          placeholder='졸업년도 입력'
          onChange={handlelCollegeChange}
        />
        <Input
          type='checkbox'
          name='graduated'
          value={education?.college?.graduated}
          //   checked={education?.high_school?.graduated}
          label='졸업 여부 체크'
          onChange={handlelCollegeChange}
        />
      </div>
      <div>
        <h3>대학교</h3>
        <Input
          type='text'
          name='name'
          value={education?.university?.name || ''}
          label='학교명'
          placeholder='학교명 입력'
          onChange={handlelUniversityChange}
        />
        <Input
          type='text'
          name='major'
          value={education?.university?.major || ''}
          label='학과명'
          placeholder='학과명 입력'
          onChange={handlelUniversityChange}
        />
        <Input
          type='text'
          name='location'
          value={education?.university?.location || ''}
          label='소재지'
          placeholder='소재지 입력'
          onChange={handlelUniversityChange}
        />
        <Input
          type='date'
          name='start_date'
          value={education?.university?.start_date || ''}
          label='입학년도'
          placeholder='입학년도 입력'
          onChange={handlelUniversityChange}
        />
        <Input
          type='date'
          name='end_date'
          value={education?.university?.end_date || ''}
          label='졸업년도'
          placeholder='졸업년도 입력'
          onChange={handlelUniversityChange}
        />
        <Input
          type='checkbox'
          name='graduated'
          value={education?.university?.graduated}
          //   checked={education?.high_school?.graduated}
          label='졸업 여부 체크'
          onChange={handlelUniversityChange}
        />
      </div>
      <div>
        <h3>대학원</h3>
        <Input
          type='text'
          name='name'
          value={education?.graduate_school?.name || ''}
          label='학교명'
          placeholder='학교명 입력'
          onChange={handlelGraduateChange}
        />
        <Input
          type='text'
          name='major'
          value={education?.graduate_school?.major || ''}
          label='학과명'
          placeholder='학과명 입력'
          onChange={handlelGraduateChange}
        />
        <Input
          type='text'
          name='location'
          value={education?.graduate_school?.location || ''}
          label='소재지'
          placeholder='소재지 입력'
          onChange={handlelGraduateChange}
        />
        <Input
          type='date'
          name='start_date'
          value={education?.graduate_school?.start_date || ''}
          label='입학년도'
          placeholder='입학년도 입력'
          onChange={handlelGraduateChange}
        />
        <Input
          type='date'
          name='end_date'
          value={education?.graduate_school?.end_date || ''}
          label='졸업년도'
          placeholder='졸업년도 입력'
          onChange={handlelGraduateChange}
        />
        <Input
          type='checkbox'
          name='graduated'
          value={education?.graduate_school?.graduated}
          //   checked={education?.high_school?.graduated}
          label='졸업 여부 체크'
          onChange={handlelGraduateChange}
        />
      </div>
      <div>
        <h3>박사 학위</h3>
        <Input
          type='text'
          name='name'
          value={education?.phd_school?.name || ''}
          label='학교명'
          placeholder='학교명 입력'
          onChange={handlelPhdChange}
        />
        <Input
          type='text'
          name='major'
          value={education?.phd_school?.major || ''}
          label='학과명'
          placeholder='학과명 입력'
          onChange={handlelPhdChange}
        />
        <Input
          type='text'
          name='location'
          value={education?.phd_school?.location || ''}
          label='소재지'
          placeholder='소재지 입력'
          onChange={handlelPhdChange}
        />
        <Input
          type='date'
          name='start_date'
          value={education?.phd_school?.start_date || ''}
          label='입학년도'
          placeholder='입학년도 입력'
          onChange={handlelPhdChange}
        />
        <Input
          type='date'
          name='end_date'
          value={education?.phd_school?.end_date || ''}
          label='졸업년도'
          placeholder='졸업년도 입력'
          onChange={handlelPhdChange}
        />
        <Input
          type='checkbox'
          name='graduated'
          value={education?.phd_school?.graduated}
          //   checked={education?.high_school?.graduated}
          label='졸업 여부 체크'
          onChange={handlelPhdChange}
        />
      </div>
      <Button type='button' onClick={addOverseasExperience}>
        해외 경험 추가
      </Button>
    </div>
  );
};

export { EducationForm };
