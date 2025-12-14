// src/commands/games/rank.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');
const User = require('../../models/User');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('rank')
        .setDescription('Veja seu nível e rank no servidor'),
    
    async execute(interaction) {
        const user = await User.findOne({ 
            userId: interaction.user.id, 
            guildId: interaction.guild.id 
        }) || { xp: 0, level: 1, coins: 100 };
        
        const neededXP = user.level * 100;
        const progress = Math.min((user.xp / neededXP) * 100, 100);
        
        const embed = new EmbedBuilder()
            .setColor('#0099ff')
            .setTitle(`🏆 Rank de ${interaction.user.username}`)
            .addFields(
                { name: 'Nível', value: `**${user.level}**`, inline: true },
                { name: 'XP', value: `${user.xp}/${neededXP}`, inline: true },
                { name: 'Moedas', value: `🪙 ${user.coins}`, inline: true },
                { name: 'Progresso', value: `[${'█'.repeat(Math.floor(progress/10))}${'░'.repeat(10 - Math.floor(progress/10))}] ${Math.floor(progress)}%` }
            )
            .setThumbnail(interaction.user.displayAvatarURL());
            
        await interaction.reply({ embeds: [embed] });
    }
};