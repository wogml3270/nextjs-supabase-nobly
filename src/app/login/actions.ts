'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createServer } from '@/utils/supabase/server';

export async function login(formData: FormData) {
  const supabase = createServer();

  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  console.log(error);

  if (error) {
    if (error.status === 400) {
      return { msg: '아이디 또는 비밀번호가 틀렸습니다.' };
    }
    return { msg: '알 수 없는 에러가 발생했습니다.' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}

export async function signup(formData: FormData) {
  const supabase = createServer();

  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    if (error.code === 'weak_password') {
      return { msg: '비밀번호가 너무 짧습니다.' };
    }
    if (error.code === 'user_already_exists') {
      return { msg: '사용자가 이미 존재합니다.' };
    }
    return { msg: '알 수 없는 에러가 발생했습니다.' };
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
