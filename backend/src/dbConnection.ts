import { FirebaseApp, initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import dotenv from 'dotenv'

dotenv.config()

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
}

function getAppInstance() {
  let instance: null | FirebaseApp = null

  return () => {
    if (instance === null) {
      instance = initializeApp(firebaseConfig)
    }

    return instance
  }
}

const app = getAppInstance()()
const dbInstance = getFirestore(app)

export { dbInstance }
