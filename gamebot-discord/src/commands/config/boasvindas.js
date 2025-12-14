const { SlashCommandBuilder, EmbedBuilder, PermissionFlagsBits } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('config-boasvindas')
        .setDescription('Configure o canal de boas-vindas')
        .addChannelOption(option =>
            option.setName('canal')
                .setDescription('Canal para enviar mensagens de boas-vindas')
                .setRequired(true))
        .setDefaultMemberPermissions(PermissionFlagsBits.Administrator),
    
    async execute(interaction) {
        const channel = interaction.options.getChannel('canal');
        
        // Salvar no banco de dados (simplificado)
        // Em produção, salve no banco de dados
        interaction.client.welcomeChannels = interaction.client.welcomeChannels || {};
        interaction.client.welcomeChannels[interaction.guild.id] = channel.id;
        
        const embed = new EmbedBuilder()
            .setColor('#00FF00')
            .setTitle('✅ Configuração de boas-vindas')
            .setDescription(`Canal de boas-vindas definido para: ${channel}`)
            .addFields(
                { name: 'Próximos passos', value: 'Quando um novo membro entrar, será enviada uma mensagem aqui!' }
            )
            .setTimestamp();
            
        await interaction.reply({ embeds: [embed], ephemeral: true });
    }
};