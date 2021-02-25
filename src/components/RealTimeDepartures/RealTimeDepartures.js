import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const propTypes = {
  selectedRoute: PropTypes.object,
  selectedDirection: PropTypes.object,
  selectedStop: PropTypes.object,
  routes: PropTypes.array.isRequired,
  directions: PropTypes.array.isRequired,
  stops: PropTypes.array.isRequired,
  realTimeDepartures: PropTypes.array.isRequired,
  onRouteChange: PropTypes.func.isRequired,
  onDirectionChange: PropTypes.func.isRequired,
  onStopChange: PropTypes.func.isRequired,
}
const defaultProps = {
  selectedRoute: null,
  selectedDirection: null,
  selectedStop: null,
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

  return (
    <Grid
      container
      // direction="column"
      justify="center"
      alignItems="flex-start"
      spacing={3}
    >
      <Grid item xs={12}>
        <Typography variant="h2">Real Time Departures</Typography>
      </Grid>
      <Grid item xs={12} md={6}>
        <Autocomplete
          id="route"
          options={routes}
          getOptionLabel={(option) => option.label}
          style={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Route" />}
          onChange={handleRouteChange}
          disableClearable
        />
        {selectedRoute && (
          <Autocomplete
            id="direction"
            options={directions}
            getOptionLabel={(option) => option.label}
            // getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Direction" />}
            value={selectedDirection}
            onChange={handleDirectionChange}
            disableClearable
          />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        Table here
      </Grid>
    </Grid>
    
  )
}
RealTimeDepartures.propTypes = propTypes
RealTimeDepartures.defaultProps = defaultProps

export default RealTimeDepartures