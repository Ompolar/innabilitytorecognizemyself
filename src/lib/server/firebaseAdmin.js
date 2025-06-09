import admin from 'firebase-admin';
import { getApps, initializeApp, cert, getApp as getAdminApp } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';
import { getAuth } from 'firebase-admin/auth';

// HAPUS import { FIREBASE_ADMIN_SDK } dari '$env/static/private';

// Inisialisasi Firebase Admin hanya jika belum ada.
if (!getApps().length) {
    // --- HARDCODED ADMIN SDK ---
    // GANTI DENGAN KONTEN FILE JSON ADMIN SDK ANDA
    const serviceAccount = {
      "type": "service_account",
      "project_id": "innabilitytorecognizemyself",
      "private_key_id": "c3216bd0a9c23bce9d41e7b9b6beb02ddc0c24ff", // Ganti jika Anda membuat kunci baru
      "private_key": "-----BEGIN PRIVATE KEY-----\nMIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCXGXwm3bLjh1Ng\nsve2V2Vsp6hAUw4064uMCJP0lYZ9DgcK/ATu15+J6IHms4yboaQd8ToZa3N+ppk0\n7lAcT5tNuyeKdIAJS7PXVZudtSkZewhDbyG6oCw8cFyyI7VBXa8DC6ena21Aftgl\nIZsToA/SOzByk+O2C3aqkJDaStoPqQGxR24H+V0DMthrxghM1WByKOBHlCIMTkvZ\nEQN4RgoFE2ftYiYgMFHs9WKRAugHC+34mXpZcCBfm5wl35U2iwydLXXxHyiq2ree\nWvVUsHOzgbKGxNzdWBDnvn9nGKE+1GnsxtnN5EupEUYFkfVcFUqoK8zv6ENR/l22\nDR7YHh09AgMBAAECggEABlE2c5mJRSH/Rme1G5aD0wsfabEPQv8mEnC5XtxxhwDz\nIm5u9l1leiqSY8bV9hvH9MiFGVL4vS7R8PiVuNlLMPDGMm+0eq8DkdkubGWKlloi\nek9HJbpUnyJDfd8oUNdN3d6637EKHEwxVTwWc7eZcbyvxdqRBqdsCq2IoNfITic+\nQ/eze6bSExy7HkGYSjiq4WwRkOAqP83zDFxbDSOWcc6Xr7UePdVimKS0H9ol85+K\nYCCvb8Hm3hXd+AjJcXzsSvXR2bkngrYLA4bhuaqxVW4YvQ7dzMMw/pgze/x02ugu\nb0Y3TCCK+S0Bzj5IbBmRTOERzkyAnx0nAdKKEzfAAQKBgQDR0LQ2g2XywD4uVf2b\nLFMElDWhEj0m/T1A0Q60W22/f5YFYggz93XzZokU6ILp+1e9JxmgTyguRAy3eNeu\nsLux0bz3Lt/F8/a4LAeJoBD86uh2MBDcrr/8Wv3QuUn9ugebnTCGpz5N5YDmkGLM\nn3uHVDpwJ5fiY8D7/3YkbRcpPQKBgQC4XBfwkjA3oN8nYHX4K0H5waU7wbKf35XS\nYiHBtLQUM4wxvtmTtIj/aPbh+WKsaJ8TU0TYIVOo2/TqGqXY2yvfGnikLHpRiSa7\np/b+hv1cnI1ym4FH+K917LALWDrwkKmM9dU+YJcgXAtsO/8S1pNHZaj7rHFd+gh9\nFz1LWgoEAQKBgEP3pcla+3WNzRbZiFPyIdqD4HOTIvg0ZNlQX8ERNRYp0IFh5mJf\nMXhtqM57G52MbDm8JtMFkXCbXrs4jDXszoCl/t7b8mV/yFaU/MQadCZaOn++xleW\nzF6FY19wBoYI81n3q7aTCt3VENKfx0GeEDggkuWuDceqpON9N9pI9I3JAoGAEUfY\nmp0pVd2HbUp2ZFexrHaBRXOniaLMiVbXcS+9/XLDflo0TMsMWFx/X7kfjaeU2Zvh\nhRzCmb5cW6E50HTizNvPWRwuLvxbHBXnaf4/O3IVNBvtZ1ChKb2Q1s9jXu9AZU0Z\nuuoU4FygWXnaM+rXDUczKrwEOFnad9c40JpU/AECgYBeRFls5PNDNxkV9MD9nLVz\nZIqtPEhLfqbhlPh/pdi9ozGCKRxXXbG5P0dWv3pRJ1gtEA53TVmBV1praUJufUdi\n2xi/blRtOyEe00wd1UPw1mU00Bamr7pXWmfD6lnyyKtw2Xd/MiJsyC1WsTnLDvd2\n88QEggIBVxCVihD+3Qgg3w==\n-----END PRIVATE KEY-----\n".replace(/\\n/g, '\n'),
      "client_email": "firebase-adminsdk-fbsvc@innabilitytorecognizemyself.iam.gserviceaccount.com",
      "client_id": "115393173380015196302",
      "auth_uri": "https://accounts.google.com/o/oauth2/auth",
      "token_uri": "https://oauth2.googleapis.com/token",
      "auth_provider_x509_cert_url": "https://www.googleapis.com/oauth2/v1/certs",
      "client_x509_cert_url": "https://www.googleapis.com/robot/v1/metadata/x509/firebase-adminsdk-fbsvc%40innabilitytorecognizemyself.iam.gserviceaccount.com"
    };
    
    initializeApp({
        credential: cert(serviceAccount),
    });
}

export const db = getFirestore(getAdminApp());
export const auth = getAuth(getAdminApp());