import Grid from '@material-ui/core/Grid'
import Typography from '@material-ui/core/Typography'

const About = () => {
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

        <Typography variant="h3" gutterBottom>Packages used</Typography>
        <ul>
          <li>react: framework for creating the app</li>
          <li>react-router-dom: for routing</li>
          <li>axios: for REST requests</li>
          <li>react-query: for data retrieval</li>
          <li>prop-types: for type checking</li>
          <li>@material-ui/core: for component library</li>
          <li>@material-ui/icons: for icons</li>
          <li>@material-ui/lab: for autocomplete</li>
          <li>@testing-library/react: for testing components</li>
          <li>msw: for mocking REST request responses</li>
        </ul>
      </Grid>
    </Grid>
  )
}

export default About
