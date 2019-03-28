import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'
import Firebase from './firebase'

const styles = {
  root: {
    flexGrow: 1,
  },
  grow: {
    flexGrow: 1,
  },
};

const Header = (props) => {
  const { isAuthenticated } = props;

  const logout = (e) => {
    e.preventDefault()
    const f = new Firebase()
    f.auth.signOut().then(() => {
      if (typeof window !== 'undefined') {
        window.location.reload()
      }
    })
  }
  
  return (
    <div style={ styles.root }>
      <Navbar bg="light" variant="light">
        <div style={ styles.root }>
          <Navbar.Brand>Schedular</Navbar.Brand>
        </div>
        { isAuthenticated ? <Button variant="primary" onClick={(e) => logout(e)}>Logout</Button> : false }
      </Navbar>
    </div>
  );
}

export default Header
