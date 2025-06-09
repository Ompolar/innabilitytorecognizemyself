import { db } from '$lib/server/firebaseAdmin';
import { fail, error as svelteKitError } from '@sveltejs/kit';

export async function load() {
  try {
    const docRef = db.collection('portfolio').doc('main');
    const doc = await docRef.get();
    if (!doc.exists) { return { portfolio: {} }; }
    return { portfolio: doc.data() };
  } catch (err) {
      console.error("Gagal memuat data dasbor:", err.message);
      throw svelteKitError(500, "Tidak dapat terhubung ke database. Periksa log server.");
  }
}
export const actions = {
  update: async ({ request }) => {
    const data = await request.formData();
    try {
      const portfolioData = {
        name: data.get('name'),
        title: data.get('title'),
        aboutme: data.get('aboutme'),
        contact: {
          email: data.get('contact.email'),
          phone: data.get('contact.phone'),
          linkedin: data.get('contact.linkedin'),
        },
        experience: JSON.parse(data.get('experience') || '[]'),
        education: JSON.parse(data.get('education') || '[]'),
      };
      await db.collection('portfolio').doc('main').set(portfolioData, { merge: true });
      return { success: true, message: 'Portfolio updated successfully!' };
    } catch (error) {
      return fail(500, { error: 'Failed to update portfolio. Check data format.' });
    }
  }
};