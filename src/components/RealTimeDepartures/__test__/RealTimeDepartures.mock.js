const mock = {
  routes: [
    { route_id: "901", agency_id: 0, route_label: "METRO Blue Line" },
    { route_id: "902", agency_id: 0, route_label: "METRO Green Line" },
    { route_id: "906", agency_id: 10, route_label: "Airport Shuttle" },
  ],
  directions: [
    { direction_id: 0, direction_name: "Northbound" },
    { direction_id: 1, direction_name: "Southbound" }
  ],
  stops: [
    { place_code: "MAAM", description: "Mall of America Station" },
    { place_code: "28AV", description: "28th Ave Station" },
    { place_code: "BLCT", description: "Bloomington Central Station" }
  ],
  departures: {
    stops: [
      {
        stop_id: 51405,
        latitude: 44.854277,
        longitude: -93.238877,
        description: "MOA Transit Station"
      }
    ],
    departures: [
      {
        actual: true,
        trip_id: "17809031-DEC20-RAIL-Saturday-01",
        stop_id: 51405,
        departure_text: "Due",
        departure_time: 1614485820,
        description: "to Mpls-Target Field",
        route_id: "901",
        route_short_name: "Blue",
        direction_id: 0,
        direction_text: "NB",
        schedule_relationship: "Scheduled"
      },
      {
        actual: false,
        trip_id: "17809030-DEC20-RAIL-Saturday-01",
        stop_id: 51405,
        departure_text: "10:32",
        departure_time: 1614486720,
        description: "to Mpls-Target Field",
        route_id: "901",
        route_short_name: "Blue",
        direction_id: 0,
        direction_text: "NB",
        schedule_relationship: "Scheduled"
      }
    ]
  }
}

export default mock
