import MapPage from '@/app/map/MapPage'
import getLocations from '@/queries/getLocations'

async function getMapLocations() {
  const { locations, error } = await getLocations()
  return { locations, error }
}

export default async function Map() {
  const { locations, error } = await getMapLocations()
  return <MapPage locations={locations} error={error} />
}
