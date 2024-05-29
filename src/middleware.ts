import { NextResponse, type NextRequest } from 'next/server';

import { updateSession } from '@/utils/supabase/middleware';

export const middleware = async (request: NextRequest) => {
  try {
    const response = await updateSession(request);

    // 사용자가 로그인되어 있고 로그인 페이지로 접근하려고 하는 경우 홈페이지로 리다이렉트
    if (
      request.nextUrl.pathname.startsWith('/login') &&
      request.cookies.has('sb:token')
    ) {
      return NextResponse.redirect(new URL('/', request.url));
    }

    return response;
  } catch (error) {
    console.error('Middleware error:', error);
    return NextResponse.error();
  }
};

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
