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
function Page() {
    const router = (0, navigation_1.useRouter)();
    const mutation = (0, react_query_1.useMutation)({
        mutationFn: posts_1.createPost,
        onSuccess: () => {
            router.push('/dashboard');
        },
    });
    return ((0, jsx_runtime_1.jsx)(post_form_1.default, { heading: "Create post", submitLabel: "Create", isSubmitting: mutation.isPending, error: mutation.error ? (0, api_1.getErrorMessage)(mutation.error) : null, onSubmit: async (values) => {
            await mutation.mutateAsync(values);
        } }));
}
