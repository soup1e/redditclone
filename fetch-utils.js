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

export async function createThreads(thread) {
    return await client.from('posts').insert(thread);
}

export async function getThreads() {
    return await client.from('posts').select('*');
}

export async function getThread(id) {
    return await client
        .from('posts')
        .select(
            `
            *,
            comments(*)
            `
        )
        .eq('id', id)
        .order('created_at', { foreignTable: 'comments', ascending: false })
        .single();
}

export async function createComment(comment) {
    return await client.from('comments').insert(comment).single();
}

export async function uploadImage(bucketName, imagePath, imageFile) {
    const bucket = client.storage.from(bucketName);
    const response = await bucket.upload(imagePath, imageFile, {
        cacheControl: '3600',
        upsert: true,
    });

    if (response.error) {
        console.log(response.error);
        return null;
    }

    const url = `${SUPABASE_URL}/storage/v1/object/public/${response.data.Key}`;

    return url;
}
