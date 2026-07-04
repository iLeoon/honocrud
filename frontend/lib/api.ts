import axios from 'axios'

export const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
})

api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status
      if (status === 401 && typeof window !== 'undefined' && !window.location.pathname.startsWith('/login')) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(error)
  }
)

export function isAuthError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 401
}

export function isForbiddenError(error: unknown) {
  return axios.isAxiosError(error) && error.response?.status === 403
}

export function getErrorMessage(error: unknown) {
  if (axios.isAxiosError(error)) {
    const status = error.response?.status
    const data = error.response?.data

    if (status === 401) {
      if (typeof data === 'object' && data && 'message' in data && typeof data.message === 'string') {
        return data.message
      }
      return 'Authentication required. Please login again.'
    }

    if (status === 403) {
      if (typeof data === 'object' && data && 'message' in data && typeof data.message === 'string') {
        return data.message
      }
      return 'You are not authorized to perform this action.'
    }

    if (typeof data === 'string') {
      return data
    }

    return (
      data?.message ||
      data?.error ||
      error.message ||
      'Request failed'
    )
  }

  if (error instanceof Error) {
    return error.message
  }

  return 'Request failed'
}
