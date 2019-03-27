import React from 'react'
import Container from 'react-bootstrap/Container';
import Head from 'next/head'

const Layout = ({ children }) => (
  <>
    <Head>
      <style>{`
        body {
          margin: 0;
        }
      `}</style>
      <link
        rel="stylesheet"
        href="https://maxcdn.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
        integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T"
        crossOrigin="anonymous"
      />
    </Head>
    <Container
      style={{
        padding: '5rem 0'
      }}
    >
      { children }
    </Container>
  </>
)

export default Layout
