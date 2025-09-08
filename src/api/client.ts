import axios from 'axios'

export const api = axios.create({
  baseURL: 'https://66b1f8e71ca8ad33d4f5f63e.mockapi.io',
  timeout: 10000,
})

export type Camper = {
  id: string
  name: string
  price: number
  location: string
  description?: string
  gallery?: string[]
  rating?: number
  reviews?: Array<{ id: string; author: string; rating: number; comment: string; date?: string }>
  // ...extend as backend fields become known
}

export async function fetchCampers(params?: Record<string, string | number | boolean>) {
  const res = await api.get('/campers', { params })
  return res.data as Camper[]
}

export async function fetchCamperById(id: string) {
  const res = await api.get(`/campers/${id}`)
  return res.data as Camper
}

