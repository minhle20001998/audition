import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: 'AIzaSyCI-NoVJWWMvXaLHxWR3jllBUFl5CMtcZ8',
    authDomain: 'instaclone-44f56.firebaseapp.com',
    projectId: 'instaclone-44f56',
    storageBucket: 'instaclone-44f56.appspot.com',
    messagingSenderId: '1065376182098',
    appId: '1:1065376182098:web:dbee1a04c38842e7af948b',
    measurementId: 'G-1L0PFXLMLX'
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);

export const auth = getAuth(app);
export default app;