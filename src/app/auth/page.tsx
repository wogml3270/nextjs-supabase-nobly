'use client';

import { useSupabaseClient } from '@supabase/auth-helpers-react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';

const SignIn = () => {
  const supabaseClient = useSupabaseClient();

  return (
    <div
      style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh',
        margin: 'auto',
      }}
    >
      {supabaseClient ? (
        <Auth
          supabaseClient={supabaseClient}
          appearance={{
            theme: ThemeSupa,
            style: { container: { width: '400px' } },
          }}
          providers={['kakao', 'github']}
        />
      ) : (
        <div>Loading....</div>
      )}
    </div>
  );
};

export default SignIn;
