import React from 'react'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'

const RealTimeDepartures = () => {
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
    >
      <Grid item xs={12}>
        <Typography variant="h2">Real Time Departures</Typography>
      </Grid>
    </Grid>
    
  )
}

export default RealTimeDepartures