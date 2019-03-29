import React from 'react'
import Container from 'react-bootstrap/Container'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'

import Layout from '../components/layout'
import SignInWithGoogle from '../components/SignInWithGoogle'
import CreateTweet from '../components/CreateTweet'
import ScheduleTweets from '../components/ScheduleTweets'

const Home = ({
  isAuthenticated
}) => {
  return (
    <Layout>
      <Container>
        {
          isAuthenticated !== null ? (
            <>
              <Row>
                <Col>
                  <h4>Schedule Tweets</h4>
                  <CreateTweet />
                </Col>
                <Col>
                  <h4>Your Scheduled Tweets</h4>
                  <ScheduleTweets user={isAuthenticated} />
                </Col>
              </Row>
            </>
          ) : (
            <div className="text-center">
              <h2>Welcome to Schedular</h2>
              <SignInWithGoogle />
            </div>
          )
        }
      </Container>
    </Layout>
  )
}

export default Home
