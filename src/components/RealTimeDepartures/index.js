import { useState } from 'react'
import { useQuery } from 'react-query'
import { getActiveRoutes, getDirections, getRouteRealTimeDepartures, getStops, getStopRealTimeDepartures } from './RealTimeDepartures.api'
import RealTimeDeparturesUI from './RealTimeDepartures'

const RealTimeDepartures = () => {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [selectedDirection, setSelectedDirection] = useState(null)
  const [selectedStop, setSelectedStop] = useState(null)
  const [enteredStopId, setEnteredStopId] = useState('')
  const [stopIdErrorMessage, setStopIdErrorMessage] = useState('')
  const searchByRoute = enteredStopId === ''

  const routes = useQuery(
    'routes',
    getActiveRoutes,
    {
      enabled: searchByRoute,
      select: data => data.map(({ route_id, route_label }) => ({ id: route_id, label: route_label })),
      initialData: () => []
    }  
  )

  const directions = useQuery(
    ['directions', selectedRoute],
    () => getDirections(selectedRoute.id),
    {
      enabled: !!selectedRoute,
      select: data => data.map(({ direction_id, direction_name}) => ({ id: direction_id, label: direction_name })),
      initialData: () => []
    }
  )

  const stops = useQuery(
    ['stops', selectedRoute, selectedDirection],
    () => getStops(selectedRoute.id, selectedDirection.id),
    {
      enabled: !!selectedRoute && !!selectedDirection,
      select: data => data.map(({ place_code, description}) => ({ id: place_code, label: description })),
      initialData: () => []
    }
  )

  const routeRealTimeDepartures = useQuery(
    ['routeRealTimeDepartures', selectedRoute, selectedDirection, selectedStop],
    () => getRouteRealTimeDepartures(selectedRoute.id, selectedDirection.id, selectedStop.id),
    {
      enabled: !!selectedRoute && !!selectedDirection && !!selectedStop,
      refetchInterval: 30000,
      select: data => data === null ? null : ({
        stop: {
          id: data?.stops[0].stop_id,
          description: data?.stops[0].description
        },
        departures: data?.departures.map(({ actual, departure_text, description, route_short_name, trip_id }) => ({ route: route_short_name, destination: description, departs: departure_text, actual, tripId: trip_id }))
      }),
      initialData: () => null
    }
  )

  const stopRealTimeDepartures = useQuery(
    ['stopRealTimeDepartures', enteredStopId],
    () => getStopRealTimeDepartures(enteredStopId),
    {
      enabled: !!enteredStopId && stopIdErrorMessage === '',
      refetchInterval: 30000,
      retry: false,
      onError: err => {
        let message = err.response.data.details
        if (message !== 'Invalid Stop ID') {
          message = `Sorry, but stop #${enteredStopId} does not exist. Please try another stop number.`
        }
        setStopIdErrorMessage(message)
      },
      select: data => data === null ? null : ({
        stop: {
          id: data?.stops[0].stop_id,
          description: data?.stops[0].description
        },
        departures: data?.departures.map(({ actual, departure_text, description, route_short_name, trip_id }) => ({ route: route_short_name, destination: description, departs: departure_text, actual, tripId: trip_id }))
      }),
      initialData: () => null
    }
  )

  const handleRouteChange = value => setSelectedRoute(value)

  const handleDirectionChange = value => setSelectedDirection(value)

  const handleStopChange = value => setSelectedStop(value)

  const handleEnteredStopChange = value => {
    setStopIdErrorMessage('')
    setEnteredStopId(value)
  }

  return (
    <RealTimeDeparturesUI
      selectedRoute={selectedRoute}
      selectedDirection={selectedDirection}
      selectedStop={selectedStop}
      stopIdErrorMessage={stopIdErrorMessage}
      routes={routes.data}
      directions={directions.data}
      stops={stops.data}
      realTimeDepartures={searchByRoute ? routeRealTimeDepartures.data : stopRealTimeDepartures.data}
      onRouteChange={handleRouteChange}
      onDirectionChange={handleDirectionChange}
      onStopChange={handleStopChange}
      onEnteredStopChange={handleEnteredStopChange}
    />
  )
}

export default RealTimeDepartures
