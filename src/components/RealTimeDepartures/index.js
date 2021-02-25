import { useState } from 'react'
import { useQuery } from 'react-query'
import { getActiveRoutes, getDirections, getRealTimeDepartures, getStops } from './RealTimeDepartures.api'
import RealTimeDeparturesUI from './RealTimeDepartures'

const RealTimeDepartures = () => {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [selectedDirection, setSelectedDirection] = useState(null)
  const [selectedStop, setSelectedStop] = useState(null)

  const routes = useQuery(
    'routes',
    getActiveRoutes,
    {
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

  const realTimeDepartures = useQuery(
    ['realTimeDepartures', selectedRoute, selectedDirection, selectedStop],
    () => getRealTimeDepartures(selectedRoute.id, selectedDirection.id, selectedStop.id),
    {
      enabled: !!selectedRoute && !!selectedDirection && !!selectedStop,
      select: data => data === null ? null : ({
        stop: {
          id: data?.stops[0].stop_id,
          description: data?.stops[0].description
        },
        departures: data?.departures.map(({ departure_time, departure_text, description, route_short_name, trip_id }) => ({ route: route_short_name, destination: description, departs: departure_text, time: departure_time, tripId: trip_id }))
      }),
      initialData: () => null
    }
  )

  const handleRouteChange = value => setSelectedRoute(value)

  const handleDirectionChange = value => setSelectedDirection(value)

  const handleStopChange = value => setSelectedStop(value)

  return (
    <RealTimeDeparturesUI
      selectedRoute={selectedRoute}
      selectedDirection={selectedDirection}
      selectedStop={selectedStop}
      routes={routes.data}
      directions={directions.data}
      stops={stops.data}
      realTimeDepartures={realTimeDepartures.data}
      onRouteChange={handleRouteChange}
      onDirectionChange={handleDirectionChange}
      onStopChange={handleStopChange}
    />
  )
}

export default RealTimeDepartures
