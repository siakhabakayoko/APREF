
// Debug script to check feed query
import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ""
const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ""

if (!supabaseUrl || !supabaseKey) {
    console.error("Missing env vars")
    process.exit(1)
}

const supabase = createClient(supabaseUrl, supabaseKey)

async function debugFeed() {
    console.log("Fetching posts...")
    const { data: posts, error } = await supabase
        .from("posts")
        .select("*, author:profiles(*)")
        .order("is_urgent", { ascending: false })
        .order("created_at", { ascending: false })

    if (error) {
        console.error("Error fetching posts:", error)
    } else {
        console.log(`Found ${posts?.length} posts`)
        if (posts && posts.length > 0) {
            console.log("First post author:", posts[0].author)
        } else {
            console.log("No posts found. Checking if posts table is empty...")
            const { count } = await supabase.from("posts").select("*", { count: 'exact', head: true })
            console.log(`Total posts in DB: ${count}`)
        }
    }
}

debugFeed()
