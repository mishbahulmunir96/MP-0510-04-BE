"use strict";
Object.defineProperty(exports, "__esModule", { value: true });

exports.prisma = void 0;
const client_1 = require("../../prisma/generated/client");
exports.default = new client_1.PrismaClient();