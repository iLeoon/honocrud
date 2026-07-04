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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DropdownMenu = DropdownMenu;
exports.DropdownMenuItem = DropdownMenuItem;
exports.DropdownMenuLink = DropdownMenuLink;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
function DropdownMenu({ label = 'Actions', children }) {
    return ((0, jsx_runtime_1.jsxs)("details", { className: "relative inline-block", children: [(0, jsx_runtime_1.jsx)("summary", { className: "list-none cursor-pointer rounded-md border bg-white px-3 py-2 text-sm font-medium text-slate-700 hover:bg-slate-50 [&::-webkit-details-marker]:hidden", children: label }), (0, jsx_runtime_1.jsx)("div", { className: "absolute right-0 z-20 mt-2 min-w-36 rounded-md border bg-white p-1 shadow-md", children: children })] }));
}
function DropdownMenuItem({ onClick, children, className = '', }) {
    return ((0, jsx_runtime_1.jsx)("button", { type: "button", onClick: onClick, className: `block w-full rounded px-3 py-2 text-left text-sm hover:bg-slate-100 ${className}`, children: children }));
}
function DropdownMenuLink({ href, children }) {
    return ((0, jsx_runtime_1.jsx)(link_1.default, { href: href, className: "block rounded px-3 py-2 text-sm hover:bg-slate-100", children: children }));
}
