
import { createClient } from '@supabase/supabase-js'
import dotenv from 'dotenv'

dotenv.config({ path: '.env.local' })

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY

if (!supabaseUrl || !supabaseServiceKey) {
    console.error('Missing environment variables. Ensure NEXT_PUBLIC_SUPABASE_URL and SUPABASE_SERVICE_ROLE_KEY are set in .env.local')
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseServiceKey)

const email = 'siakha.bakayoko@gmail.com'

async function setAdmin() {
    console.log(`Looking for user with email: ${email}`)

    // 1. Find the user ID from Auth
    const { data: { users }, error: listError } = await supabase.auth.admin.listUsers()

    if (listError) {
        console.error('Error listing users:', listError)
        process.exit(1)
    }

    const user = users.find(u => u.email === email)

    if (!user) {
        console.error(`User with email ${email} not found. Please ensure the user has signed up first.`)
        process.exit(1)
    }

    console.log(`Found user: ${user.id}`)

    // 2. Update the profile role to 'admin'
    const { error: updateError } = await supabase
        .from('profiles')
        .update({ role: 'admin' })
        .eq('id', user.id)

    if (updateError) {
        console.error('Error updating profile:', updateError)
        process.exit(1)
    }

    console.log(`Successfully promoted ${email} to admin!`)
}

setAdmin()
