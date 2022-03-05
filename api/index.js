import axios from 'axios'

const api = axios.create({
  // baseURL: '/api/',
  baseURL: 'http://localhost:3002/api',
})

export const getAllAttributes = async () => await api.get('getAllAttributes')

export const getFilteredImages = async (payload) => {
  return await api.post('getFilteredImages', payload)
}

export const drawNewImage = async (payload) => {
  return await api.post('draw', payload)
}
