'use client'
import React from 'react'

import Map from './Map'
import { ContentfulLocation } from '@/types'

interface PropsType {
  locations: ContentfulLocation[]
  error?: Error
}

export default function MapPage({ locations, error }: PropsType) {
  if (error) return <p>Error!</p>

  if (locations.length > 0) return <Map locations={locations} />
  return <></>
}
