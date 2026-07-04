"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.api = void 0;
exports.getErrorMessage = getErrorMessage;
const axios_1 = __importDefault(require("axios"));
exports.api = axios_1.default.create({
    baseURL: 'http://localhost:3000/api',
    withCredentials: true,
    headers: {
        'Content-Type': 'application/json',
    },
});
function getErrorMessage(error) {
    if (axios_1.default.isAxiosError(error)) {
        return (error.response?.data?.message ||
            error.response?.data?.error ||
            error.message ||
            'Request failed');
    }
    if (error instanceof Error) {
        return error.message;
    }
    return 'Request failed';
}
