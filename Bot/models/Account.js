import { model, Schema } from "mongoose";
export var AccountType;
(function (AccountType) {
    AccountType["Mojang"] = "mojang";
    AccountType["Microsoft"] = "microsoft";
})(AccountType || (AccountType = {}));
const AccountSchema = new Schema({
    email: { type: String, required: true },
    password: { type: String, required: true },
    accessToken: { type: String, required: true },
    lastAuthed: { type: Date, required: true },
    demo: { type: Boolean, default: false },
    type: { type: String, required: true, enum: Object.values(AccountType) }
});
export const AccountModel = model('Account', AccountSchema);
