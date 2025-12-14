// src/commands/games/torneio.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('torneio')
        .setDescription('Crie um torneio para o servidor')
        .addStringOption(option =>
            option.setName('jogo')
                .setDescription('Qual o jogo do torneio?')
                .setRequired(true)
                .addChoices(
                    { name: '🎯 Among Us', value: 'amongus' },
                    { name: '⚔️ Valorant', value: 'valorant' },
                    { name: '🔫 CS:GO', value: 'csgo' },
                    { name: '🏆 League of Legends', value: 'lol' },
                    { name: '🎮 Fortnite', value: 'fortnite' }
                ))
        .addIntegerOption(option =>
            option.setName('vagas')
                .setDescription('Número máximo de participantes')
                .setRequired(true)),
    
    async execute(interaction) {
        const game = interaction.options.getString('jogo');
        const slots = interaction.options.getInteger('vagas');
        
        const gameNames = {
            'amongus': 'Among Us',
            'valorant': 'Valorant',
            'csgo': 'CS:GO',
            'lol': 'League of Legends',
            'fortnite': 'Fortnite'
        };
        
        const embed = new EmbedBuilder()
            .setColor('#FF0000')
            .setTitle(`🏆 Torneio de ${gameNames[game]}`)
            .setDescription(`Organizado por ${interaction.user}\n\n**Vagas:** 0/${slots}\n\n**Participantes:**\nNenhum participante ainda.`)
            .setTimestamp()
            .setFooter({ text: 'Clique em "Participar" para entrar no torneio!' });
            
        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId(`join_tournament_${interaction.id}`)
                    .setLabel('✅ Participar')
                    .setStyle(ButtonStyle.Success),
                new ButtonBuilder()
                    .setCustomId(`leave_tournament_${interaction.id}`)
                    .setLabel('❌ Sair')
                    .setStyle(ButtonStyle.Danger),
                new ButtonBuilder()
                    .setCustomId(`start_tournament_${interaction.id}`)
                    .setLabel('🚀 Iniciar')
                    .setStyle(ButtonStyle.Primary)
            );
            
        await interaction.reply({ 
            embeds: [embed], 
            components: [row] 
        });
        
        // Armazenar dados do torneio
        interaction.client.tournaments = interaction.client.tournaments || {};
        interaction.client.tournaments[interaction.id] = {
            game: gameNames[game],
            slots: slots,
            participants: [],
            creator: interaction.user.id
        };
    }
};