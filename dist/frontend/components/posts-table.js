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
exports.default = PostsTable;
const jsx_runtime_1 = require("hono/jsx/jsx-runtime");
const react_1 = __importStar(require("react"));
const link_1 = __importDefault(require("next/link"));
const navigation_1 = require("next/navigation");
const react_query_1 = require("@tanstack/react-query");
const lucide_react_1 = require("lucide-react");
const button_1 = require("@/components/ui/button");
const dropdown_menu_1 = require("@/components/ui/dropdown-menu");
const table_1 = require("@/components/ui/table");
const api_1 = require("@/lib/api");
const posts_1 = require("@/lib/posts");
function PostsTable() {
    const router = (0, navigation_1.useRouter)();
    const queryClient = (0, react_query_1.useQueryClient)();
    const [filter, setFilter] = (0, react_1.useState)('');
    const [pageIndex, setPageIndex] = (0, react_1.useState)(0);
    const [pageSize, setPageSize] = (0, react_1.useState)(5);
    const [tableError, setTableError] = (0, react_1.useState)(null);
    const postsQuery = (0, react_query_1.useQuery)({
        queryKey: ['posts'],
        queryFn: posts_1.getPosts,
    });
    const deleteMutation = (0, react_query_1.useMutation)({
        mutationFn: posts_1.deletePost,
        onSuccess: async () => {
            setTableError(null);
            await queryClient.invalidateQueries({ queryKey: ['posts'] });
        },
        onError: (error) => {
            setTableError((0, api_1.getErrorMessage)(error));
        },
    });
    const posts = postsQuery.data ?? [];
    const filteredPosts = posts.filter((post) => {
        const q = filter.toLowerCase();
        return post.title.toLowerCase().includes(q) || post.content.toLowerCase().includes(q);
    });
    const pageCount = Math.max(1, Math.ceil(filteredPosts.length / pageSize));
    const safePageIndex = Math.min(pageIndex, pageCount - 1);
    const pagedPosts = filteredPosts.slice(safePageIndex * pageSize, safePageIndex * pageSize + pageSize);
    function remove(id) {
        if (!confirm('Delete this post?'))
            return;
        setTableError(null);
        deleteMutation.mutate(id);
    }
    function formatTimestamp(value) {
        return new Date(value).toLocaleString();
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "space-y-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex flex-1 items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("input", { placeholder: "Filter posts...", value: filter, onChange: (event) => {
                                    setFilter(event.target.value);
                                    setPageIndex(0);
                                }, className: "h-9 w-[150px] rounded-md border border-slate-200 bg-white px-3 text-sm text-slate-900 placeholder:text-slate-400 focus:border-slate-400 focus:outline-none lg:w-[250px]" }), filter && ((0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", onClick: () => {
                                    setFilter('');
                                    setPageIndex(0);
                                }, className: "h-8 px-2 lg:px-3", children: ["Reset", (0, jsx_runtime_1.jsx)(lucide_react_1.X, { className: "ml-2 h-4 w-4" })] }))] }), (0, jsx_runtime_1.jsx)(link_1.default, { href: "/posts/create", children: (0, jsx_runtime_1.jsxs)(button_1.Button, { size: "sm", className: "h-9 gap-1.5", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.Plus, { className: "h-4 w-4" }), "Create post"] }) })] }), tableError && (0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-600", children: tableError }), postsQuery.isError && ((0, jsx_runtime_1.jsx)("p", { className: "text-sm text-red-600", children: (0, api_1.getErrorMessage)(postsQuery.error) })), (0, jsx_runtime_1.jsx)("div", { className: "rounded-xl border border-slate-200 bg-white shadow-sm", children: (0, jsx_runtime_1.jsxs)(table_1.Table, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHeader, { children: (0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Title" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Content" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Created at" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { children: "Updated at" }), (0, jsx_runtime_1.jsx)(table_1.TableHead, { className: "w-[96px] text-center", children: "Actions" })] }) }), (0, jsx_runtime_1.jsxs)(table_1.TableBody, { children: [postsQuery.isLoading && ((0, jsx_runtime_1.jsx)(table_1.TableRow, { children: (0, jsx_runtime_1.jsx)(table_1.TableCell, { colSpan: 5, className: "text-center text-sm text-slate-500", children: "Loading posts..." }) })), pagedPosts.map((p) => ((0, jsx_runtime_1.jsxs)(table_1.TableRow, { children: [(0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "align-top", children: p.title }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "align-top", children: p.content }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "align-top", children: formatTimestamp(p.created_at) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "align-top", children: formatTimestamp(p.updated_at) }), (0, jsx_runtime_1.jsx)(table_1.TableCell, { className: "align-middle text-center", children: (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenu, { children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuTrigger, { asChild: true, children: (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "ghost", size: "icon", className: "mx-auto flex h-8 w-8 p-0 text-slate-600 hover:bg-slate-100 hover:text-slate-900", children: [(0, jsx_runtime_1.jsx)(lucide_react_1.GripHorizontal, { className: "h-4 w-4" }), (0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Open menu" })] }) }), (0, jsx_runtime_1.jsxs)(dropdown_menu_1.DropdownMenuContent, { align: "end", children: [(0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { onClick: () => router.push(`/posts/edit/${p.id}`), children: "Edit" }), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuSeparator, {}), (0, jsx_runtime_1.jsx)(dropdown_menu_1.DropdownMenuItem, { variant: "destructive", onClick: () => remove(String(p.id)), disabled: deleteMutation.isPending && deleteMutation.variables === String(p.id), children: "Delete" })] })] }) })] }, p.id))), !postsQuery.isLoading && pagedPosts.length === 0 && ((0, jsx_runtime_1.jsx)(table_1.TableRow, { children: (0, jsx_runtime_1.jsx)(table_1.TableCell, { colSpan: 5, className: "text-center text-sm text-slate-500", children: "No posts yet" }) }))] }), (0, jsx_runtime_1.jsx)(table_1.TableFooter, { children: (0, jsx_runtime_1.jsx)(table_1.TableRow, { children: (0, jsx_runtime_1.jsxs)(table_1.TableCell, { colSpan: 5, className: "text-sm text-slate-500", children: ["Showing ", pagedPosts.length, " of ", filteredPosts.length, " filtered posts (", posts.length, " total)"] }) }) })] }) }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center justify-between px-2", children: [(0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsx)("p", { className: "text-sm font-medium", children: "Rows per page" }), (0, jsx_runtime_1.jsx)("select", { className: "h-8 w-[80px] rounded-md border border-slate-200 bg-white px-2 text-sm text-slate-900 focus:border-slate-400 focus:outline-none", value: pageSize, onChange: (e) => {
                                    setPageSize(Number(e.target.value));
                                    setPageIndex(0);
                                }, children: [5, 10, 20, 30].map((size) => ((0, jsx_runtime_1.jsx)("option", { value: size, children: size }, size))) })] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-4", children: [(0, jsx_runtime_1.jsxs)("div", { className: "text-sm font-medium", children: ["Page ", pageCount === 0 ? 0 : safePageIndex + 1, " of ", pageCount] }), (0, jsx_runtime_1.jsxs)("div", { className: "flex items-center space-x-2", children: [(0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => setPageIndex((p) => Math.max(0, p - 1)), disabled: safePageIndex === 0, children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Go to previous page" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronLeftIcon, { className: "h-4 w-4" })] }), (0, jsx_runtime_1.jsxs)(button_1.Button, { variant: "outline", className: "h-8 w-8 p-0", onClick: () => setPageIndex((p) => Math.min(pageCount - 1, p + 1)), disabled: safePageIndex >= pageCount - 1, children: [(0, jsx_runtime_1.jsx)("span", { className: "sr-only", children: "Go to next page" }), (0, jsx_runtime_1.jsx)(lucide_react_1.ChevronRightIcon, { className: "h-4 w-4" })] })] })] })] })] }));
}
