import React from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableFooter from '@material-ui/core/TableFooter'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'

import DepartureBoardIcon from '@material-ui/icons/DepartureBoard'

const useStyles = makeStyles((theme) => ({
  stopDeparturesContainer: {
    width: '100%',
    maxWidth: theme.spacing(114), // 904px
  },
  tableCellHead: {
    backgroundColor: '#ffd201',
    textTransform: 'uppercase',
  },
  actual: {
    color: '#06c',
    fontWeight: '700'
  }
}))

const propTypes = {
  description: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  departures: PropTypes.array.isRequired,
}
const StopDepartures = ({
  description,
  id,
  departures,
}) => {
  const classes = useStyles()

  return (
    <div className={classes.stopDeparturesContainer}>
      <Grid
        container
        justify="space-between"
        alignItems="flex-end"  
      >
        <Grid item>
          <Typography variant="h4">
            {description}
          </Typography>
        </Grid>
        <Grid item>
          <Typography variant="h6">
            {`Stop #: ${id}`}
          </Typography>
        </Grid>
      </Grid>
      <TableContainer component={Paper}>
        <Table aria-label="departures table">
          <TableHead>
            <TableRow>
              <TableCell className={classes.tableCellHead}>Route</TableCell>
              <TableCell className={classes.tableCellHead}>Destination</TableCell>
              <TableCell className={classes.tableCellHead} align="right">Departs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departures.map(({ route, destination, departs, actual, tripId }) => (
              <TableRow key={tripId}>
                <TableCell component="th" scope="row">
                  {route}
                </TableCell>
                <TableCell>{destination}</TableCell>
                <TableCell align="right" className={actual ? classes.actual : null}>{actual ? <DepartureBoardIcon titleAccess="Departure time based on current information from the vehicle" /> : null}{departs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
          {departures.length === 0 && (
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
    </div>
  )
}
StopDepartures.propTypes = propTypes

export default StopDepartures