var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
import { Discord, On } from "discordx";
import { authenticateMicrosoft, authenticateMojang } from "../commands/account.js";
import { AccountModel, AccountType } from "../models/Account.js";
function randomIp() {
    return `${Math.floor(40 + Math.random() * 200)}.${Math.floor(40 + Math.random() * 200)}.${Math.floor(40 + Math.random() * 200)}.${Math.floor(40 + Math.random() * 200)}`;
}
async function checkAccounts() {
    const accounts = await AccountModel.find({ lastAuthed: { $lte: new Date(Date.now() - 1000 * 60 * 60 * 23) } });
    console.log("Checking " + accounts.length + " accounts...");
    for (const account of accounts) {
        // Authenticate the account
        try {
            let data = { accessToken: '' };
            console.log(account.type);
            console.log(account.type === AccountType.Microsoft);
            if (account.type === AccountType.Mojang) {
                data = await authenticateMojang(account.email, account.password);
            }
            else {
                data = await authenticateMicrosoft(account.email, account.password);
            }
            // Update the account in the database
            await AccountModel.updateOne({ _id: account._id }, { accessToken: data.accessToken, lastAuthed: new Date() });
        }
        catch (e) {
            console.log("Failed to Authenticate Account: " + account.email, e);
        }
    }
}
let Example = class Example {
    async ready([]) {
        await checkAccounts();
        setInterval(async () => {
            await checkAccounts();
        }, 1000 * 60 * 10);
    }
};
__decorate([
    On(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], Example.prototype, "ready", null);
Example = __decorate([
    Discord()
], Example);
export { Example };
