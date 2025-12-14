// src/commands/games/tesouro.js
const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('tesouro')
        .setDescription('Encontre o tesouro escondido!'),
    
    async execute(interaction) {
        const map = [
            ['🌳', '🌳', '🌳', '🌳'],
            ['🌳', '❓', '🌳', '🌳'],
            ['🌳', '🌳', '🌳', '❓'],
            ['🌳', '❓', '🌳', '🌳']
        ];
        
        const treasureRow = Math.floor(Math.random() * 4);
        const treasureCol = Math.floor(Math.random() * 4);
        
        const embed = new EmbedBuilder()
            .setColor('#FFD700')
            .setTitle('🗺️ Caça ao Tesouro')
            .setDescription('Encontre o tesouro escondido! Use `/cavar linha coluna`\nExemplo: `/cavar 2 3`')
            .addFields(
                { name: 'Mapa', value: map.map(row => row.join('')).join('\n') }
            );
            
        await interaction.reply({ embeds: [embed] });
        
        // Armazenar local do tesouro
        interaction.client.treasureGame = interaction.client.treasureGame || {};
        interaction.client.treasureGame[interaction.user.id] = { row: treasureRow, col: treasureCol };
    }
};