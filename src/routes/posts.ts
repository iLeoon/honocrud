import { Hono } from "hono";
import { database } from "../db/index.js";
import { jwt } from "hono/jwt";

const app = new Hono()
app.use('*', jwt({ secret: 'mysecret', alg: 'HS256', cookie: 'token' }))

function isAdmin(payload: unknown) {
  if (!payload || typeof payload !== 'object') return false
  return (payload as { role?: unknown }).role === 'admin'
}

app.get('/posts', async (c) => {
  const posts = await database.all(`select * from posts order by id desc`)
  return c.json({ posts })
})

app.get('/posts/:id', async (c) => {
  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) {
    return c.json({ message: 'invalid id' }, 400)
  }

  const post = await database.get(`select * from posts where id = ?`, id)
  if (!post) {
    return c.json({ message: 'post not found' }, 404)
  }

  return c.json({ post })
})

app.post('/posts', async (c) => {
  const payload = c.get('jwtPayload')
  if (!isAdmin(payload)) {
    return c.json({ message: 'You are not authorized to create posts.' }, 403)
  }

  const body = await c.req.json()
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const content = typeof body.content === 'string' ? body.content.trim() : ''

  if (!title || !content) {
    return c.json({ message: 'title and content are required' }, 400)
  }

  const result = await database.run(
    `
      INSERT INTO posts (title, content, created_at, updated_at)
      VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
    `,
    title,
    content
  )

  const post = await database.get(`select * from posts where id = ?`, result.lastID)
  return c.json({ message: 'created a new post successfully', post }, 201)
})

app.put('/posts/:id', async (c) => {
  const payload = c.get('jwtPayload')
  if (!isAdmin(payload)) {
    return c.json({ message: 'You are not authorized to update posts.' }, 403)
  }

  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) {
    return c.json({ message: 'invalid id' }, 400)
  }

  const body = await c.req.json()
  const title = typeof body.title === 'string' ? body.title.trim() : ''
  const content = typeof body.content === 'string' ? body.content.trim() : ''

  if (!title || !content) {
    return c.json({ message: 'title and content are required' }, 400)
  }

  const result = await database.run(
    `update posts set title = ?, content = ?, updated_at = CURRENT_TIMESTAMP where id = ?`,
    title,
    content,
    id
  )

  if (!result.changes) {
    return c.json({ message: 'post not found' }, 404)
  }

  const post = await database.get(`select * from posts where id = ?`, id)
  return c.json({ message: 'updated the post successfully', post })
})

app.delete('/posts/:id', async (c) => {
  const payload = c.get('jwtPayload')
  if (!isAdmin(payload)) {
    return c.json({ message: 'You are not authorized to delete posts.' }, 403)
  }

  const id = Number(c.req.param('id'))
  if (Number.isNaN(id)) {
    return c.json({ message: 'invalid id' }, 400)
  }

  const result = await database.run(`delete from posts where id = ?`, id)
  if (!result.changes) {
    return c.json({ message: 'post not found' }, 404)
  }

  return c.json({ message: 'deleted the post successfully' })
})

export default app
