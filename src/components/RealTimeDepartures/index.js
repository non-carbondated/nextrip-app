import { useState } from 'react'
import { useQuery } from 'react-query'
import { getActiveRoutes } from './RealTimeDepartures.api'
import RealTimeDeparturesUI from './RealTimeDepartures'

const RealTimeDepartures = () => {
  const [selectedRouteId, setSelectedRouteId] = useState(null)

  const routes = useQuery('routes', getActiveRoutes)

  const handleRouteChange = id => setSelectedRouteId(id)

  return (
    <RealTimeDeparturesUI
      selectedRouteId={selectedRouteId}
      selectedDirectionId={null}
      selectedPlaceCode={null}
      routes={routes.data}
      directions={[]}
      stops={[]}
      realTimeDepartures={[]}
      onRouteChange={handleRouteChange}
      onDirectionChange={() => {}}
      onStopChange={() => {}}
    />
  )
}

export default RealTimeDepartures
