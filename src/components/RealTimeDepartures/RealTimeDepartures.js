import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import Typography from '@material-ui/core/Typography'
import Grid from '@material-ui/core/Grid'
import Tabs from '@material-ui/core/Tabs'
import Tab from '@material-ui/core/Tab'
import Paper from '@material-ui/core/Paper'
import TextField from '@material-ui/core/TextField'
import InputAdornment from '@material-ui/core/InputAdornment'
import IconButton from '@material-ui/core/IconButton'
import Autocomplete from '@material-ui/lab/Autocomplete'
import { useTheme } from '@material-ui/core/styles'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { makeStyles } from '@material-ui/core/styles'
import SearchIcon from '@material-ui/icons/Search'
import StopDepartures from './StopDepartures'

const useStyles = makeStyles((theme) => ({
  tabsIndicator: {
    backgroundColor: '#06c',
    height: '3px',
  },
  tabTextColorPrimary: {
    fontSize: '18px',
    textTransform: 'none',
    color: 'rgb(0, 102, 204)',
    '&.Mui-selected': {
      color: 'rgb(0, 102, 204)',
    }
  },
  input: {
    margin: theme.spacing(1, 0.5),
    width: theme.spacing(38),
  },
  messageContainer: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(3),
    width: '100%',
    maxWidth: theme.spacing(114),
    backgroundColor: theme.palette.grey[200],
  }
}))

const propTypes = {
  selectedRoute: PropTypes.object,
  selectedDirection: PropTypes.object,
  selectedStop: PropTypes.object,
  stopIdErrorMessage: PropTypes.string.isRequired,
  routes: PropTypes.array.isRequired,
  directions: PropTypes.array.isRequired,
  stops: PropTypes.array.isRequired,
  realTimeDepartures: PropTypes.object,
  onRouteChange: PropTypes.func.isRequired,
  onDirectionChange: PropTypes.func.isRequired,
  onStopChange: PropTypes.func.isRequired,
  onEnteredStopChange: PropTypes.func.isRequired,
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
  stopIdErrorMessage,
  routes,
  directions,
  stops,
  realTimeDepartures,
  onRouteChange,
  onDirectionChange,
  onStopChange,
  onEnteredStopChange
}) => {
  const classes = useStyles()
  const theme = useTheme()
  const widerThan900 = useMediaQuery(theme.breakpoints.up('md'))
  const [tabIndex, setTabIndex] = useState(0)
  const [enteredStopId, setEnteredStopId] = useState('')
  const enteredStopRef = useRef(null)

  const handleTabChange = (event, newValue) => {
    setTabIndex(newValue)
    if (selectedRoute !== null) {
      handleRouteChange({}, null)
    }
    onEnteredStopChange('')
  }

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

  const handleEnteredStopChange = event => {
    setEnteredStopId(event.target.value.replace(/\D/g, ''))
  }

  const handleEnteredStopSearchClick = event => {
    event.preventDefault()
    onEnteredStopChange(enteredStopRef.current.value)
  }

  const handleEnteredStopKeyDown = event => {
    if (event.key === 'Enter') {
      enteredStopRef.current.blur()
      onEnteredStopChange(enteredStopRef.current.value)
    }
  }

  return (
    <Grid
      container
      direction="column"
      justify="flex-start"
      alignItems="center"
      spacing={5}
    >
      <Grid item>
        <Typography variant="h2" align="center">Real Time Departures</Typography>
      </Grid>
      <Grid item>
        <Tabs
          value={tabIndex}
          onChange={handleTabChange}
          indicatorColor="primary"
          textColor="primary"
          centered
          classes={{
            indicator: classes.tabsIndicator
          }}
        >
          <Tab label="By route" classes={{
            textColorPrimary: classes.tabTextColorPrimary,
          }} />
          <Tab label="By stop #" classes={{
            textColorPrimary: classes.tabTextColorPrimary,
          }} />
        </Tabs>
      </Grid>
      <Grid
        container
        item
        direction={widerThan900 ? 'row' : 'column'}
        justify={widerThan900 ? 'center' : 'flex-start'}
        alignItems={widerThan900 ? 'flex-start' : 'center'}
      >
        {tabIndex === 0 ? (
          <>
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
          </>
        ) : (
            <TextField
              id="entered-stop-id"
              inputRef={enteredStopRef}
              label="Enter stop number"
              value={enteredStopId}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="search by stop number"
                      onClick={handleEnteredStopSearchClick}
                    >
                      <SearchIcon />
                    </IconButton>
                  </InputAdornment>
                )
              }}
              className={classes.input}
              onChange={handleEnteredStopChange}
              onKeyDown={handleEnteredStopKeyDown}
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
        {stopIdErrorMessage && (
          <Paper className={classes.messageContainer}>
            <Typography variant="h5">{stopIdErrorMessage}</Typography>
          </Paper>
        )}
      </Grid>
    </Grid>
    
  )
}
RealTimeDepartures.propTypes = propTypes
RealTimeDepartures.defaultProps = defaultProps

export default RealTimeDepartures