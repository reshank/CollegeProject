"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const database_1 = __importDefault(require("./src/config/database"));
const middlewares_1 = require("./src/middlewares");
const index_1 = require("./src/routes/index");
const path_1 = __importDefault(require("path"));
/* Initialization */
const app = express_1.default();
/* Config */
database_1.default();
dotenv_1.default.config({
    path: path_1.default.resolve(".env"),
});
/* Middleware Config */
middlewares_1.middlewaresConfig(app);
index_1.rootRoutes(app);
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running in ${process.env.NODE_ENV} mode on port ${PORT}`));
