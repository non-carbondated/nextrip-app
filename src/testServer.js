import { rest } from 'msw'
import { setupServer } from 'msw/node'
import mockData from './components/RealTimeDepartures/__test__/RealTimeDepartures.mock'

const server = setupServer(
  rest.get('https://svc.metrotransit.org/nextripv2/routes', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.routes))
  }),
  rest.get('https://svc.metrotransit.org/nextripv2/directions/:routeId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.directions))
  }),
  rest.get('https://svc.metrotransit.org/nextripv2/stops/:routeId/:directionId', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.stops))
  }),
  rest.get('https://svc.metrotransit.org/nextripv2/:routeId/:directionId/:placeCode', (req, res, ctx) => {
    return res(ctx.status(200), ctx.json(mockData.departures))
  }),
  rest.get('https://svc.metrotransit.org/nextripv2/:stopId', (req, res, ctx) => {
    const { stopId } = req.params
    return stopId === '51405' ? res(ctx.status(200), ctx.json(mockData.departures)) : res(ctx.status(400), ctx.json({
      detail: 'Invalid Stop ID',
      instance: `/api/${stopId}`,
      status: 400,
      title: 'Bad Request',
      type: 'https://tools.ietf.org/html/rfc7231#section-6.5.1'
    }))
  }),
  rest.get('*', (req, res, ctx) => {
    console.error(`Please add request handler for ${req.url.toString()}`)
    return res(
      ctx.status(500),
      ctx.json({ error: 'Please add request handler' })
    )
  })
)

beforeAll(() => server.listen())
afterAll(() => server.close())
afterEach(() => server.resetHandlers())

export {server, rest}
