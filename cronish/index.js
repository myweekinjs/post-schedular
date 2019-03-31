require('dotenv').config()
const admin = require('firebase-admin')
const Twit = require('twit')

// Initialise the Firebase app
admin.initializeApp({
  credential: admin.credential.cert({
    projectId: process.env.FIREBASE_projectId,
    clientEmail: process.env.FIREBASE_clientEmail,
    privateKey: process.env.FIREBASE_key
  }),
  databaseURL: "https://post-schedular.firebaseio.com"
})

/**
 * Check if date is in the past
 * 
 * @param {Date} date (Date to check if it is in the past)
 * @return {boolean}
 */
const isPastPost = (date) => {
  return date < Date.now()
}

/**
 * Deletes a given post from the Firebase Database
 * 
 * @param {string} ref (Firebase database ref as a string)
 * @return false
 */
const deletePostFromFirebase = (ref) => {
  admin.database().ref(ref).remove()
}

/**
 * Checks if the tweets object has tweets to filter through
 * 
 * @param {object|null} tweets (Object of tweets returned by Firebase)
 */
const hasTweetsData = (tweets) => {
  return tweets !== null && Object.keys(tweets).length > 0
}

/**
 * Main schedular method
 * 
 */
const schedular = () => {
  // Creates a new twitter object to perform Twitter methods
  const Twitter = new Twit({
    consumer_key: process.env.TWITTER_consumer_key,
    consumer_secret: process.env.TWITTER_consumer_secret,
    access_token: process.env.TWITTER_access_token,
    access_token_secret: process.env.TWITTER_access_token_secret
  })
  // Gets the Firebase user id
  const uid = process.env.FIREBASE_uid
  // Tweet reference
  const tweetRef = admin.database().ref(`${uid}/tweets`)
  
  // Get all the users tweets
  tweetRef.once('value')
    .then(snap => {
      const tweets = snap.val()

      if (hasTweetsData(tweets)) {
        // Loop through each tweet
        Object.keys(tweets).forEach(key => {
          const tweet = tweets[key]
  
          // If the post is in the past
          if (isPastPost(tweet.date)) {
            // Create a Twitter post with the tweet value
            Twitter.post('statuses/update', { status: tweet.tweet }, function(err, data, response) {
              if (typeof err === 'undefined' || err === null) {
                // delete the tweet from the database
                deletePostFromFirebase(`${uid}/tweets/${key}`)
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

// Run schedular on deploy
schedular()

// Run every 30 minutes
setInterval(schedular, 1800000)
