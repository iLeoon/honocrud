import { cors } from 'hono/cors'

const Cors = cors({
  origin: 'http://localhost:3001',
  allowHeaders: ['Content-Type', 'Authorization', 'Accept', 'X-Custom-Header', 'Upgrade-Insecure-Requests'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  exposeHeaders: ['Content-Length', 'X-Kuma-Revision'],
  maxAge: 600,
  credentials: true,
})

export default Cors
