import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

let authClient;
let app;

// Inisialisasi Firebase HANYA di sisi klien
if (typeof window !== 'undefined') {
  if (!getApps().length) {
    // --- HARDCODED CLIENT CONFIG ---
    // Ganti dengan konfigurasi dari proyek Firebase Anda
    const firebaseConfig = {
      apiKey: "AIzaSyAl3NBekK0HYfxAMUh-yi7MkHZ8j74B_t8",
      authDomain: "innabilitytorecognizemyself.firebaseapp.com",
      projectId: "innabilitytorecognizemyself",
      storageBucket: "innabilitytorecognizemyself.appspot.com",
      messagingSenderId: "28498986863",
      appId: "1:28498986863:web:4e4991c3225670cf058a9a",
      measurementId: "G-B5FNZ01JC9"
    };
    app = initializeApp(firebaseConfig);
  } else {
    app = getApp();
  }
  authClient = getAuth(app);
}

export { authClient };