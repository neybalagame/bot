const { Events, EmbedBuilder, ChannelType } = require('discord.js');
const User = require('../models/User');

module.exports = {
    name: Events.GuildMemberAdd,
    async execute(member) {
        try {
            // 1. Encontrar canal de boas-vindas
            const welcomeChannel = member.guild.channels.cache.find(
                channel => channel.name.includes('boas-vindas') || 
                          channel.name.includes('welcome') ||
                          channel.name.includes('geral')
            ) || member.guild.systemChannel; // Canal padrão do servidor

            // 2. Criar embed de boas-vindas
            const welcomeEmbed = new EmbedBuilder()
                .setColor('#00FF00')
                .setTitle(`🎮 Bem-vindo(a) ao ${member.guild.name}!`)
                .setDescription(`Olá ${member.user.username}! Esperamos que se divirta aqui!`)
                .addFields(
                    { name: '📊 Membros', value: `Agora somos **${member.guild.memberCount}** membros!`, inline: true },
                    { name: '📅 Entrou em', value: `<t:${Math.floor(Date.now() / 1000)}:D>`, inline: true },
                    { name: '📋 Regras', value: 'Leia as regras em #regras', inline: false }
                )
                .setThumbnail(member.user.displayAvatarURL({ dynamic: true, size: 256 }))
                .setImage('https://media.giphy.com/media/l0MYt5jPR6QX5pnqM/giphy.gif') // GIF opcional
                .setFooter({ text: 'Divirta-se no nosso servidor de games!' })
                .setTimestamp();

            // 3. Enviar mensagem
            if (welcomeChannel && welcomeChannel.type === ChannelType.GuildText) {
                await welcomeChannel.send({
                    content: `👋 ${member.user} acabou de entrar!`,
                    embeds: [welcomeEmbed]
                });
            }

            // 4. Enviar mensagem privada (DM)
            try {
                const dmEmbed = new EmbedBuilder()
                    .setColor('#5865F2')
                    .setTitle(`🎉 Bem-vindo(a) ao ${member.guild.name}!`)
                    .setDescription(`
Olá **${member.user.username}**! 

**📌 Algumas informações importantes:**
• Regras: #regras
• Anúncios: #anúncios  
• Chat geral: #geral
• Voice chats: Sala de Games

**🎮 Comandos úteis:**
\`/rank\` - Ver seu nível
\`/torneio\` - Participar de torneios
\`/loja\` - Comprar itens com moedas

Divirta-se! 🎯
                    `)
                    .setFooter({ text: 'Qualquer dúvida, chame um staff!' });

                await member.send({ embeds: [dmEmbed] });
            } catch (dmError) {
                console.log(`Não foi possível enviar DM para ${member.user.tag}`);
            }

            // 5. Criar registro no banco de dados
            const newUser = new User({
                userId: member.id,
                guildId: member.guild.id,
                xp: 0,
                level: 1,
                coins: 100, // Presente de boas-vindas
                joinedAt: new Date()
            });

            await newUser.save();
            console.log(`✅ Novo usuário registrado: ${member.user.tag}`);

        } catch (error) {
            console.error('Erro no evento guildMemberAdd:', error);
        }
    }
};