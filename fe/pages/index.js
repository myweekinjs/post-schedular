import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Layout from '../components/layout'
import SignInWithGoogle from '../components/SignInWithGoogle'
import CreateTweet from '../components/CreateTweet';

const Home = ({
  isAuthenicated
}) => {
  return (
    <Layout>
      <Container>
        {
          isAuthenicated !== null ? (
            <>
              <Row>
                <Col>
                  <h4>Schedule Tweets</h4>
                  <CreateTweet />
                </Col>
                <Col>
                  <h4>Your Scheduled Tweets</h4>
                </Col>
              </Row>
            </>
          ) : (
            <>
              <h2>Welcome to Schedular</h2>
              <SignInWithGoogle />
            </>
          )
        }
      </Container>
    </Layout>
  )
}

export default Home
