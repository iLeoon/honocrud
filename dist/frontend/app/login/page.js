"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.metadata = void 0;
exports.default = Page;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const login_form_1 = __importDefault(require("../../components/login-form"));
exports.metadata = {
    title: 'Login',
};
function Page() {
    return ((0, jsx_runtime_1.jsx)("main", { className: "min-h-screen flex items-center justify-center p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "w-full max-w-md", children: (0, jsx_runtime_1.jsx)(login_form_1.default, {}) }) }));
}
