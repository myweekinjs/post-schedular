import React from 'react'
import Button from 'react-bootstrap/Button';
import Firebase from '../firebase'

const SignInWithGoogle = () => {
  const popUpAuth = (e) => {
    e.preventDefault()
    
    const firebase = new Firebase()

    firebase.doSetSessionPersistence()
      .then(() => {
        firebase.doSignInWithGoogle()
          .then(res => { console.log(res) })
          .catch(res => { console.error(res) })
      })
      .catch(e => { console.error(e) })
  }

  return (
    <Button variant="primary" onClick={(e) => popUpAuth(e)}>Sign In With Google</Button>
  )
}

export default SignInWithGoogle
