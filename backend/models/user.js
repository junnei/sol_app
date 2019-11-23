module.exports = (sequelize, DataTypes) => (
    sequelize.define('user', {
        realID: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        password: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        name: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        encIdno : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        phoneNum: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        payPassword : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'user',
        freezeTableName: true,
    })

);