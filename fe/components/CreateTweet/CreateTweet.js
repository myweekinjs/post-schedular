import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Firebase from '../firebase'

class CreateTweet extends React.Component {

  state = {
    tweet: '',
    date: Date.now()
  }

  onChange = event => {
    this.setState({
      [event.target.name]: event.target.value
    })  
  }

  onSubmit = (e) => {
    e.preventDefault()
    const firebase = new Firebase()
    const user = firebase.doAuthCheck()

    firebase.scheduleTweet(user.uid).push({
      tweet: this.state.tweet,
      date: this.state.date
    })
    .then(snap => {
      console.log(snap)
    })
    .catch(e => {
      console.error(e)
    })
  }

  render() {
    return (
      <Form noValidate autoComplete="off" onSubmit={(e) => this.onSubmit(e)}>
        <Form.Group>
          <Form.Label>Tweet</Form.Label>
          <Form.Control as="textarea" rows="3" placeholder="Your Tweet" name="tweet" onChange={(e) => this.onChange(e)} value={this.state.tweet} />
        </Form.Group>
  
        <Form.Group>
          <Form.Label>Date and Time</Form.Label>
          <Form.Control type="datetime" name="date" id="date" value={this.state.date} onChange={(e) => this.onChnage(e)} />
        </Form.Group>
  
        <Button type="submit">Schedule Tweet</Button>
      </Form>
    )
  }
}

export default CreateTweet
