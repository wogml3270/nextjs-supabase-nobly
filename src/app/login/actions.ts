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

  if (error) {
    if (error.status === 400) {
      return new Response(JSON.stringify({ msg: '아이디 또는 비밀번호가 틀렸습니다.' }), {
        status: 400,
      });
    }
    return new Response(JSON.stringify({ msg: '알 수 없는 에러가 발생했습니다.' }), {
      status: 500,
    });
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
      return new Response(JSON.stringify({ msg: '비밀번호가 너무 짧습니다.' }), {
        status: 400,
      });
    }
    if (error.code === 'user_already_exists') {
      return new Response(JSON.stringify({ msg: '사용자가 이미 존재합니다.' }), {
        status: 409,
      });
    }
    return new Response(JSON.stringify({ msg: '알 수 없는 에러가 발생했습니다.' }), {
      status: 500,
    });
  }

  revalidatePath('/', 'layout');
  redirect('/');
}
