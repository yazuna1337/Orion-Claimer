var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
import { ApplicationCommandOptionType, CommandInteraction } from "discord.js";
import { Discord, Slash, SlashChoice, SlashGroup, SlashOption } from "discordx";
import { authenticate } from '@xboxreplay/xboxlive-auth';
import { Embed } from "../util/Embed.js";
import { AccountModel } from "../models/Account.js";
import axios from "axios";
export async function authenticateMicrosoft(email, password) {
    const { xsts_token, user_hash } = await authenticate(email, password, { XSTSRelyingParty: 'rp://api.minecraftservices.com/' });
    const { data } = await axios.post('https://api.minecraftservices.com/authentication/login_with_xbox', { identityToken: `XBL3.0 x=${user_hash};${xsts_token}` });
    const accessToken = data.access_token;
    return { accessToken };
}
export async function authenticateMojang(email, password) {
    const { data } = await axios.post('https://authserver.mojang.com/authenticate', {
        agent: {
            name: 'Minecraft',
            version: 1
        },
        username: email,
        password
    });
    const accessToken = data.accessToken;
    return { accessToken };
}
let AccountManager = class AccountManager {
    async add(type, email, password, demo, interaction) {
        // First lets check if the account works
        try {
            console.log(type);
            let data = { accessToken: '' };
            if (type === 'Mojang') {
                data = await authenticateMojang(email, password);
            }
            else {
                data = await authenticateMicrosoft(email, password);
            }
            await AccountModel.create({
                email,
                password,
                accessToken: data.accessToken,
                lastAuthed: new Date(),
                type: type.toLocaleLowerCase(),
                demo: demo ?? false,
            });
            await interaction.reply({
                embeds: [
                    new Embed()
                        .setTitle('Successfully Authenticated')
                        .setDescription('The account has been authenticated and added to the database.')
                        .setColor(0x00ff00)
                ], ephemeral: true
            });
        }
        catch (e) {
            await interaction.reply({
                embeds: [
                    new Embed()
                        .setDescription('The E-Mail or Password you provided seems to be invalid, please try again.')
                        .setColor(0xff0000)
                ], ephemeral: true
            });
        }
    }
    async list(interaction) {
        const accounts = await AccountModel.find({ demo: false });
        const fields = [
            {
                name: 'E-Mail⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀',
                value: '\u200b',
                inline: true,
            },
            {
                name: 'Status⠀⠀⠀',
                value: '\u200b',
                inline: true,
            },
            {
                name: 'Last Authed',
                value: '\u200b',
                inline: true,
            }
        ];
        for (const account of accounts) {
            fields[0].value += `**${account.email}**\n`;
            fields[1].value += `${account.lastAuthed > new Date(Date.now() - 1000 * 60 * 60 * 24) ? '✅' : '❌'}\n`;
            fields[2].value += `${account.lastAuthed.toLocaleString()}\n`;
        }
        await interaction.reply({
            embeds: [
                new Embed()
                    .addFields(fields)
                    .setColor(0x00ff00)
            ], ephemeral: true
        });
    }
    async remove(email, interaction) {
        await AccountModel.deleteOne({ email });
        await interaction.reply({
            embeds: [
                new Embed()
                    .setTitle('Account Removed')
                    .setDescription('The account has been removed from the database.')
                    .setColor(0x00ff00)
            ], ephemeral: true
        });
    }
};
__decorate([
    Slash({ description: 'Add an account to the list.' }),
    __param(0, SlashChoice('Mojang', 'Microsoft')),
    __param(0, SlashOption({ name: 'type', description: 'The type of the account', required: true, type: ApplicationCommandOptionType.String })),
    __param(1, SlashOption({ name: 'email', description: 'The E-Mail of the account', required: true, type: ApplicationCommandOptionType.String })),
    __param(2, SlashOption({ name: 'password', description: 'The Password of the account', required: true, type: ApplicationCommandOptionType.String })),
    __param(3, SlashOption({ name: 'demo', description: 'Is this a demo account?', required: false, type: ApplicationCommandOptionType.Boolean })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, Boolean, CommandInteraction]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "add", null);
__decorate([
    Slash({ description: 'List the current accounts and their status.' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [CommandInteraction]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "list", null);
__decorate([
    Slash({ description: 'Remove an account from the list.' }),
    __param(0, SlashOption({ name: 'email', description: 'The E-Mail of the account', required: true, type: ApplicationCommandOptionType.String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, CommandInteraction]),
    __metadata("design:returntype", Promise)
], AccountManager.prototype, "remove", null);
AccountManager = __decorate([
    Discord(),
    SlashGroup({ name: 'account', description: 'Manage your accounts.' }),
    SlashGroup('account')
], AccountManager);
export { AccountManager };
