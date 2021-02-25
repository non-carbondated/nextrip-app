import { useState } from 'react'
import { useQuery } from 'react-query'
import { getActiveRoutes, getDirections } from './RealTimeDepartures.api'
import RealTimeDeparturesUI from './RealTimeDepartures'

const RealTimeDepartures = () => {
  const [selectedRouteId, setSelectedRouteId] = useState('')
  const [selectedDirectionId, setSelectedDirectionId] = useState(-1)

  const routes = useQuery(
    'routes',
    getActiveRoutes,
    {
      select: data => data.map(({ route_id, route_label }) => ({ id: route_id, label: route_label }))
    }  
  )

  const directions = useQuery(
    ['directions', selectedRouteId],
    () => getDirections(selectedRouteId),
    {
      enabled: selectedRouteId !== '',
      select: data => data.map(({ direction_id, direction_name}) => ({ id: direction_id, label: direction_name }))
    }
  )

  const handleRouteChange = id => setSelectedRouteId(id)

  const handleDirectionChange = id => setSelectedDirectionId(id)

  return (
    <RealTimeDeparturesUI
      selectedRouteId={selectedRouteId}
      selectedDirectionId={selectedDirectionId}
      selectedPlaceCode={''}
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
