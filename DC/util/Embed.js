import { EmbedBuilder } from "@discordjs/builders";
export class Embed extends EmbedBuilder {
    constructor() {
        super();
        this.setColor(0x00ff00);
        this.setFooter({ text: 'I love men' });
    }
}
