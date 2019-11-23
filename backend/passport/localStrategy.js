const LocalStrategy = require("passport-local").Strategy;

const { User} = require("../models");

module.exports = (passport) => {
    passport.use(new LocalStrategy({
        usernameField : "realID",
        passwordField : "password"
    }, async (realID, password, done)=>{
        try {
            const exUser  = await User.findOne({ where : { realID : realID }});
            if (exUser) {
                if (password === exUser.password) {
                    done(null, exUser);
                } else {
                    done(null, false, { message : "비밀번호가 일치하지 않습니다." })
                }
            } else {
                done(null, false, { message : "가입되지 않은 회원입니다." })
            }
        } catch (err) {
            console.error(err);
            done(err);
        }
    }));
};