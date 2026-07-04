'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Button;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const react_1 = __importDefault(require("react"));
function Button({ variant = 'default', className = '', ...props }) {
    const base = 'inline-flex items-center justify-center rounded-md px-3 py-2 text-sm font-medium';
    const styles = variant === 'outline'
        ? 'border bg-white text-slate-700 hover:bg-slate-50'
        : 'bg-slate-900 text-white hover:opacity-90';
    return (0, jsx_runtime_1.jsx)("button", { className: `${base} ${styles} ${className}`, ...props });
}
