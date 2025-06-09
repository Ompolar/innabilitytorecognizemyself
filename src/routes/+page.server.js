import { db } from '$lib/server/firebaseAdmin';
export async function load() {
  try {
    const doc = await db.collection('portfolio').doc('main').get();
    if (!doc.exists) {
      return {
        portfolio: {
          name: "Your Name", title: "Your Title", aboutme: "About me...",
          experience: [], education: [], contact: {}
        }
      };
    }
    return { portfolio: doc.data() };
  } catch (error) {
    console.error("Failed to load portfolio data:", error);
    return { status: 500, error: new Error('Could not load portfolio data.') };
  }
}