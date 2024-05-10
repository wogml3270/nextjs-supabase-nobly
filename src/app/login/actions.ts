'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';

import { createClient } from '@/utils/supabase/server';

const supabase = createClient();

// 로그인 요청 함수
export async function login(formData: FormData) {
  const { error } = await supabase.auth.signInWithPassword({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

// 이메일 인증 요청 함수
export async function signup(formData: FormData) {
  const { error } = await supabase.auth.signUp({
    email: formData.get('email') as string,
    password: formData.get('password') as string,
  });

  if (error) {
    redirect('/error');
  }

  revalidatePath('/', 'layout');
  redirect('/account');
}

// 깃허브 로그인 요청 함수
export const githubAuth = async () => {
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'github',
  });

  if (data) console.log(data);
};
