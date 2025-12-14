// src/commands/games/stats.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('estatisticas')
        .setDescription('Veja as estatísticas do servidor'),
    
    async execute(interaction) {
        const users = await User.find({ guildId: interaction.guild.id }).sort({ level: -1 }).limit(10);
        
        const topPlayers = users.map((user, index) => {
            const member = interaction.guild.members.cache.get(user.userId);
            return `${index + 1}. ${member ? member.user.username : 'Usuário'} - Nível ${user.level} (${user.xp} XP)`;
        }).join('\n');
        
        const totalXP = users.reduce((sum, user) => sum + user.xp, 0);
        const totalGames = users.reduce((sum, user) => sum + user.gamesPlayed, 0);
        
        const embed = new EmbedBuilder()
            .setColor('#9C27B0')
            .setTitle('📊 Estatísticas do Servidor')
            .addFields(
                { name: '👑 Top 10 Jogadores', value: topPlayers || 'Nenhum dado ainda' },
                { name: '📈 Estatísticas Gerais', value: `Total de XP: **${totalXP}**\nTotal de Jogos: **${totalGames}**\nJogadores Ativos: **${users.length}**` },
                { name: '🎮 Jogo Mais Popular', value: 'Coletando dados...' }
            )
            .setTimestamp()
            .setFooter({ text: `Solicitado por ${interaction.user.username}` });
            
        await interaction.reply({ embeds: [embed] });
    }
};