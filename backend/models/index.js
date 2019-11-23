import Sequelize from "sequelize"

const env = process.env.NODE_ENV || 'development';
const config = require('../config/config')[env];
const db = {};

const sequelize = new Sequelize(
    config.database, config.username, config.password, config,
);

db.sequelize = sequelize;
db.Sequelize = Sequelize;

db.User = require('./user')(sequelize, Sequelize);
db.Card = require('./card')(sequelize, Sequelize);
db.Pay = require('./pay')(sequelize, Sequelize);
db.Benfit = require('./benefit')(sequelize, Sequelize);


// user & card 연관관계 (user : card = 1 : N)
// 시퀄라이즈는 자동으로 card 테이블에 userId 컬럼을 추가한다.
db.User.hasMany(db.Card);
db.Card.belongsTo(db.User);

// user & card 연관관계 (user : pay = 1 : N)
// 시퀄라이즈는 자동으로 pay 테이블에 userId 컬럼을 추가한다.
db.User.hasMany(db.Pay);
db.Pay.belongsTo(db.User);

// apply & post 연관관계 (pay : card = 1 : 1)
// 시퀄라이즈는 자동으로 pay 테이블에 cardId컬럼을 추가한다.
db.Card.hasOne(db.Pay);
db.Pay.belongsTo(db.Card);


// 셋팅이 끝난 db를 수출한다.
// require("../models")이걸로 쓰면 됨.
module.exports = db;