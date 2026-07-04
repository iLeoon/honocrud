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
exports.Table = Table;
exports.TableHeader = TableHeader;
exports.TableBody = TableBody;
exports.TableRow = TableRow;
exports.TableHead = TableHead;
exports.TableCell = TableCell;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const React = __importStar(require("react"));
function Table({ className = '', ...props }) {
    return ((0, jsx_runtime_1.jsx)("div", { className: "w-full overflow-auto", children: (0, jsx_runtime_1.jsx)("table", { className: `w-full caption-bottom text-sm ${className}`, ...props }) }));
}
function TableHeader({ className = '', ...props }) {
    return (0, jsx_runtime_1.jsx)("thead", { className: `[&_tr]:border-b ${className}`, ...props });
}
function TableBody({ className = '', ...props }) {
    return (0, jsx_runtime_1.jsx)("tbody", { className: `[&_tr:last-child]:border-0 ${className}`, ...props });
}
function TableRow({ className = '', ...props }) {
    return (0, jsx_runtime_1.jsx)("tr", { className: `border-b transition-colors hover:bg-slate-50 ${className}`, ...props });
}
function TableHead({ className = '', ...props }) {
    return ((0, jsx_runtime_1.jsx)("th", { className: `h-12 px-4 text-left align-middle font-medium text-slate-600 ${className}`, ...props }));
}
function TableCell({ className = '', ...props }) {
    return (0, jsx_runtime_1.jsx)("td", { className: `p-4 align-middle ${className}`, ...props });
}
