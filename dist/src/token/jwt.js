import { sign } from "hono/jwt";
const secret = 'mysecret';
const payload = {
    sub: 'user123',
    role: 'admin',
    exp: Math.floor(Date.now() / 1000) + 24 * 60 * 60
};
export async function verifyLogin() {
    return await sign(payload, secret);
}
