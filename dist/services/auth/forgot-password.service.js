"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.forgotPasswordService = void 0;
const jsonwebtoken_1 = require("jsonwebtoken");
const config_1 = require("../../config");
const nodemailer_1 = require("../../lib/nodemailer");
const prisma_1 = __importDefault(require("../../lib/prisma"));
const resetPasswordEmail_1 = require("../../templates/resetPasswordEmail");
const forgotPasswordService = (body) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { email } = body;
        const user = yield prisma_1.default.user.findFirst({
            where: { email },
        });
        if (!user) {
            throw new Error("Email not found");
        }
        const token = (0, jsonwebtoken_1.sign)({ id: user.id }, config_1.JWT_SECRET_FORGOT_PASSWORD, {
            expiresIn: "20m",
        });
        const link = `${config_1.BASE_URL_FRONTEND}/reset-password/${token}`;
        const emailHtml = (0, resetPasswordEmail_1.resetPasswordTemplate)(link);
        nodemailer_1.transporter.sendMail({
            to: email,
            subject: "Link Reset Password",
            html: emailHtml,
        });
        return { message: "Send email success" };
    }
    catch (error) {
        throw error;
    }
});
exports.forgotPasswordService = forgotPasswordService;
