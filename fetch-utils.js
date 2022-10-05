const SUPABASE_URL = 'https://ardehxxtbwarljasqfdg.supabase.co';
const SUPABASE_KEY =
    'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImFyZGVoeHh0YndhcmxqYXNxZmRnIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NjUwMDExNDIsImV4cCI6MTk4MDU3NzE0Mn0.uVbIL_6CQD7Te_lx7YlOlh6lYc74KQr5DdDIT1bGkc0';
const client = supabase.createClient(SUPABASE_URL, SUPABASE_KEY);

/* Auth related functions */

export function getUser() {
    return client.auth.user();
}

export async function signUpUser(email, password) {
    return await client.auth.signUp({
        email,
        password,
    });
}

export async function signInUser(email, password) {
    return await client.auth.signIn({
        email,
        password,
    });
}

export async function signOutUser() {
    return await client.auth.signOut();
}

/* Data functions */
