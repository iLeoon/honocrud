'use client';
"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = LoginForm;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const react_1 = __importStar(require("react"));
function LoginForm() {
    const [email, setEmail] = (0, react_1.useState)('');
    const [password, setPassword] = (0, react_1.useState)('');
    const [error, setError] = (0, react_1.useState)(null);
    const [loading, setLoading] = (0, react_1.useState)(false);
    const onSubmit = async (e) => {
        e.preventDefault();
        setError(null);
        if (!email)
            return setError('Email is required');
        if (!password)
            return setError('Password is required');
        setLoading(true);
        try {
            const res = await fetch('http://localhost:3000/api/auth/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                // let the server set the cookie (Set-Cookie header) — include credentials
                credentials: 'include',
                body: JSON.stringify({ username: email, password }),
            });
            const data = await res.json();
            if (!res.ok) {
                setError(data?.message || 'Login failed');
            }
            else {
                // server should set cookie; redirect to dashboard
                window.location.href = '/dashboard';
            }
        }
        catch (err) {
            setError('Network error');
        }
        finally {
            setLoading(false);
        }
    };
    return ((0, jsx_runtime_1.jsxs)("div", { className: "rounded-lg border border-slate-100 bg-white p-8 shadow-sm", children: [(0, jsx_runtime_1.jsx)("h2", { className: "mb-2 text-2xl font-semibold", children: "Sign in to your account" }), (0, jsx_runtime_1.jsx)("p", { className: "mb-6 text-sm text-slate-500", children: "Enter your email and password to access your account." }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: onSubmit, className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", value: email, onChange: (e) => setEmail(e.target.value), className: "input", placeholder: "you@example.com" })] }), (0, jsx_runtime_1.jsxs)("div", { children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsx)("label", { className: "block text-sm font-medium text-slate-700 mb-1", children: "Password" }), (0, jsx_runtime_1.jsx)("a", { className: "text-xs text-slate-500 hover:underline", href: "#", children: "Forgot password?" })] }), (0, jsx_runtime_1.jsx)("input", { type: "password", value: password, onChange: (e) => setPassword(e.target.value), className: "input", placeholder: "Your password" })] }), error && (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-600", children: error }), (0, jsx_runtime_1.jsx)("div", { children: (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "btn w-full", disabled: loading, children: loading ? 'Signing in...' : 'Sign in' }) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-6 flex items-center gap-2", children: [(0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-slate-100" }), (0, jsx_runtime_1.jsx)("span", { className: "text-xs text-slate-400", children: "Or continue with" }), (0, jsx_runtime_1.jsx)("span", { className: "h-px flex-1 bg-slate-100" })] }), (0, jsx_runtime_1.jsxs)("div", { className: "mt-4 grid grid-cols-2 gap-2", children: [(0, jsx_runtime_1.jsx)("button", { className: "border rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50", children: "Google" }), (0, jsx_runtime_1.jsx)("button", { className: "border rounded-md px-3 py-2 text-sm text-slate-700 hover:bg-slate-50", children: "GitHub" })] }), (0, jsx_runtime_1.jsxs)("p", { className: "mt-6 text-center text-sm text-slate-500", children: ["Don\u2019t have an account? ", (0, jsx_runtime_1.jsx)("a", { href: "#", className: "text-slate-900 font-medium", children: "Sign up" })] })] }));
}
