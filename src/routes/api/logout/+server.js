import { redirect } from '@sveltejs/kit';
export async function POST({ cookies }) {
  cookies.delete('__session', { path: '/' });
  throw redirect(303, '/admin/login');
}
