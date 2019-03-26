import React from 'react'
import App, { Container } from 'next/app'
import firebase from '../components/firebase'
import Header from '../components/header'

class MyApp extends App {
  static async getInitialProps({ Component, ctx }) {
    let pageProps = {}

    if (Component.getInitialProps) {
      pageProps = await Component.getInitialProps(ctx)
    }

    pageProps.isAuthenticated = await firebase.auth().currentUser

    return { pageProps }
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
