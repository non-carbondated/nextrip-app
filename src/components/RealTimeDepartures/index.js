import { useState } from 'react'
import { useQuery } from 'react-query'
import { getActiveRoutes, getDirections } from './RealTimeDepartures.api'
import RealTimeDeparturesUI from './RealTimeDepartures'

const RealTimeDepartures = () => {
  const [selectedRoute, setSelectedRoute] = useState(null)
  const [selectedDirection, setSelectedDirection] = useState(null)

  const routes = useQuery(
    'routes',
    getActiveRoutes,
    {
      select: data => data.map(({ route_id, route_label }) => ({ id: route_id, label: route_label }))
    }  
  )

  const directions = useQuery(
    ['directions', selectedRoute],
    () => getDirections(selectedRoute.id),
    {
      enabled: selectedRoute !== null,
      select: data => data.map(({ direction_id, direction_name}) => ({ id: direction_id, label: direction_name }))
    }
  )

  const handleRouteChange = id => setSelectedRoute(id)

  const handleDirectionChange = id => setSelectedDirection(id)

  return (
    <RealTimeDeparturesUI
      selectedRoute={selectedRoute}
      selectedDirection={selectedDirection}
      selectedStop={null}
      routes={routes.data || []}
      directions={directions.data || []}
      stops={[]}
      realTimeDepartures={[]}
      onRouteChange={handleRouteChange}
      onDirectionChange={handleDirectionChange}
      onStopChange={() => {}}
    />
  )
}

export default RealTimeDepartures
