import { type UserDetailProfile } from '@/types/account';

export const userDetailProfile: UserDetailProfile = {
  partner_id: '' || null,
  membership_papers: {
    id_card: '',
    photo: '',
    family_certificate: '',
    graduation_certificate: '',
    employment_certificate: '',
    license_copy: '',
  },
  membership_fee: '',
  membership_fee_success: '',
  another_phone: [],
  charge_manager: '',
  counseling_manager: '',
  maching_manager: '',
  number_of_contracts: 0,
  service_period_start: '' || null,
  service_period_end: '' || null,
  memo: '',
  marital_status: {
    status: '',
    reason: '',
    children: {
      birth: false,
      custody: {
        self: false,
        spouse: false,
      },
      sons: 0,
      daughters: 0,
    },
  },
  living_type: '',
  housing_type: '',
  residence_type: '',
  residence_level: 0,
  parents_owner_check: false,
  property: '',

  job: {
    salary: {
      pre_tax: '',
      after_tax: '',
      other_income: '',
    },
    position: '',
    hire_date: '' || null,
    occupation: '',
    company_name: '',
    career_history: [],
    company_address: '',
    employment_type: '',
    years_of_service: 0,
  },

  education: {
    college: null,
    phd_school: null,
    university: null,
    high_school: null,
    graduate_school: null,
    overseas_experience: [],
  },

  family_info: [],
};
