module.exports = (sequelize, DataTypes) => (
    sequelize.define('card', {
        name: {
            type: DataTypes.ENUM("신한카드 Deep Oil", "신한카드 Deep On 체크", "신한카드 4Tune 체크"),
            allowNull: true,
        },
        cardNoEnc: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        validTrm: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        cvv2 : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        passwd: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'card',
        freezeTableName: true,
    })

);