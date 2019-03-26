import React from 'react'
import Grid from '@material-ui/core/Grid';
import Head from 'next/head'

const Layout = ({ children }) => (
  <>
    <Head>
      <style>{`
        body {
          margin: 0;
        }
      `}</style>
    </Head>
    <Grid
      style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '5rem 0'
      }}
    >
      { children }
    </Grid>
  </>
)

export default Layout
