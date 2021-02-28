import React from 'react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { findByLabelText, render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { server, rest } from '../../../testServer'
import RealTimeDepartures from '../index'

const queryClient = new QueryClient()

const renderRealTimeDepartures = () => {
  return render(<QueryClientProvider client={queryClient}><RealTimeDepartures /></QueryClientProvider>)
}

describe('RealTimeDepartures', () => {
  describe('Form tabs', () => {
    test('Switching between By route and By stop # clears their respective inputs', async () => {
      renderRealTimeDepartures()
  
      // select a route
      let routeDropdown = await screen.findByLabelText(/Select route/)
      userEvent.click(routeDropdown)
      const routeOption = await screen.findByText(/METRO Blue Line/)
      userEvent.click(routeOption)
  
      // switch tabs
      const byStopTab = screen.getByRole('tab', { name: 'By stop #' })
      userEvent.click(byStopTab)
  
      const stopField = await screen.findByLabelText(/Enter stop number/)
  
      expect(routeDropdown).not.toBeInTheDocument()
      expect(stopField).toBeInTheDocument()
      expect(stopField.value).toBe('')
  
      userEvent.type(stopField, '42')
  
      // switch tabs back
      const byRouteTab = screen.getByRole('tab', { name: 'By route' })
      userEvent.click(byRouteTab)
      routeDropdown = await screen.findByLabelText(/Select route/)
  
      expect(stopField).not.toBeInTheDocument()
      expect(routeDropdown).toBeInTheDocument()
      expect(routeDropdown.value).toBe('')
    })
  
    test('Clicking on your current tab does not reset inputs', async () => {
      renderRealTimeDepartures()
  
      // select a route
      let routeDropdown = await screen.findByLabelText(/Select route/)
      userEvent.click(routeDropdown)
      const routeOption = await screen.findByText(/METRO Blue Line/)
      userEvent.click(routeOption)
  
      const byRouteTab = screen.getByRole('tab', { name: 'By route' })
      const byStopTab = screen.getByRole('tab', { name: 'By stop #' })
      userEvent.click(byRouteTab)
  
      expect(routeDropdown.value).toBe('METRO Blue Line')
  
      userEvent.click(byStopTab)
  
      const stopField = await screen.findByLabelText(/Enter stop number/)
      userEvent.type(stopField, '42')
      userEvent.click(byStopTab)
  
      expect(stopField.value).toBe('42')
    })
  })

  describe('Searching by route', () => {
    test('Progressively renders the routes, directions and stops autocompletes as the prior selections determine the following options', async () => {
      renderRealTimeDepartures()
  
      const routeDropdown = await screen.findByLabelText('Select route')
  
      // route autocomplete renders by default
      expect(routeDropdown).toBeInTheDocument()
  
      userEvent.click(routeDropdown)
      const routeOption = await screen.findByText(/METRO Blue Line/)
  
      expect(routeOption).toBeInTheDocument()
  
      userEvent.click(routeOption)
  
      // directions autocomplete renders by when a route is selected
      const directionsDropdown = await screen.findByLabelText('Select direction')
  
      expect(directionsDropdown).toBeInTheDocument()
  
      userEvent.click(directionsDropdown)
      const directionsOption = await screen.findByText(/Northbound/)
  
      expect(directionsOption).toBeInTheDocument()
  
      userEvent.click(directionsOption)
  
      // stops autocomplete renders by when a direction is selected
      const stopsDropdown = await screen.findByLabelText('Select stop')
  
      expect(stopsDropdown).toBeInTheDocument()
  
      userEvent.click(stopsDropdown)
      const stopsOption = await screen.findByText(/Mall of America Station/)
  
      expect(stopsOption).toBeInTheDocument()
    })
  
    test('Resets the stops autocomplete when the direction option is changed', async () => {
      renderRealTimeDepartures()
  
      // select an option route, direction and stop
      const routeDropdown = await screen.findByLabelText('Select route')
      userEvent.click(routeDropdown)
      const routeOption = await screen.findByText(/METRO Blue Line/)
      userEvent.click(routeOption)
      const directionsDropdown = await screen.findByLabelText('Select direction')
      userEvent.click(directionsDropdown)
      const directionsOption = await screen.findByText(/Northbound/)
      userEvent.click(directionsOption)
      const stopsDropdown = await screen.findByLabelText('Select stop')
      userEvent.click(stopsDropdown)
      const stopsOption = await screen.findByText(/Mall of America Station/)
      userEvent.click(stopsOption)
  
      expect(stopsDropdown.value).toBe('Mall of America Station')
  
      // change the direction value
      userEvent.click(directionsDropdown)
      const newDirectionsOption = await screen.findByText(/Southbound/)
      userEvent.click(newDirectionsOption)
  
      expect(stopsDropdown.value).toBe('')
    })
  
    test('Resets the directions autocomplete and removes the stops autocomplete when the route option is changed', async () => {
      renderRealTimeDepartures()
  
      // select an option route, direction and stop
      const routeDropdown = await screen.findByLabelText('Select route')
      userEvent.click(routeDropdown)
      const routeOption = await screen.findByText(/METRO Blue Line/)
      userEvent.click(routeOption)
      const directionsDropdown = await screen.findByLabelText('Select direction')
      userEvent.click(directionsDropdown)
      const directionsOption = await screen.findByText(/Northbound/)
      userEvent.click(directionsOption)
      const stopsDropdown = await screen.findByLabelText('Select stop')
      userEvent.click(stopsDropdown)
      const stopsOption = await screen.findByText(/Mall of America Station/)
      userEvent.click(stopsOption)
  
      expect(directionsDropdown.value).toBe('Northbound')
  
      // change the route value
      userEvent.click(routeDropdown)
      const newRouteOption = await screen.findByText(/METRO Green Line/)
      userEvent.click(newRouteOption)
  
      expect(directionsDropdown.value).toBe('')
      expect(stopsDropdown).not.toBeInTheDocument()
    })

    test('Renders the departures table only when a route, direction and stop have been selected', async () => {
      renderRealTimeDepartures()

      const departuresStopId = () => screen.queryByRole('heading', { name: 'Stop #: 51405' })

      expect(departuresStopId()).not.toBeInTheDocument()

      // select an option route, direction and stop
      const routeDropdown = await screen.findByLabelText('Select route')
      userEvent.click(routeDropdown)
      const routeOption = await screen.findByText(/METRO Blue Line/)
      userEvent.click(routeOption)
      const directionsDropdown = await screen.findByLabelText('Select direction')

      expect(departuresStopId()).not.toBeInTheDocument()

      userEvent.click(directionsDropdown)
      const directionsOption = await screen.findByText(/Northbound/)
      userEvent.click(directionsOption)
      const stopsDropdown = await screen.findByLabelText('Select stop')

      expect(departuresStopId()).not.toBeInTheDocument()

      userEvent.click(stopsDropdown)
      const stopsOption = await screen.findByText(/Mall of America Station/)
      userEvent.click(stopsOption)

      expect(departuresStopId()).toBeInTheDocument()
    })
  })

  describe('Searching by stop number', () => {
    test('Stop number field only accepts numeric characters', async () => {
      renderRealTimeDepartures()
       
      // switch to By stop # tab
      const byStopTab = screen.getByRole('tab', { name: 'By stop #' })
      userEvent.click(byStopTab)

      const stopField = await screen.findByLabelText(/Enter stop number/)
      userEvent.type(stopField, 'a')

      expect(stopField.value).toBe('')

      userEvent.type(stopField, '#')

      expect(stopField.value).toBe('')

      userEvent.type(stopField, '42')

      expect(stopField.value).toBe('42')

      userEvent.type(stopField, '1Ij2*3$_4')

      expect(stopField.value).toBe('421234')
    })

    test('Renders the departures table when a valid stop number is submitted via clicking the search button', async () => {
      renderRealTimeDepartures()

      // switch to By stop # tab
      const byStopTab = screen.getByRole('tab', { name: 'By stop #' })
      userEvent.click(byStopTab)

      const departuresStopId = () => screen.queryByRole('heading', { name: 'Stop #: 51405' })

      expect(departuresStopId()).not.toBeInTheDocument()

      // submit a valid stop id
      const stopField = await screen.findByLabelText(/Enter stop number/)
      const searchButton = screen.getByRole('button', { name: 'Search' })
    
      userEvent.type(stopField, '51405')
      userEvent.click(searchButton)

      expect(await screen.findByRole('heading', { name: 'Stop #: 51405' })).toBeInTheDocument()
    })

    test('Renders the departures table when a valid stop number is submitted via enter keypress', async () => {
      renderRealTimeDepartures()

      // switch to By stop # tab
      const byStopTab = screen.getByRole('tab', { name: 'By stop #' })
      userEvent.click(byStopTab)

      const departuresStopId = () => screen.queryByRole('heading', { name: 'Stop #: 51405' })

      expect(departuresStopId()).not.toBeInTheDocument()

      // submit a valid stop id
      const stopField = await screen.findByLabelText(/Enter stop number/)
    
      userEvent.type(stopField, '51405{enter}')

      expect(await screen.findByRole('heading', { name: 'Stop #: 51405' })).toBeInTheDocument()
    })

    test('Renders message (and no departures table) when the submitted stop id does not exist', async () => {
      renderRealTimeDepartures()

      // switch to By stop # tab
      const byStopTab = screen.getByRole('tab', { name: 'By stop #' })
      userEvent.click(byStopTab)

      const departuresStopId = () => screen.queryByRole('heading', { name: 'Stop #: 51405' })

      expect(departuresStopId()).not.toBeInTheDocument()

      // submit a valid stop id
      const stopField = await screen.findByLabelText(/Enter stop number/)
    
      userEvent.type(stopField, '5140{enter}')

      const message = await screen.findByText('Sorry, but stop #5140 does not exist. Please try another stop number.')

      expect(departuresStopId()).not.toBeInTheDocument()
      expect(message).toBeInTheDocument()
    })
  })
})
