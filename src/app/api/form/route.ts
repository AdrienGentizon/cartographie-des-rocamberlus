import { ContributionFormFetchBody, Inputs } from '@/types'
import { NextRequest, NextResponse } from 'next/server'

function encode(inputs: ContributionFormFetchBody) {
  return Object.keys(inputs)
    .map(
      (key) =>
        encodeURIComponent(key) +
        '=' +
        encodeURIComponent(inputs[key as keyof Inputs])
    )
    .join('&')
}

export async function POST(request: NextRequest) {
  try {
    const data = await request.json()
    const res = await fetch('/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
      body: encode({ 'form-name': 'contribution', ...data }),
    })
    return new Response(`${res.status}`)
  } catch (error) {
    throw error
  }
}
