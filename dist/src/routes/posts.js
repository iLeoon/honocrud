import { Hono } from "hono";
import { database } from "../db/index.js";
import { jwt } from "hono/jwt";
const app = new Hono();
app.use('*', jwt({ secret: 'mysecret', alg: 'HS256', cookie: 'token' }));
app.get('posts', async (c) => {
    let payload = c.get('jwtPayload');
    console.log(payload);
    let posts = await database.all(`select * from posts order by id desc`);
    return c.json({ posts });
});
app.get('posts/:id', async (c) => {
    let payload = c.get('jwtPayload');
    console.log(payload);
    const id = c.req.param('id');
    let post = await database.get(`select * from posts where id = ?`, id);
    return c.json({ post });
});
app.post('posts', async (c) => {
    let payload = c.get('jwtPayload');
    console.log(payload);
    const { title, content } = await c.req.json();
    await database.run(`
  INSERT INTO posts (title, content, created_at, updated_at)
  VALUES (?, ?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)
  `, title, content);
    return c.json({ message: 'created a new post successfully' });
});
app.put('posts/:id', async (c) => {
    let payload = c.get('jwtPayload');
    console.log(payload);
    const id = c.req.param('id');
    const { title, content } = await c.req.json();
    await database.run(`update posts set title = ?, content = ?, updated_at = CURRENT_TIMESTAMP where id = ?`, title, content, id);
    return c.json({ message: 'updated the post successfully' });
});
app.delete('posts/:id', async (c) => {
    let payload = c.get('jwtPayload');
    console.log(payload);
    const id = c.req.param('id');
    await database.run(`delete from posts where id = ?`, id);
    console.log(id);
    return c.json({ message: 'deleted the post successfully' });
});
export default app;
