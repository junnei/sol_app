// 서버 시작할 때 .env의 비밀키들을 process.env에 넣어서 안의 값을 사용
require("dotenv").config();

// npm으로 받은 패키지 불러오기
import createError from "http-errors"
import cookieParser from "cookie-parser"
import logger from "morgan"
import session from "express-session"
import passport from "passport"
import MySQLStore from "express-mysql-session"
import express from "express"
import cors from 'cors'

// const변수 할당
const mysqlSessionOptions = {
  host: 'localhost',
  port: 3306,
  user: 'root',
  password: '1234',
  database: 'a-pay'
};
const sessionStore = new MySQLStore(mysqlSessionOptions);
const passportConfig = require("./passport");  // passport를 인자로 받는 익명함수 반환
const app = express();
const { sequelize } = require("./models");  // db라는 객체 반환 -> 그 안에 db.sequelize가 있음
const authRouter = require('./routes/authRouter');
const cardRouter = require('./routes/cardRouter');
const payRouter = require('./routes/payRouter');

// 세팅
sequelize.sync();  // 서버 실행 시 자동으로 mysql과 연동 / 인자로 force:true를 줄 수도 있는데 이건 모델링 변경된 점을 그대로 (DDL) 반영해주는 것 - 지양
passportConfig(passport);  // 여기서 passport 디렉토리의 index, kakaoStrategy에 의해 설정된 함수로 passport가 설정&저장됨.
                           // 이후 이 passport는 미들웨어에서 passport.initialize(), passport.session()으로 쓰인다.
app.set('port', process.env.PORT || 3000);


//----------------------------------미들웨어 시작------------------------------------
app.use(cors());
if (process.env.NODE_ENV !== "test"){
  app.use(logger('dev'));
}
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser(process.env.COOKIE_SECRET));
app.use(session({
  resave: false,
  saveUninitialized: false,
  secret: process.env.COOKIE_SECRET,
  store : sessionStore,
  cookie: {
    httpOnly: true,
    secure: false,
  },
}));
app.use(passport.initialize());  // 요청req에 passport설정을 심고
app.use(passport.session());  // req.session 객체에 passport 정보를 저장한다.
                              // req.session객체는 express-session에서 생성하므로 express-session미들웨어보다 뒤에 연결되어야 한다.
                              // deserializeUser를 호출하는 메소드
                              // 여기서 req.user의 정보가 확실히 저장되고 밑에 있는 라우터들에서 주로 req.user.id를 가져다 쓴다.


//-------------------------------라우터 미들웨어 시작----------------------------------

app.use('/api/auth', authRouter);
app.use('/api/card', cardRouter);
app.use('/api/pay', payRouter);

//-------------------------------에러 핸들링 미들웨어 시작------------------------------
app.use((req, res, next) => {
  next(createError(404));
});

app.use((err, req, res, next) => {
  let apiError = err;

  if (!err.status) {
    apiError = createError(err)
  }

  // set locals, only providing error in development
  res.locals.message = apiError.message;
  res.locals.error = process.env.NODE_ENV === 'development' ? apiError : {};

  return res.status(apiError.status).json({message: apiError.message})
});


//-------------------------------서버 포트 리스닝 시작------------------------------
app.listen(app.get('port'), () => {
  console.log(app.get('port'), '번 포트에서 대기중');
});
