// src/commands/economy/loja.js
const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, StringSelectMenuBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('loja')
        .setDescription('Compre itens com suas moedas'),
    
    async execute(interaction) {
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('🛒 Loja do Servidor')
            .setDescription('Compre itens exclusivos com suas moedas!')
            .addFields(
                { name: '🎨 Cores Personalizadas', value: '`/comprar cor <nome>`\nPreço: 500 moedas' },
                { name: '🏷️ Tag VIP', value: '`/comprar tag <nome>`\nPreço: 1000 moedas' },
                { name: '🎫 Ingresso para Torneio', value: '`/comprar ingresso`\nPreço: 200 moedas' },
                { name: '🎁 Caixa Misteriosa', value: '`/comprar caixa`\nPreço: 300 moedas' }
            );
            
        const row = new ActionRowBuilder()
            .addComponents(
                new StringSelectMenuBuilder()
                    .setCustomId('shop_select')
                    .setPlaceholder('Selecione um item para comprar')
                    .addOptions([
                        {
                            label: 'Cor Personalizada',
                            description: '500 moedas',
                            value: 'color'
                        },
                        {
                            label: 'Tag VIP',
                            description: '1000 moedas',
                            value: 'tag'
                        },
                        {
                            label: 'Ingresso para Torneio',
                            description: '200 moedas',
                            value: 'ticket'
                        },
                        {
                            label: 'Caixa Misteriosa',
                            description: '300 moedas',
                            value: 'mystery_box'
                        }
                    ])
            );
            
        await interaction.reply({ embeds: [embed], components: [row] });
    }
};