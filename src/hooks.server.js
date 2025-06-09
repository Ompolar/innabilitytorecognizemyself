import { auth } from '$lib/server/firebaseAdmin';
import { redirect } from '@sveltejs/kit';
export const handle = async ({ event, resolve }) => {
  const sessionCookie = event.cookies.get('__session');
  try {
    event.locals.user = await auth.verifySessionCookie(sessionCookie || '', true);
  } catch {
    event.locals.user = null;
  }

  const { pathname } = event.url;
  const user = event.locals.user;

  // --- PERBAIKAN ---
  // Jika pengguna sudah login dan mengakses root '/admin' atau '/admin/',
  // alihkan langsung ke dasbor untuk menghindari 404.
  if (user && (pathname === '/admin' || pathname === '/admin/')) {
      throw redirect(303, '/admin/dashboard');
  }
  
  // Jika pengguna belum login dan mencoba mengakses halaman admin (selain login)
  if (pathname.startsWith('/admin') && !pathname.startsWith('/admin/login')) {
    if (!user) {
      throw redirect(303, '/admin/login');
    }
  }

  // Jika pengguna sudah login dan mencoba mengakses halaman login
  if (pathname.startsWith('/admin/login') && user) {
    throw redirect(303, '/admin/dashboard');
  }

  return resolve(event);
};