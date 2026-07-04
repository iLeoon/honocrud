"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = RootLayout;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
require("./globals.css");
const react_1 = require("react");
const query_provider_1 = __importDefault(require("@/components/query-provider"));
exports.metadata = {
    title: 'Shadcn Login Demo',
    description: 'Simple login form inspired by shadcn blocks',
};
function RootLayout({ children }) {
    return ((0, jsx_runtime_1.jsx)("html", { lang: "en", children: (0, jsx_runtime_1.jsx)("body", { className: "bg-gray-50 text-slate-900", children: (0, jsx_runtime_1.jsx)(query_provider_1.default, { children: children }) }) }));
}
