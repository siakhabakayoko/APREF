import { createClient } from '@supabase/supabase-js'

/**
 * Access to the Supabase Admin API.
 * This client bypasses Row Level Security (RLS).
 * DO NOT use this client on the client-side/browser.
 * It should only be used in trusted server-side contexts (Server Actions, API Routes).
 */
export const supabaseAdmin = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.SUPABASE_SERVICE_ROLE_KEY!,
    {
        auth: {
            autoRefreshToken: false,
            persistSession: false,
        },
    }
)
