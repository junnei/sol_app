// passport에서 가장 중요한 두 가지는 serializeUser와 deserializeUser 이다.

const local = require("./localStrategy");
const { User } = require("../models");

module.exports = (passport)=>{

    passport.serializeUser((user, done)=>{
        console.log("serialize");
        done(null, user.id);
    });

    passport.deserializeUser(async (id, done) => {
        try {
            const user = await User.findOne({ where: { id : id } });
            console.log("deserialize");
            done(null, user);
        }catch (err) {
            console.error(err);
            done(err);
        }
    });

    //위의 두 개의 메소드는 passport를 사용한 세션처리관련 메소드이다.
    local(passport);
};

