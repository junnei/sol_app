import express from 'express';

import { phoneAuthRequest, phoneAuthResponse, realNameConfirm, signUp, setPayPassword, logIn, logOut } from '../controller/authController'


const router = express.Router();

// 최초 회원가입
router.post('/signUp', signUp);

// 본인 실명 인증
router.post('/realNameConfirm', realNameConfirm);

// 휴대폰 번호 인증 요청
router.post('/phoneAuthRequest', phoneAuthRequest);

// 휴대폰 번호 인증 확인
router.post('/phoneAuthResponse', phoneAuthResponse);

// 결제 비밀번호 세팅
router.post('/setPayPassword', setPayPassword);

// 로그인
router.post('/logIn', logIn);

// 로그인
router.get('/logOut', logOut);

module.exports = router;
