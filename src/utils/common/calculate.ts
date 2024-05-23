import dayjs from 'dayjs';

// 생년월일을 현재 나이로 변환하는 함수
export const calculateAgeFromBirthday = (birthday: string): number => {
  // 생년월일을 dayjs 객체로 파싱
  const birthDate = dayjs(birthday);
  // 현재 날짜를 가져옴
  const currentDate = dayjs();
  // 현재 나이 계산
  const age = currentDate.diff(birthDate, 'year');
  return age;
};
