import { auth } from '$lib/server/firebaseAdmin';
import { json } from '@sveltejs/kit';
export async function POST({ request, cookies }) {
  const { idToken } = await request.json();
  const expiresIn = 60 * 60 * 24 * 5 * 1000;
  try {
    const sessionCookie = await auth.createSessionCookie(idToken, { expiresIn });
    const options = { maxAge: expiresIn / 1000, httpOnly: true, secure: true, path: '/', };
    cookies.set('__session', sessionCookie, options);
    return json({ status: 'success' });
  } catch (error) {
    return json({ status: 'error', message: 'Could not create session.' }, { status: 401 });
  }
}