import { revalidatePath } from 'next/cache';
import { type NextRequest, NextResponse } from 'next/server';

import { createServer } from '@/utils/supabase/server';

export async function POST(req: NextRequest) {
  const supabase = createServer();

  // Check if a user's logged in
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (user) {
    await supabase.auth.signOut();
  }

  revalidatePath('/', 'layout');
  return NextResponse.redirect(new URL('/', req.url), {
    status: 302,
  });
}
