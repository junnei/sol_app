import axios from 'axios'
import crypto from 'crypto'
import { User } from '../models'
import passport from "passport/lib";

// POST -> 회원가입
const signUp = async (req, res, next) => {
    const { realID, password } = req.body;
    try {
        const exUser = await User.findOne({ where : { realID : realID }});

        if (exUser) {
            return res.status(409).json({ message : '사용 중인 아이디입니다.' });
        }

        await User.create({
            realID : realID,
            password : password,
        });

        return res.status(200).json({ message : '회원가입에 성공하였습니다.' });
    } catch (err) {
        console.error(err);
        return next(err);
    }
};


// POST -> 실명인증
const realNameConfirm = async (req, res, next) => {
    const { realID, name, encIdno } = req.body;

    const cipher = crypto.createCipher('aes192', process.env.CRYPTO_SECRET);
    cipher.update(encIdno, 'utf8', 'base64');
    const cipheredOutput = cipher.final('base64');

    try {
        const result = await axios.post('http://10.3.17.61:8081/v1/applycard/kcbrealnameauthorizations', {
            dataHeader:{
            },
            dataBody:{
                nxtQyKey : "",
                clnNm : name,
                encIdno : cipheredOutput
            }
        });

        if (result.data.dataBody.resCd !== '0000') {
            return res.status(409).json({ message : "인증에 실패했습니다." })
        }

        await User.update({
            name : name,
            encIdno : encIdno,
        },{
            where : { realID : realID }
        });
        return res.status(200).json({ message : "인증에 성공했습니다." })
    } catch (err) {
        console.error(err);
        return next(err);
    }
};


// POST -> 휴대폰 번호 인증 요청
const phoneAuthRequest = async (req, res, next) => {

    console.log(req.user);

    const { telcoTpCode, mobiNo1, mobiNo2, mobiNo3, encIdno } = req.body;

    const cipher = crypto.createCipher('aes192', process.env.CRYPTO_SECRET);
    cipher.update(encIdno, 'utf8', 'base64');
    const cipheredOutput = cipher.final('base64');

    try {
        await axios.post('http://10.3.17.61:8081/v1/phoneservices/requestandverifyauthorizationforfree', {
            dataHeader:{
            },
            dataBody: {
                bizGbn:"01",
                vrfyNo:"",
                MsgCntt:"123456",
                telcoTpCode: telcoTpCode,
                mobiNo1: mobiNo1,
                mobiNo2: mobiNo2,
                mobiNo3: mobiNo3,
                encIdno: cipheredOutput
            }
        });

        return res.status(200).json({
            message : "정상적으로 인증요청 되었습니다.",
            MsgCntt:"123456"
        });

    } catch (err) {
        console.error(err);
        return next(err);
    }
};


// POST -> 휴대폰 번호 인증 확인
const phoneAuthResponse = async (req, res, next) => {

    const { realID, telcoTpCode, mobiNo1, mobiNo2, mobiNo3, encIdno, MsgCntt } = req.body;

    const cipher = crypto.createCipher('aes192', process.env.CRYPTO_SECRET);
    cipher.update(encIdno, 'utf8', 'base64');
    const cipheredOutput = cipher.final('base64');

    try {
        const result = await axios.post('http://10.3.17.61:8081/v1/phoneservices/requestandverifyauthorizationforfree', {
            dataHeader:{
            },
            dataBody: {
                bizGbn:"02",
                vrfyNo:"",
                MsgCntt: MsgCntt,
                telcoTpCode: telcoTpCode,
                mobiNo1: mobiNo1,
                mobiNo2: mobiNo2,
                mobiNo3: mobiNo3,
                encIdno: cipheredOutput
            }
        });

        if (result.data.dataBody.resCd !== '0000') {
            return res.status(409).json({ message : "인증에 실패했습니다." })
        }

        const phoneNum = mobiNo1 + mobiNo2 + mobiNo3;

        await User.update({
            phoneNum: phoneNum
        },{
            where : { realID : realID }
        });

        return res.status(200).json({ message : "인증에 성공했습니다." })

    } catch (err) {
        console.error(err);
        return next(err);
    }
};


// POST -> 결제 비밀번호 세팅
const setPayPassword = async (req, res, next) => {
    const { realID, payPassword } = req.body;
    try {
        if (Number.isNaN(payPassword)) {
            return res.status(400).json({ message : "숫자를 입력하세요." });
        }

        if (payPassword.length !== 6) {
            return res.status(400).json({ message : "6자리의 숫자를 입력하세요." })
        }

        await User.update({
            payPassword : payPassword,
        }, {
            where : { realID : realID }
        });

        res.status(200).json({ message : '정상적으로 설정되었습니다.' })
    } catch (err) {
        console.error(err);
        next(err);
    }
};

// POST -> 로그인
const logIn = (req, res, next) => {
    passport.authenticate("local", (authError, user, info) => {
        if (authError) {
            console.error(authError);
            next(authError);
        }
        if (!user) {
            return res.status(409).json({ message : info.message });
        }
        return req.login(user, (loginError)=>{
            if (loginError) {
                console.error(loginError);
                next(loginError);
            }
            return res.status(200).json({ message : '로그인에 성공하였습니다.' });
        })
    })(req, res, next);
};

// POST -> 로그아웃
const logOut = (req, res)=>{
    req.logout();  // req.user객체를 제거하는 역할
    req.session.destroy();  // req.session 객체내용 제거 역할
    res.status(200).json({ message : '로그아웃에 성공하였습니다.' });
};

export { phoneAuthRequest, phoneAuthResponse, realNameConfirm, signUp, setPayPassword, logIn, logOut }