import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles(theme => ({
  container: {
    width: '100%',
    maxWidth: theme.spacing(114),
  }
}))

const About = () => {
  const classes = useStyles()

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Typography variant="h2" align="center">About this project</Typography>
        <Typography variant="h3" gutterBottom>Purpose</Typography>
        <Typography variant="body1">
          The purpose of this project is to use the Twin Cities  Metro Transit <a href="https://svc.metrotransit.org/swagger/index.html" target="_blank" rel="noreferrer">NexTrip API</a> to create a web application that provides the following functionality:
        </Typography>
        <Typography variant="h6">Displaying real time departures by route</Typography>
        <ul>
          <li>Selecting a route from a list of active routes</li>
          <li>Selecting a direction from a list of directions for the selected route</li>
          <li>Selecting a stop from a list of available stops for the selected route and direction</li>
          <li>Refresh the departure data every 30 seconds</li>
        </ul>
        <Typography variant="h6">Displaying real time departures by stop number</Typography>
        <ul>
          <li>Alert the user when an entered stop number doesn't exist</li>
          <li>Refresh the departure data every 30 seconds</li>
        </ul>
      </Grid>
    </Grid>
  )
}

export default About
