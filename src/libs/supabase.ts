// import { createClient } from "@supabase/supabase-js";

import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";

// const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL as string;
// const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY as string;
// const supabase = createClient(supabaseUrl, supabaseKey);

// export { supabase };

export const supabase = createClientComponentClient();
