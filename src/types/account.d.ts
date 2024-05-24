// 회원
export interface UserType {
  gender?: string | null; // 성별
  username?: string | null; // 회원 이름
  phone?: string | null; // 연락처 (휴대폰 번호)
  address?: string | null; // 현주소
  origin_address?: string | null; // 주민등록상 주소
  author_type?: string | null; // 작성자 유형
  age?: string | null; // 나이 (DATE)
  avatar_url: string | null; // 프로필 사진
}

// 회원 상세
export interface UserDetailType {
  id: string; // 테이블 고유 식별자 (UUID)
  partner_id?: string | null; // 교제 상대 ID (UUID)
  membership_papers?: {
    id_card?: string; // 신분증
    photo?: string; // 사진
    family_certificate?: string; // 가족관계증명서
    graduation_certificate?: string; // 졸업증명서
    employment_certificate?: string; // 재직증명서
    license_copy?: string; // 자격증 사본
  } | null;
  membership_fee?: number; // 가입비
  membership_fee_success?: number; // 성혼비
  another_phone?: {
    number: string; // 비상 연락처
  } | null;
  charge_manager?: string | null; // 담당 매니저 이름
  manager_type?: {
    C?: string; // 상담 매니저 이름
    M?: string; // 매칭 매니저 이름
  } | null;
  number_of_contracts?: number | null; // 약정 횟수
  service_period_start?: string | null; // 서비스 계약 시작 날짜 (DATE)
  service_period_end?: string | null; // 서비스 계약 종료 날짜 (DATE)
  memo?: string | null; // 메모
  marital_status?: {
    status: string; // 결혼 상태 (초혼, 재혼 등)
    reason?: string | null; // 결혼 이유
    children?: {
      birth: boolean; // 자녀 출생 여부
      custody: {
        self: boolean; // 본인 양육 여부
        spouse: boolean; // 배우자 양육 여부
      };
      sons: number; // 아들 수
      daughters: number; // 딸 수
    };
  } | null;
  living_type?: string | null; // 본인 주거 형태 (동거, 독립)
  housing_type?: string | null; // 본인 주거 형태 (자가, 전세, 월세)
  residence_type?: string | null; // 주거 유형 (아파트, 주택 등)
  residence_level?: number | null; // 주거지 평 수
  parents_owner_check?: boolean | null; // 거주지 부모 소유 체크
  property?: string | null; // 본인 재산 (부동산, 주식, 현금 등)
  education?: {
    high_school?: {
      major: string; // 고등학교 전공
      graduated: boolean; // 졸업 여부
      location: string; // 고등학교 위치
      entrance_year: number; // 입학 년도
      graduation_year: number | null; // 졸업 년도 (null 가능)
    };
    college?: {
      major: string; // 대학 전공
      graduated: boolean; // 졸업 여부
      location: string; // 대학 위치
      entrance_year: number; // 입학 년도
      graduation_year: number | null; // 졸업 년도 (null 가능)
    };
    graduate_school?: {
      major: string; // 대학원 전공
      graduated: boolean; // 졸업 여부
      location: string; // 대학원 위치
      entrance_year: number; // 입학 년도
      graduation_year: number | null; // 졸업 년도 (null 가능)
    };
  } | null;
  job?: {
    company_name: string; // 회사명
    occupation: string; // 직업/업무 분야
    position: string; // 직위
    employment_type: string; // 고용 형태 (정규직, 계약직 등)
    company_address: string; // 회사 주소
    career_history: string[]; // 경력 사항 (이전 근무한 회사들)
    hire_date: string; // 입사 년월
    salary: {
      pre_tax: number; // 세전 연봉
      after_tax: number; // 세후 연봉
      other_income: number; // 그 외 수입
    };
    years_of_service: number; // 재직 연차
  } | null;
  family_info?: Array<{
    relationship: string; // 가족 구성원과의 관계 (부모, 자녀 등)
    name: string; // 성명
    age: number; // 연령
    final_school: string; // 최종 학교명
    final_education: string; // 최종 학력
    occupation: {
      job_description: string; // 직무 설명
      company_name: string; // 회사명
      company_location: string; // 회사 소재지
      company_size: string; // 회사 규모
    };
    divorce_remarriage: {
      divorced: boolean; // 이혼 여부
      remarried: boolean; // 재혼 여부
    };
    death_year?: number | null; // 사망 연도 (생존 시 null)
    remark?: string | null; // 특이사항
  }> | null;
}

// 회원 부모님
export interface UserParentsType {}
