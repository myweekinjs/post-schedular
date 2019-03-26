import React from 'react'
import Button from '@material-ui/core/Button';
import firebase from '../firebase'

const SignInWithGoogle = () => {
  const popUpAuth = (e) => {
    e.preventDefault()
    
    const provider = new firebase.auth.GoogleAuthProvider()
    provider.addScope('profile')
    provider.addScope('email')

    firebase.auth().signInWithPopup(provider)
      .then((result) => {
        console.log(result)
      })
      .catch((e) => {
        console.error(e)
      })
  }

  return (
    <Button variant="contained" color="primary" onClick={(e) => popUpAuth(e)}>
      Sign In With Google
    </Button>
  )
}

export default SignInWithGoogle
