"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const server = (0, express_1.default)();
const PORT = process.env.PORT || 29070;
const distPath = path_1.default.dirname(__dirname);
const publicPath = path_1.default.join(distPath, 'public');
server.listen(PORT, () => console.log(`server listening on port ${PORT}`));
server.use(express_1.default.static(publicPath));
