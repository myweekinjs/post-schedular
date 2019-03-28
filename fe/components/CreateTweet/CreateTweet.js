import React from 'react'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Firebase from '../firebase'

class CreateTweet extends React.Component {

  state = {
    tweet: '',
    date: ''
  }

  componentDidMount() {
    this.setState({
      date: this.defaultDateValue()
    })
  }

  defaultDateValue = () => {
    let now = new Date();
    let year = now.getFullYear();
    let month = now.getMonth() + 1;
    let day = now.getDate();
    let hour = now.getHours();
    let minute = now.getMinutes();
    let localDatetime = year + "-" +
                      (month < 10 ? "0" + month.toString() : month) + "-" +
                      (day < 10 ? "0" + day.toString() : day) + "T" +
                      (hour < 10 ? "0" + hour.toString() : hour) + ":" +
                      (minute < 10 ? "0" + minute.toString() : minute)

    return localDatetime
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
    const { tweet, date } = this.state
    
    if (tweet === '' || date === '') {
      alert('Please fill in all data')
      return false
    }

    firebase.scheduleTweet(user.uid).push({
      tweet: this.state.tweet,
      date: +new Date(this.state.date)
    })
    .then(snap => {
      this.setState({
        tweet: '',
        date: this.defaultDateValue()
      })
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
          <Form.Control type="datetime-local" name="date" id="date" defaultValue={this.state.date} onChange={(e) => this.onChange(e)} />
        </Form.Group>
  
        <Button type="submit">Schedule Tweet</Button>
      </Form>
    )
  }
}

export default CreateTweet
