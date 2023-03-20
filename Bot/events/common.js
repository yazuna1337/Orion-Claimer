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
async function checkAccounts() {
    const accounts = await AccountModel.find({ lastAuthed: { $lte: new Date(new Date().getTime() - 1000 * 60 * 60 * 24) } });
    console.log("Checking " + accounts.length + " accounts...");
    accounts.forEach(async (account) => {
        try {
            let data = { accessToken: '' };
            if (account.type === AccountType.Mojang) {
                data = await authenticateMojang(account.email, account.password);
            }
            else {
                data = await authenticateMicrosoft(account.email, account.password, account.demo);
            }
            // Update the account in the database
            await AccountModel.updateOne({ _id: account._id }, { accessToken: data.accessToken, lastAuthed: new Date() });
        }
        catch (e) {
            console.log("Failed to Authenticate Account: " + account.email);
        }
    });
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
