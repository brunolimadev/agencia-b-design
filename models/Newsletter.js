module.exports = (sequelize, DataTypes) => {
    const Newsletter = sequelize.define('Newsletter', {
        ID_NEWSLETTER: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        EMAIL_NEWS: DataTypes.STRING(50),
        DATA_SYS: DataTypes.DATE
    }, {
        freezeTableName: true,
        tableName: 'newsletters' ,
        timestamps: false
    })
    return Newsletter
}