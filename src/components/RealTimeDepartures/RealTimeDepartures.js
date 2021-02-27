import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import StopDepartures from './StopDepartures'

const useStyles = makeStyles((theme) => ({
  input: {
    padding: theme.spacing(1, 0.5),
    width: theme.spacing(38),
  }
}))

const propTypes = {
  selectedRoute: PropTypes.object,
  selectedDirection: PropTypes.object,
  selectedStop: PropTypes.object,
  routes: PropTypes.array.isRequired,
  directions: PropTypes.array.isRequired,
  stops: PropTypes.array.isRequired,
  realTimeDepartures: PropTypes.object,
  onRouteChange: PropTypes.func.isRequired,
  onDirectionChange: PropTypes.func.isRequired,
  onStopChange: PropTypes.func.isRequired,
}
const defaultProps = {
  selectedRoute: null,
  selectedDirection: null,
  selectedStop: null,
  realTimeDepartures: null,
}
const RealTimeDepartures = ({
  selectedRoute,
  selectedDirection,
  selectedStop,
  routes,
  directions,
  stops,
  realTimeDepartures,
  onRouteChange,
  onDirectionChange,
  onStopChange
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const widerThan900 = useMediaQuery(theme.breakpoints.up('md'))

  const handleRouteChange = (event, newValue) => {
    if (selectedDirection !== null) {
      onDirectionChange(null)
      onStopChange(null)
    }
    onRouteChange(newValue)
  }

  const handleDirectionChange = (event, newValue) => {
    if (selectedStop !== null) {
      onStopChange(null)
    }
    onDirectionChange(newValue)
  }

  const handleStopChange = (event, newValue) => {
    onStopChange(newValue)
  }

  console.log({ realTimeDepartures, widerThan900 })
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Typography variant="h2">Real Time Departures</Typography>
      </Grid>
      <Grid
        container
        item
        direction={widerThan900 ? 'row' : 'column'}
        justify={widerThan900 ? 'center' : 'flex-start'}
        alignItems={widerThan900 ? 'flex-start' : 'center'}
      >
        <Autocomplete
          id="route"
          options={routes}
          getOptionLabel={(option) => option.label}
          className={classes.input}
          renderInput={(params) => <TextField {...params} label="Select route" />}
          onChange={handleRouteChange}
          disableClearable
        />
        {selectedRoute && (
          <Autocomplete
            id="direction"
            options={directions}
            getOptionLabel={(option) => option.label}
            className={classes.input}
            renderInput={(params) => <TextField {...params} label="Select direction" />}
            value={selectedDirection}
            onChange={handleDirectionChange}
            disableClearable
          />
        )}
        {selectedDirection && (
          <Autocomplete
            id="stop"
            options={stops}
            getOptionLabel={(option) => option.label}
            className={classes.input}
            renderInput={(params) => <TextField {...params} label="Select stop" />}
            value={selectedStop}
            onChange={handleStopChange}
            disableClearable
          />
        )}
      </Grid>
      <Grid container item justify="center">
        {realTimeDepartures && (
          <StopDepartures
            description={realTimeDepartures.stop.description}
            id={realTimeDepartures.stop.id}
            departures={realTimeDepartures.departures}
          />
        )}
      </Grid>
    </Grid>
    
  )
}
RealTimeDepartures.propTypes = propTypes
RealTimeDepartures.defaultProps = defaultProps

export default RealTimeDepartures