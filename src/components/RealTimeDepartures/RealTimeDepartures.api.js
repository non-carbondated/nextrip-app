import axios from 'axios'

const baseRoute = 'https://svc.metrotransit.org'
const activeRoutesRoute = `${baseRoute}/nextripv2/routes`
const directionsRoute = (routeId) => `${baseRoute}/nextripv2/directions/${routeId}`
const timepointStopsRoute = (routeId, directionId) => `${baseRoute}/nextripv2/stops/${routeId}/${directionId}`
const routeRealTimeDeparturesRoute = (routeId, directionId, placeCode) => `${baseRoute}/nextripv2/${routeId}/${directionId}/${placeCode}`
const stopRealTimeDeparturesRoute = stopId => `${baseRoute}/nextripv2/${stopId}`

export const getActiveRoutes = async () => {
  const response = await axios.get(activeRoutesRoute)
  return response.data
}

export const getDirections = async (routeId) => {
  const response = await axios.get(directionsRoute(routeId))
  return response.data
}

export const getStops = async (routeId, directionId) => {
  const response = await axios.get(timepointStopsRoute(routeId, directionId))
  return response.data
}

export const getRouteRealTimeDepartures = async (routeId, directionId, placeCode) => {
  const response = await axios.get(routeRealTimeDeparturesRoute(routeId, directionId, placeCode))
  return response.data
}

export const getStopRealTimeDepartures = async stopId => {
  const response = await axios.get(stopRealTimeDeparturesRoute(stopId))
  return response.data
}
