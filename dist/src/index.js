import { serve } from '@hono/node-server';
import { Hono } from 'hono';
import auth from './routes/auth.js';
import posts from './routes/posts.js';
import cors from './middleware/cors.js';
import { initDatabase } from './db/index.js';
const app = new Hono();
await initDatabase();
//cors middleware
app.use('*', cors);
app.route('/api', auth);
app.route('/api', posts);
serve({
    fetch: app.fetch,
    port: 3000
}, (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
});
