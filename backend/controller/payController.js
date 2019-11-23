import axios from 'axios'
import CryptoJS from "crypto-js";

import { Pay, Card, User } from '../models'


// POST -> 최적의 카드와 최소의 결제금액을 산출
const makeBestPayment = async (req, res, next) => {

    const { realCost, benefitStoreName, monthPayment, monthBenefit } = req.body;

    try {
        const result = await axios.post('http://10.3.17.61:8080/v1/solpay/qr-payment', {
            dataHeader:
                {
                },
            dataBody:
                {
                    upche_mcht_no:"000000000001",  // 매장코드
                    sol_tramt:"318870",  // 거래금액
                    trx_time:"101917",  // 거래시간
                    pos_no:"1000000001",  // pos번호
                    qr_no:"AW00|12753261|0000001636|20191001101905654127|RIB001BFE0A5EA03",  // qr코드
                    upche_id:"AW00",  // 업체id
                    trxdt:"20191001",  // 거래일자
                    serviceCode:"T0740",  // 서비스코드
                    sol_mcht_no:"880000000011",  // 은행가맹점 코드
                    upche_trxno:"180-389873908-101527",  // app생성거래 번호
                    trx_g:"02",  // 거래 구분 코드
                    jehyu_id:"12753261"  // 제휴기관 id
                }
        });
        if(result.data.dataBody.resp_cd !== '000') {
            return res.status(409).json({ message : "QR코드 인식에 실패했습니다." })
        }


        const card_arr = ["신한카드 Deep Oil", "신한카드 Deep On 체크", "신한카드 4Tune 체크"];
        var finalCardName = '';
        var finalCost = 0;
        var benefitCategory = '';

        switch (benefitStoreName) {
            case '스타벅스' :
                benefitCategory = '카페';
                if (monthBenefit > 30000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 30000 && monthBenefit > 20000) {
                    if(monthPayment > 300000) {
                        finalCost = realCost*(1-0.1);
                    } else {
                        finalCost = realCost*(1-0.002);
                    }
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 20000 && monthBenefit > 15000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                } else if (monthBenefit < 15000 && monthBenefit > 7500) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost*(1-0.05);
                        finalCardName = card_arr[0];
                    }
                } else if(monthBenefit < 7500) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[2];
                    } else {
                        finalCost = realCost*(1-0.05);
                        finalCardName = card_arr[0];
                    }
                }
                break;
            case '이디야' :
                benefitCategory = '카페';
                if (monthBenefit > 20000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 20000 && monthBenefit > 15000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                } else if (monthBenefit < 15000 && monthBenefit > 7500) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost*(1-0.05);
                        finalCardName = card_arr[0];
                    }
                } else if(monthBenefit < 7500) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[2];
                    } else {
                        finalCost = realCost*(1-0.05);
                        finalCardName = card_arr[0];
                    }
                }
                break;
            case '커피빈' :
            case '카페베네' :
                benefitCategory = '카페';
                if (monthBenefit > 30000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 30000 && monthBenefit > 20000) {
                    if(monthPayment > 300000) {
                        finalCost = realCost*(1-0.1);
                    } else {
                        finalCost = realCost*(1-0.002);
                    }
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 20000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                }
                break;
            case 'GS25' :
            case 'CU' :
                benefitCategory = '편의점';
                if (monthBenefit > 100000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 100000 && monthBenefit > 20000) {
                    finalCost = realCost*(1-0.01);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 20000 && monthBenefit > 15000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                } else if (monthBenefit < 15000 && monthBenefit > 7500) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost*(1-0.05);
                        finalCardName = card_arr[0];
                    }
                } else if(monthBenefit < 7500) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[2];
                    } else {
                        finalCost = realCost*(1-0.05);
                        finalCardName = card_arr[0];
                    }
                }
                break;
            case '롯데시네마' :
                benefitCategory = '영화';
                if (monthBenefit > 20000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if(monthBenefit < 20000 && monthBenefit > 10000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost-5000;
                        finalCardName = card_arr[0];
                    }
                } else if (monthBenefit < 10000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost-5000;
                        finalCardName = card_arr[0];
                    }
                }
                break;
            case '파리바게트' :
            case '뚜레쥬르' :
            case '투썸플레이스' :
                benefitCategory = '베이커리';
                if (monthBenefit > 100000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 100000 && monthBenefit > 20000) {
                    finalCost = realCost*(1-0.01);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 20000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                }
                break;
            case '이마트' :
            case '홈플러스' :
            case '롯데마트' :
            case 'G마켓' :
            case 'CJ홈쇼핑' :
            case '쿠팡' :
                benefitCategory = '쇼핑';
                if (monthBenefit > 100000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 100000 && monthBenefit > 20000) {
                    finalCost = realCost*(1-0.01);
                    finalCardName = card_arr[2];
                } else if (monthBenefit < 20000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                }
                break;
            case 'S-OIL' :
                benefitCategory = '주유';
                if (monthBenefit > 200000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else {
                    finalCost = realCost*(1-0.04);
                    finalCardName = card_arr[2];
                }
                break;
            case 'GS칼텍스' :
                benefitCategory = '주유';
                if (monthBenefit > 30000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else if (monthBenefit > 20000 && monthBenefit < 30000) {
                    if(monthPayment > 700000) {
                        finalCost = realCost*(1-0.1);
                        finalCardName = card_arr[0];
                    } else {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[2];
                    }
                } else if (monthBenefit > 15000 && monthBenefit < 20000) {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost*(1-0.1);
                        finalCardName = card_arr[0];
                    }
                } else {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                        finalCardName = card_arr[1];
                    } else {
                        finalCost = realCost*(1-0.1);
                        finalCardName = card_arr[0];
                    }
                }
                break;
            default :
                benefitCategory = '전체';
                if (monthBenefit > 20000) {
                    finalCost = realCost*(1-0.002);
                    finalCardName = card_arr[2];
                } else {
                    if(monthPayment < 300000) {
                        finalCost = realCost*(1-0.002);
                    } else if (monthPayment < 700000 && monthPayment > 300000) {
                        finalCost = realCost*(1-0.01);
                    } else {
                        finalCost = realCost*(1-0.02);
                    }
                    finalCardName = card_arr[1];
                }
        }

        res.status(200).json({
            message : '최적의 카드와 금액이 정상적으로 산출되었습니다.',
            finalCardName : finalCardName,
            benefitCategory : benefitCategory,
            benefitStoreName : benefitStoreName,
            realCost : realCost,
            finalCost : finalCost,
        })

  } catch (err) {
      console.error(err);
      return next(err);
  }
};


// POST -> 결제 비밀번호 인증으로 결제하기
const autoPay = async (req, res, next) => {

    const { inputPayPassword, finalCardName, benefitCategory, benefitStoreName, realCost, finalCost } = req.body;

    try {
        const loginedUser = await User.findOne({
            where : { id : req.user.id }
        });
        const realPayPassword = loginedUser.payPassword;

        if (inputPayPassword !== realPayPassword) {
            return res.status(409).json({ message : '결제비밀번호가 올바르지 않습니다.' })
        }

        const selectedCard = await Card.findOne({
            where : { name : finalCardName }
        });

        const previousPayment = await Pay.findOne({
            limit : 1,
            order : [["id", "DESC"]]
        });

        var nowMonth = new Date().getMonth();

        const benefitMoney = realCost - finalCost;
        var thisMonthPayment = (previousPayment.createdAt.toString().substring(5, 7) != nowMonth) ? 0 : previousPayment.monthPayment + finalCost;
        var thisMonthBenefit = (previousPayment.createdAt.toString().substring(5, 7) != nowMonth) ? 0 : previousPayment.monthBenefit + benefitMoney;

        console.log(previousPayment.createdAt.toString());
        console.log(nowMonth);

        const result = await Pay.create({
            userId : req.user.id,
            cardId : selectedCard.id,
            payMoney: finalCost,   // 혜택을 적용한 최종 통합결제 금액 @@@@@@@@@@@
            monthPayment : thisMonthPayment,  // 이번 달 결제한 누적 금액
            benefitCategory : benefitCategory,  // 혜택 카테고리
            benefitStoreName : benefitStoreName,  // 혜택 가맹점
            benefitMoney : benefitMoney,  // 이번 결제에서의 혜택 금액
            monthBenefit : thisMonthBenefit  // 이번 달 혜택받은 누적 금액
        });
        // console.log(selectedCard.cardNoEnc);
        // var bytes = CryptoJS.AES.decrypt(selectedCard.cardNoEnc, process.env.CRYPTO_SECRET);
        // var decodedCardNoEnc = bytes.toString(CryptoJS.enc.UTF8);


        // TO-DO 카드번호 디코딩 해야함.
        return res.status(200).json({
            message : '정상적으로 통합결제가 승인되었습니다.',
            benefitStoreName : benefitStoreName,
            finalCost : finalCost,
            createdAt : result.createdAt,
            finalCardName : finalCardName,
            cardNoEnc : "7159-7894-4561-7810",
        })
    } catch (err) {
        console.error(err);
        return next(err);
    }
};



// GET -> 전체 결제 내역 조회




// GET -> 카드1 결제 내역 조회



// GET -> 카드2 결제 내역 조회



// GET -> 카드3 결제 내역 조회






export { autoPay, makeBestPayment };