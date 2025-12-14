const { Events, EmbedBuilder } = require('discord.js');

module.exports = {
    name: Events.GuildMemberRemove,
    async execute(member) {
        try {
            const goodbyeChannel = member.guild.channels.cache.find(
                channel => channel.name.includes('saída') || 
                          channel.name.includes('goodbye') ||
                          channel.name.includes('boas-vindas')
            ) || member.guild.systemChannel;

            if (goodbyeChannel) {
                const goodbyeEmbed = new EmbedBuilder()
                    .setColor('#FF0000')
                    .setTitle('👋 Até mais!')
                    .setDescription(`**${member.user.tag}** saiu do servidor.`)
                    .addFields(
                        { name: '📊 Membros restantes', value: `Agora temos **${member.guild.memberCount}** membros`, inline: true }
                    )
                    .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
                    .setTimestamp();

                await goodbyeChannel.send({ embeds: [goodbyeEmbed] });
            }

            console.log(`❌ Usuário saiu: ${member.user.tag}`);
        } catch (error) {
            console.error('Erro no evento guildMemberRemove:', error);
        }
    }
};