// 매니저 계정 정보
export interface Manager {
  uuid: number; // 테이블의 고유 식별자
  user_id: string; // 로그인한 아이디
  name: string;
  phone: string;
  email: string;
  avatar_url: string;
}

// 로그인한 유저 정보
export interface UserType {
  gender: string | null;
  username: string | null;
  phone: string | null;
  avatar_url: string | null;
  address: string | null;
  origin_address: string | null;
  author_type: string | null;
  age: string | null;
}

export interface UserDetailType {}
