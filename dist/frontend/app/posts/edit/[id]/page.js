'use client';
"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = Page;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const react_query_1 = require("@tanstack/react-query");
const navigation_1 = require("next/navigation");
const post_form_1 = __importDefault(require("@/components/post-form"));
const api_1 = require("@/lib/api");
const posts_1 = require("@/lib/posts");
function Page({ params }) {
    const router = (0, navigation_1.useRouter)();
    const postQuery = (0, react_query_1.useQuery)({
        queryKey: ['post', params.id],
        queryFn: () => (0, posts_1.getPost)(params.id),
    });
    const mutation = (0, react_query_1.useMutation)({
        mutationFn: (values) => (0, posts_1.updatePost)(params.id, values),
        onSuccess: () => {
            router.push('/dashboard');
        },
    });
    if (postQuery.isLoading) {
        return ((0, jsx_runtime_1.jsx)("main", { className: "min-h-screen bg-gray-50 p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-slate-500", children: "Loading post..." }) }) }));
    }
    if (postQuery.isError || !postQuery.data) {
        return ((0, jsx_runtime_1.jsx)("main", { className: "min-h-screen bg-gray-50 p-6", children: (0, jsx_runtime_1.jsx)("div", { className: "mx-auto w-full max-w-2xl rounded-xl border border-slate-200 bg-white p-6 shadow-sm", children: (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-600", children: postQuery.error ? (0, api_1.getErrorMessage)(postQuery.error) : 'Post not found' }) }) }));
    }
    return ((0, jsx_runtime_1.jsx)(post_form_1.default, { heading: `Edit post #${params.id}`, submitLabel: "Update", initialValues: {
            title: postQuery.data.title,
            content: postQuery.data.content,
        }, isSubmitting: mutation.isPending, error: mutation.error ? (0, api_1.getErrorMessage)(mutation.error) : null, onSubmit: async (values) => {
            await mutation.mutateAsync(values);
        } }));
}
