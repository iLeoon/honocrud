import { Hono } from "hono";
import { verifyLogin } from "../token/jwt.js";
import { setCookie } from "hono/cookie";
const app = new Hono();
app.post('/auth/login', async (c) => {
    const { username, password } = await c.req.json();
    console.log(username, password);
    if (username === "ahmed@gmail.com" && password === "123") {
        let token = await verifyLogin();
        console.log(token);
        setCookie(c, 'token', token, {
            httpOnly: true,
            sameSite: 'Lax',
            path: '/',
        });
        return c.json({ message: 'login successful' });
    }
    else {
        return c.json({ message: "invalid username or password" }, 401);
    }
});
export default app;
