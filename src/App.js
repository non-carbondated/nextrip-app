import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import RealTimeDepartures from './components/RealTimeDepartures'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'

const useStyles = makeStyles((theme) => ({
  navigation: {
    padding: theme.spacing(1),
    backgroundColor: '#ffd200',
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      '& li': {
        display: 'inline-block',
        marginRight: theme.spacing(2),
      }
    }
  }
}));

function About() {
  return <h2>About</h2>;
}

function App() {
  const classes = useStyles()

  return (
    <Router>
      <Grid container>
        <Grid item xs={12}>
          <nav className={classes.navigation}>
            <ul>
              <li>
                <Link to="/"><Button variant="text">Real Time Departures</Button></Link>
              </li>
              <li>
                <Link to="/about"><Button variant="text">About</Button></Link>
              </li>
            </ul>
          </nav>
        </Grid>
        <Grid item xs={12}>
          <Switch>
            <Route path="/about">
              <About />
            </Route>
            <Route path="/">
              <RealTimeDepartures />
            </Route>
          </Switch>
        </Grid>
      </Grid>
    </Router>
  )
}

export default App;
