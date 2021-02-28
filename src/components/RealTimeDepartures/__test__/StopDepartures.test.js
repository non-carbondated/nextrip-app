import { render, screen } from '@testing-library/react'
import mock from './RealTimeDepartures.mock'
import StopDepartures from '../StopDepartures'

const data = {
  stop: {
    id: mock.departures.stops[0].stop_id,
    description: mock.departures.stops[0].description
  },
  departures: mock.departures.departures.map(({ actual, departure_text, description, route_short_name, trip_id }) => ({ route: route_short_name, destination: description, departs: departure_text, actual, tripId: trip_id }))
}

const testingProps = {
  description: data.stop.description,
  id: data.stop.id,
  departures: data.departures,
}

const renderStopDepartures = props => {
  return render(<StopDepartures {...props} />)
}

describe('StopDepartures', () => {
  test('Renders icon with title attribute when departure time is sent from vehicle', () => {
    renderStopDepartures(testingProps)

    expect(screen.getAllByTitle('Departure time based on current information from the vehicle').length).toBe(1)
  })

  test('Does not render icon with title attribute when departure time is not sent from vehicle', () => {
    renderStopDepartures({
      ...testingProps,
      departures: testingProps.departures.filter(({ actual }) => actual === false)
    })

    expect(screen.queryAllByTitle('Departure time based on current information from the vehicle').length).toBe(0)
  })

  test('Renders a message when there are no depatures to show', () => {
    renderStopDepartures({
      ...testingProps,
      departures: []
    })

    expect(screen.getByText('No departures at this time')).toBeInTheDocument()
  })
})
