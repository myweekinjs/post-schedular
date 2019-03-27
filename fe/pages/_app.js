import React from 'react'
import App, { Container } from 'next/app'
import Firebase from '../components/firebase'
import Header from '../components/header'

class MyApp extends App {
  state = {
    user: null
  }

  static async getInitialProps({ Component, ctx }) {
    const firebase = new Firebase()
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps.isAuthenticated = await firebase.auth.currentUser

    return { pageProps }
  }

  componentDidMount() {
    const firebase = new Firebase()
    firebase.auth.onAuthStateChanged((user) => {
      if (user) {
        this.props.pageProps.isAuthenticated = user
        this.setState({
          user: user
        })
      }
      else {
        this.setState({
          user: null
        })
      }
    })
  }

  render() {
    const { Component, pageProps } = this.props

    return (
      <Container>
        <Header isAuthenticated={pageProps.isAuthenticated} />
        <Component {...pageProps} />
      </Container>
    )
  }
}

export default MyApp
