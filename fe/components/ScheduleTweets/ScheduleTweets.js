import React, { useState, useEffect } from 'react'
import Firebase from '../firebase'
import Card from 'react-bootstrap/Card'

const ScheduleTweets = ({
  user
}) => {
  const [loading, setLoading] = useState(true)
  const [tweets, setTweets] = useState(null)
  const firebase = new Firebase()
  const tweetRef = firebase.scheduleTweet(user.uid)

  console.log(tweets)

  useEffect(() => {

    const updateWithSnapshot = (snapshot) => {
      setTweets(snapshot.val())
      setLoading(false)
    }

    tweetRef.on('value', snap => updateWithSnapshot(snap))

    return () => {
      tweetRef.off()
    }
  }, [])

  const renderTweetList = () => {
    if (tweets !== null) {
      return Object.keys(tweets).map((key) => (
        <Card key={key} style={{ marginBottom: '16px' }}>
          <Card.Header>{ new Date(tweets[key].date).toLocaleString("en-US", {timeZone: "Australia/Sydney"}) }</Card.Header>
          <Card.Body>
            { tweets[key].tweet }
          </Card.Body>
        </Card>
      ))
    }
    else {
      return 'No Tweets Scheduled'
    }
  }

  return (
    <>
      {
        loading ? 'Loading...' : (
          <>
            { renderTweetList() }
          </>
        )
      }
    </>
  )
}

export default ScheduleTweets
