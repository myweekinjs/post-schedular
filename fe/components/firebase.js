import getConfig from 'next/config'
const { publicRuntimeConfig } = getConfig()
import firebase from "firebase";

if (!firebase.apps.length) {
  firebase.initializeApp({
    apiKey: `${publicRuntimeConfig.NEXT_FIREBASE_apiKey}`,
    authDomain: `${publicRuntimeConfig.NEXT_FIREBASE_authDomain}`,
    databaseURL: `${publicRuntimeConfig.NEXT_FIREBASE_databaseURL}`,
    projectId: `${publicRuntimeConfig.NEXT_FIREBASE_projectId}`,
    storageBucket: `${publicRuntimeConfig.NEXT_FIREBASE_storageBucket}`,
    messagingSenderId: `${publicRuntimeConfig.NEXT_FIREBASE_messagingSenderId}`
  })
}

export default firebase
