module.exports = (sequelize, DataTypes) => {
    const Contact = sequelize.define('Contact', {
        ID_CONTATO: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        NOME_CONTATO: {
           type: DataTypes.STRING,
           allowNull: false
        },
        EMAIL_CONTATO: DataTypes.STRING,
        MENSAGEM: DataTypes.STRING(2000),
        DATA_SYS: DataTypes.DATE
    }, {
        freezeTableName: true,
        tableName: 'contatos' ,
        timestamps: false
    })
    return Contact
}