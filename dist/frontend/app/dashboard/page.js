"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = Page;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const posts_table_1 = __importDefault(require("../../components/posts-table"));
exports.metadata = {
    title: 'Dashboard',
};
function Page() {
    return ((0, jsx_runtime_1.jsx)("main", { className: "min-h-screen p-6 bg-gray-50", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-full max-w-4xl", children: (0, jsx_runtime_1.jsx)(posts_table_1.default, {}) }) }));
}
