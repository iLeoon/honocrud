import { serve } from '@hono/node-server'
import { Hono } from 'hono'
import { HTTPException } from 'hono/http-exception'
import auth from './routes/auth.js'
import posts from './routes/posts.js'
import cors from './middleware/cors.js'
import { initDatabase } from './db/index.js'

const app = new Hono()

await initDatabase()

//cors middleware
app.use('*', cors)

app.onError((err, c) => {
  console.error(err)

  if (err instanceof HTTPException) {
    if (err.status === 401) {
      return c.json({ message: 'Authentication required. Please login again.' }, 401)
    }

    if (err.status === 403) {
      return c.json({ message: 'You are not authorized to perform this action.' }, 403)
    }

    return c.json({ message: err.message || 'request failed' }, err.status)
  }

  return c.json({ message: 'internal server error' }, 500)
})

app.notFound((c) => {
  return c.json({ message: 'route not found' }, 404)
})

app.route('/api', auth)
app.route('/api', posts)

serve({
  fetch: app.fetch,
  port: 3000
}, (info) => {
  console.log(`Server is running on http://localhost:${info.port}`)
})
