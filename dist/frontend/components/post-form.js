'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = PostForm;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const link_1 = __importDefault(require("next/link"));
const react_1 = require("react");
const button_1 = require("@/components/ui/button");
const emptyValues = {
    title: '',
    content: '',
};
function PostForm({ heading, submitLabel, initialValues = emptyValues, isSubmitting = false, isLoading = false, error, onSubmit, }) {
    const [values, setValues] = (0, react_1.useState)(initialValues);
    const [validationError, setValidationError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        setValues(initialValues);
    }, [initialValues]);
    async function handleSubmit(event) {
        event.preventDefault();
        setValidationError(null);
        if (!values.title.trim()) {
            setValidationError('Title is required');
            return;
        }
        if (!values.content.trim()) {
            setValidationError('Content is required');
            return;
        }
        await onSubmit({
            title: values.title.trim(),
            content: values.content.trim(),
        });
    }
    return ((0, jsx_runtime_1.jsx)("main", { className: "min-h-screen bg-gray-50 p-6", children: (0, jsx_runtime_1.jsxs)("div", { className: "mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm", children: [(0, jsx_runtime_1.jsx)("h1", { className: "mb-4 text-xl font-semibold text-slate-900", children: heading }), (0, jsx_runtime_1.jsxs)("form", { className: "grid gap-3", onSubmit: handleSubmit, children: [(0, jsx_runtime_1.jsx)("input", { className: "input", placeholder: "Title", value: values.title, onChange: (event) => setValues((current) => ({ ...current, title: event.target.value })), disabled: isLoading || isSubmitting }), (0, jsx_runtime_1.jsx)("textarea", { className: "input min-h-32", placeholder: "Content", value: values.content, onChange: (event) => setValues((current) => ({ ...current, content: event.target.value })), disabled: isLoading || isSubmitting }), (validationError || error) && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-600", children: validationError || error })), (0, jsx_runtime_1.jsxs)("div", { className: "flex gap-2", children: [(0, jsx_runtime_1.jsx)(button_1.Button, { type: "submit", disabled: isLoading || isSubmitting, children: isSubmitting ? `${submitLabel}...` : submitLabel }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/dashboard", children: (0, jsx_runtime_1.jsx)(button_1.Button, { type: "button", variant: "outline", disabled: isLoading || isSubmitting, children: "Cancel" }) })] })] })] }) }));
}
