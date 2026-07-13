type JwtPayload = {
  exp?: number
}

function decodeJwtPayload(token: string): JwtPayload | null {
  const parts = token.split('.')

  if (parts.length !== 3) {
    return null
  }

  try {
    const base64 = parts[1].replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64.padEnd(Math.ceil(base64.length / 4) * 4, '=')
    const decoded = atob(padded)

    return JSON.parse(decoded) as JwtPayload
  } catch {
    return null
  }
}

export function hasValidToken(token?: string) {
  if (!token) {
    return false
  }

  const payload = decodeJwtPayload(token)

  if (!payload) {
    return false
  }

  if (typeof payload.exp !== 'number') {
    return true
  }

  return payload.exp * 1000 > Date.now()
}
