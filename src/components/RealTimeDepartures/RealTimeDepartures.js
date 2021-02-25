import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField';
import Autocomplete from '@material-ui/lab/Autocomplete';

const propTypes = {
  selectedRouteId: PropTypes.string.isRequired,
  selectedDirectionId: PropTypes.number.isRequired,
  selectedPlaceCode: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
  directions: PropTypes.array.isRequired,
  stops: PropTypes.array.isRequired,
  realTimeDepartures: PropTypes.array.isRequired,
  onRouteChange: PropTypes.func.isRequired,
  onDirectionChange: PropTypes.func.isRequired,
  onStopChange: PropTypes.func.isRequired,
}
const RealTimeDepartures = ({
  selectedRouteId,
  selectedDirectionId,
  selectedPlaceCode,
  routes,
  directions,
  stops,
  realTimeDepartures,
  onRouteChange,
  onDirectionChange,
  onStopChange
}) => {
  const handleRouteChange = (event, newValue) => {
    if (selectedDirectionId !== -1) {
      onDirectionChange(-1)
      onStopChange('')
    }
    onRouteChange(newValue?.id)
  }

  const handleDirectionChange = (event, newValue) => {
    if (selectedPlaceCode !== '') {
      onStopChange('')
    }
    onDirectionChange(newValue?.id)
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
        {selectedRouteId !== '' && (
          <Autocomplete
            id="direction"
            options={directions}
            getOptionLabel={(option) => option.label}
            // getOptionSelected={(option, value) => option.id === value.id}
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Direction" />}
            value={directions.find(({ id }) => id === selectedDirectionId) || null}
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
RealTimeDepartures.propTypes = propTypes;

export default RealTimeDepartures