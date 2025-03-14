const BASE_URL = "https://environment.data.gov.uk/flood-monitoring"
export const STATIONS_API = `${BASE_URL}/id/stations`;
export const READINGS_API = `${BASE_URL}/id/stations/{stationId}/readings`;

export const readingsDisplayType = {
    graph: 'GRAPH',
    table: 'TABLE'
}