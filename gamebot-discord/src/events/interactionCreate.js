// src/events/interactionCreate.js
const { Events } = require('discord.js');
const User = require('../models/User');

module.exports = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        // Comandos slash
        if (interaction.isChatInputCommand()) {
            const command = interaction.client.commands.get(interaction.commandName);
            
            if (!command) return;
            
            try {
                await command.execute(interaction);
            } catch (error) {
                console.error(error);
                await interaction.reply({ 
                    content: 'Ocorreu um erro ao executar este comando!', 
                    ephemeral: true 
                });
            }
        }
        
        // Botões interativos
        if (interaction.isButton()) {
            if (interaction.customId.startsWith('join_tournament_')) {
                // Lógica para entrar em torneio
                const tournamentId = interaction.customId.replace('join_tournament_', '');
                const tournament = interaction.client.tournaments[tournamentId];
                
                if (tournament && !tournament.participants.includes(interaction.user.id)) {
                    if (tournament.participants.length < tournament.slots) {
                        tournament.participants.push(interaction.user.id);
                        await interaction.reply({ 
                            content: `${interaction.user} entrou no torneio! (${tournament.participants.length}/${tournament.slots})`, 
                            ephemeral: false 
                        });
                    } else {
                        await interaction.reply({ 
                            content: 'Torneio cheio!', 
                            ephemeral: true 
                        });
                    }
                }
            }
        }
    }
};