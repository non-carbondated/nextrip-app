import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import TextField from '@material-ui/core/TextField'
import Autocomplete from '@material-ui/lab/Autocomplete'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import Paper from '@material-ui/core/Paper'

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

  console.log({ realTimeDepartures })
  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={5}
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
          renderInput={(params) => <TextField {...params} label="Select route" />}
          onChange={handleRouteChange}
          disableClearable
        />
        {selectedRoute && (
          <Autocomplete
            id="direction"
            options={directions}
            getOptionLabel={(option) => option.label}
            style={{ width: 300 }}
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
            style={{ width: 300 }}
            renderInput={(params) => <TextField {...params} label="Select stop" />}
            value={selectedStop}
            onChange={handleStopChange}
            disableClearable
          />
        )}
      </Grid>
      <Grid item xs={12} md={6}>
        {realTimeDepartures && (
          <>
            <Grid container justify="space-between">
              <Grid item>
                <Typography variant="h4">
                  {realTimeDepartures.stop.description}
                </Typography>
              </Grid>
              <Grid item>
                <Typography variant="h6">
                  {`Stop #: ${realTimeDepartures.stop.id}`}
                </Typography>
              </Grid>
            </Grid>
            <TableContainer component={Paper}>
              <Table aria-label="departures table">
                <TableHead>
                  <TableRow>
                    <TableCell>Route</TableCell>
                    <TableCell>Destination</TableCell>
                    <TableCell align="right">Departs</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {realTimeDepartures.departures.map(({ route, destination, departs, tripId }) => (
                    <TableRow key={tripId}>
                      <TableCell component="th" scope="row">
                        {route}
                      </TableCell>
                      <TableCell>{destination}</TableCell>
                      <TableCell align="right">{departs}</TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                {realTimeDepartures.departures.length === 0 && (
                  <TableFooter>
                    <TableRow>
                      <TableCell>
                        <Typography variant="body1">No departures at this time</Typography>
                      </TableCell>
                    </TableRow>
                  </TableFooter>
                )}
              </Table>
            </TableContainer>
          </>
        )}
      </Grid>
    </Grid>
    
  )
}
RealTimeDepartures.propTypes = propTypes
RealTimeDepartures.defaultProps = defaultProps

export default RealTimeDepartures