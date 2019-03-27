import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import app from "firebase/app"
import "firebase/auth"
import "firebase/database"

const config = {
  apiKey: `${publicRuntimeConfig.NEXT_FIREBASE_apiKey}`,
  authDomain: `${publicRuntimeConfig.NEXT_FIREBASE_authDomain}`,
  databaseURL: `${publicRuntimeConfig.NEXT_FIREBASE_databaseURL}`,
  projectId: `${publicRuntimeConfig.NEXT_FIREBASE_projectId}`,
  storageBucket: `${publicRuntimeConfig.NEXT_FIREBASE_storageBucket}`,
  messagingSenderId: `${publicRuntimeConfig.NEXT_FIREBASE_messagingSenderId}`
}

class Firebase {
  constructor() {
    if (!app.apps.length) {
      app.initializeApp(config)
    }

    this.auth = app.auth()
    this.db = app.database()

    this.googleProvider = new app.auth.GoogleAuthProvider()
  }

  doSignInWithGoogle = () => (
    this.auth.signInWithPopup(this.googleProvider)
  )

  doAuthCheck = () => (
    this.auth.currentUser
  )

  doSetSessionPersistence = () => (
    this.auth.setPersistence(app.auth.Auth.Persistence.SESSION)
  )

  scheduleTweet = (uid) => this.db.ref(`${uid}/tweets`)
}

export default Firebase
