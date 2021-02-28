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
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import DepartureBoardIcon from '@material-ui/icons/DepartureBoard'

const useStyles = makeStyles((theme) => ({
  stopDeparturesContainer: {
    width: '100%',
    maxWidth: theme.spacing(114),
  },
  tableCellHead: {
    backgroundColor: theme.palette.secondary.main,
    textTransform: 'uppercase',
  },
  actual: {
    color: theme.palette.primary.main,
    fontWeight: '700'
  },
  message: {
    padding: theme.spacing(2),
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
        <Grid item style={{ marginRight: '8px' }}>
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
              <TableCell width={104} className={classes.tableCellHead}>Route</TableCell>
              <TableCell className={classes.tableCellHead}>Destination</TableCell>
              <TableCell width={104} className={classes.tableCellHead} align="right">Departs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {departures.map(({ route, destination, departs, actual, tripId }) => (
              <TableRow key={tripId}>
                <TableCell component="th" scope="row" style={{ fontWeight: 700 }}>
                  {route}
                </TableCell>
                <TableCell>{destination}</TableCell>
                <TableCell align="right" className={actual ? classes.actual : null} style={{ fontWeight: 700 }}>{actual ? <DepartureBoardIcon titleAccess="Departure time based on current information from the vehicle" /> : null}{departs}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
        {departures.length === 0 && (
          <Typography variant="body1" className={classes.message}>No departures at this time</Typography>
        )}
      </TableContainer>
    </div>
  )
}
StopDepartures.propTypes = propTypes

export default StopDepartures