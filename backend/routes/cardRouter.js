import express from 'express';
import { enrollCard, getUserCardList, deleteCard } from '../controller/cardController'

const router = express.Router();

// 사용자가 등록한 카드 리스트 조회
router.get('/getUserCardList', getUserCardList);


// 카드 등록
router.post('/enrollCard', enrollCard);


// 카드 삭제
router.delete('/deleteCard/:cardId', deleteCard);


module.exports = router;