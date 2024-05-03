import { createMiddlewareClient } from '@supabase/auth-helpers-nextjs';
import { NextRequest, NextResponse } from 'next/server';

export const middleware = async (req: NextRequest) => {
  try {
    const res = NextResponse.next();
    const supabase = createMiddlewareClient({ req, res });
    const {
      data: { session },
    } = await supabase.auth.getSession();

    console.log(session);
    if (!session) {
      return NextResponse.rewrite(new URL('/auth', req.url));
    }
    return res;
  } catch (error) {
    console.error(error);
  }
};

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*).'],
};
