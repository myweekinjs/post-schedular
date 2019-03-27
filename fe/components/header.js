import React from 'react';
import Button from 'react-bootstrap/Button';
import Navbar from 'react-bootstrap/Navbar'

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
  
  return (
    <div style={ styles.root }>
      <Navbar bg="light" variant="light">
        <div style={ styles.root }>
          <Navbar.Brand>Schedular</Navbar.Brand>
        </div>
        { isAuthenticated ? <Button variant="primary">Logout</Button> : false }
      </Navbar>
    </div>
  );
}

export default Header
