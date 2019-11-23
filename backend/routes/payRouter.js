import express from 'express';
import { autoPay, makeBestPayment } from '../controller/payController'

const router = express.Router();

// 최적의 카드와 최소의 결제금액 산출
router.post('/makeBestPayment', makeBestPayment);


// 결제하기
router.post('/autoPay', autoPay);


// 전체 결제 내역 조회




// 카드1 결제 내역 조회



// 카드2 결제 내역 조회



// 카드3 결제 내역 조회




module.exports = router;
