module.exports = (sequelize, DataTypes) => (
    sequelize.define('benefit', {
        cardName : {
            type: DataTypes.ENUM("신한카드 Deep Oil", "신한카드 Deep On 체크", "신한카드 4Tune 체크"),
            allowNull: true,
        },
        category : {
            type: DataTypes.ENUM('전체', '편의점', '카페',  '영화',  '베이커리', '쇼핑', '교통'),
            allowNull: true,
        },
        storeName : {
            type: DataTypes.STRING(30),
            allowNull: true,
        },
        previousPayment : {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        couponRate : {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
        maxLimit : {
            type: DataTypes.INTEGER,
            allowNull: true,
        },
    }, {
        timestamps: true,
        paranoid: true,
        tableName: 'benefit',
        freezeTableName: true,
    })
);