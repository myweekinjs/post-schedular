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

    pageProps.isAuthenticated = await firebase.doAuthCheck()

    return { pageProps }
  }

  authListener = () => {
    const firebase = new Firebase()

    firebase.auth.onAuthStateChanged((user) => {
      this.props.pageProps.isAuthenticated = user
      this.setState({
        user: user
      })
    })
  }

  componentDidMount() {
    this.authListener()
  }

  componentWillUnmount() {
    this.authListener = undefined
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
