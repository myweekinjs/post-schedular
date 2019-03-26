import Layout from '../components/layout'
import SignInWithGoogle from '../components/SignInWithGoogle'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const Home = () => {
  return (
    <Layout>
      <Grid
        alignItems='center'
        justify='center'
        container={true}
        direction='column'
      >
        <Typography variant="h2" gutterBottom>Welcome to Schedular</Typography>
        <SignInWithGoogle />
      </Grid>
    </Layout>
  )
}

export default Home
