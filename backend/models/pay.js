module.exports = (sequelize, DataTypes) => (
    sequelize.define('pay', {
        payMoney: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        monthPayment: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        benefitCategory: {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        benefitStoreName : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        benefitMoney: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        monthBenefit: {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'pay',
        freezeTableName: true,
    })

);