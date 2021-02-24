import axios from 'axios'

const baseRoute = 'https://svc.metrotransit.org'
const activeRoutesRoute = `${baseRoute}/nextripv2/routes`
const directionsRoute = (routeId) => `${baseRoute}/nextripv2/directions/${routeId}`
const timepointStopsRoute = (routeId, directionId) => `${baseRoute}/nextripv2/stops/${routeId}/${directionId}`
const realTimeDeparturesRoute = (routeId, directionId, placeCode) => `${baseRoute}/nextripv2/${routeId}/${directionId}/${placeCode}`

export const getActiveRoutes = async () => {
  try {
    const { data } = await axios.get(activeRoutesRoute)
    return data
  } catch (error) {
    console.error(error);
  }
}

export const getDirections = async (routeId) => {
  try {
    const { data } = await axios.get(directionsRoute(routeId))
    return data
  } catch (error) {
    console.error(error);
  }
}

export const getStops = async (routeId, directionId) => {
  try {
    const { data } = await axios.get(timepointStopsRoute(routeId, directionId))
    return data
  } catch (error) {
    console.error(error);
  }
}

export const getRealTimeDepartures = async (routeId, directionId, placeCode) => {
  try {
    const { data } = await axios.get(realTimeDeparturesRoute(routeId, directionId, placeCode))
    return data
  } catch (error) {
    console.error(error);
  }
}