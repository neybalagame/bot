// src/commands/games/velha.js
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('velha')
        .setDescription('Jogue jogo da velha com alguém')
        .addUserOption(option => 
            option.setName('oponente')
                .setDescription('Quem você quer desafiar?')
                .setRequired(true)),
    
    async execute(interaction) {
        const opponent = interaction.options.getUser('oponente');
        
        if (opponent.bot) {
            return interaction.reply({ content: '❌ Não pode desafiar bots!', ephemeral: true });
        }
        
        const embed = new EmbedBuilder()
            .setColor('#5865F2')
            .setTitle('🎮 Jogo da Velha')
            .setDescription(`${interaction.user} desafia ${opponent}!\n\nÉ a vez de: ${interaction.user}`)
            .addFields(
                { name: 'Tabuleiro', value: '1️⃣2️⃣3️⃣\n4️⃣5️⃣6️⃣\n7️⃣8️⃣9️⃣' }
            );
            
        // Criar botões do tabuleiro
        const rows = [];
        for (let i = 0; i < 3; i++) {
            const row = new ActionRowBuilder();
            for (let j = 1; j <= 3; j++) {
                const buttonNumber = i * 3 + j;
                row.addComponents(
                    new ButtonBuilder()
                        .setCustomId(`ttt_${buttonNumber}`)
                        .setLabel(buttonNumber.toString())
                        .setStyle(ButtonStyle.Secondary)
                );
            }
            rows.push(row);
        }
        
        await interaction.reply({ 
            embeds: [embed], 
            components: rows,
            content: `${opponent}, você foi desafiado! Aceite jogando em um dos botões acima.`
        });
    }
};