import React from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import { QueryClient, QueryClientProvider } from 'react-query'
import { createMuiTheme, ThemeProvider, makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
import Button from '@material-ui/core/Button'
import RealTimeDepartures from './components/RealTimeDepartures'
import About from './components/About'

const queryClient = new QueryClient()

const customTheme = createMuiTheme({
  palette: {
    primary: {
      main: '#06c',
    },
    secondary: {
      main: '#ffd201',
    },
  },
  overrides: {
    MuiTabs: {
      indicator: {
        backgroundColor: '#06c',
        height: '3px',
      },
    },
    MuiTab: {
      textColorPrimary: {
        fontSize: '18px',
        textTransform: 'none',
        color: 'rgb(0, 102, 204)',
        '&.Mui-selected': {
          color: 'rgb(0, 102, 204)',
        }
      }
    }
  }
})

const useStyles = makeStyles(theme => ({
  navigation: {
    padding: theme.spacing(1),
    backgroundColor: customTheme.palette.secondary.main,
    '& ul': {
      margin: 0,
      padding: 0,
      listStyle: 'none',
      '& li': {
        display: 'inline-block',
        marginRight: theme.spacing(2),
      }
    }
  },
  body: {
    margin: theme.spacing(2)
  }
}));

const ButtonLink = React.forwardRef((props, ref) => {
  const { navigate, ...otherProps } = props
  return (
    <Button variant="text" ref={ref} {...otherProps}>{props.children}</Button>
  )
})

function App() {
  const classes = useStyles()
    
  return (
    <QueryClientProvider client={queryClient}>
      <Router>
        <ThemeProvider theme={customTheme}>
          <Grid container direction="column" spacing={2}>
            <Grid item>
              <nav className={classes.navigation}>
                <ul>
                  <li>
                    <Link to="/" component={ButtonLink}>Real time departures</Link>
                  </li>
                  <li>
                    <Link to="/about" component={ButtonLink}>About</Link>
                  </li>
                </ul>
              </nav>
            </Grid>
            <Grid item className={classes.body}>
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
        </ThemeProvider>
      </Router>
    </QueryClientProvider>
  )
}

export default App;
