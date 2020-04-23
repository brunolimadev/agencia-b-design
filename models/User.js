module.exports = (sequelize, DataTypes) => {
    const User = sequelize.define('User', {
        ID_USUARIO: {
            type: DataTypes.INTEGER,
            primarykey: true,
            // autoIncrement: true,
            allowNull: false
        },
        NOME: {
           type: DataTypes.STRING(50),
           allowNull: false
        },
        EMAIL: DataTypes.STRING(50),
        PS: DataTypes.STRING(70),
        AVATAR: DataTypes.STRING(70),
        DATA_SYS: DataTypes.DATE
    }, {
        freezeTableName: true,
        tableName: 'usuarios' 
    }, {
        timestamps: false
    })
    return User
}