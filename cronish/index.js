require('dotenv').config()
const admin = require('firebase-admin')
const Twit = require('twit')

// const key = require('./post-schedular-firebase-adminsdk-geihr-3f3bc9be31.json')

admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_projectId,
    clientEmail: process.env.FIREBASE_clientEmail,
    privateKey: process.env.FIREBASE_key
  }),
  databaseURL: "https://post-schedular.firebaseio.com"
})

const schedular = () => {
  const Twitter = new Twit({
    consumer_key: process.env.TWITTER_consumer_key,
    consumer_secret: process.env.TWITTER_consumer_secret,
    access_token: process.env.TWITTER_access_token,
    access_token_secret: process.env.TWITTER_access_token_secret
  })
  const uid = process.env.FIREBASE_uid
  const tweetRef = admin.database().ref(`${uid}/tweets`)
  
  tweetRef.once('value')
    .then(snap => {
      const tweets = snap.val()

      if (tweets !== null && Object.keys(tweets).length > 0) {
        Object.keys(tweets).forEach(key => {
          const tweet = tweets[key]
  
          if (tweet.date < Date.now()) {
            Twitter.post('statuses/update', { status: tweet.tweet }, function(err, data, response) {
              if (typeof err === 'undefined' || err === null) {
                admin.database().ref(`${uid}/tweets/${key}`).remove()
              }
            })
          }
        })
      }
    })
    .catch(e => {
      console.error(e)
    })
}

schedular()

setInterval(schedular, 3000000)
