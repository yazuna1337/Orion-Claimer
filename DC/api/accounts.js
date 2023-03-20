var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Get, Router } from "@discordx/koa";
import { AccountModel } from "../models/Account.js";
let API = class API {
    async handle(ctx) {
        // Fetch accounts from database, only return the accessTokens for valid accounts.
        const accounts = await AccountModel.find({ demo: false, lastAuthed: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24) } }, { email: 1, accessToken: 1, _id: 0 });
        // Send the accounts as a JSON response.
        ctx.body = accounts;
    }
    async demo(ctx) {
        // Fetch accounts from database, only return the accessTokens for valid accounts.
        const accounts = await AccountModel.find({ demo: true, lastAuthed: { $gt: new Date(Date.now() - 1000 * 60 * 60 * 24) } }, { email: 1, accessToken: 1, _id: 0 });
        // Send the accounts as a JSON response.
        ctx.body = accounts;
    }
};
__decorate([
    Get("/accounts"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], API.prototype, "handle", null);
__decorate([
    Get("/demo"),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], API.prototype, "demo", null);
API = __decorate([
    Router()
], API);
export { API };
