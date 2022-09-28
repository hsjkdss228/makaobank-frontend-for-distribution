Feature('Transfer detail');

const numberFormat = (number) => Intl.NumberFormat().format(number);

const amount = 456000000;

// Given
Before(({ I }) => {
  // TODO: 계좌 설정
  I.setupDatabase();
  I.changeAmount({ userId: 1, amount });

  I.amOnPage('/');

  // TODO: 로그인
});

Scenario('송금 UI 출력 확인', ({ I }) => {
  // When
  I.click('송금');

  // Then
  I.see('받는 분 계좌번호:');
  I.see('하이픈(-) 제외 숫자 8글자를 입력하세요');
  I.see('보낼금액(원):');
  I.see('내 계좌 잔액: 456,000,000원');
  I.see('받는 분 통장 표시:');
  I.see('입금 받는 분의 통장에 표시될 이름을 입력하세요');
  I.see('보내기');
});

Scenario('정상적으로 송금이 되는 경우', ({ I }) => {
  const transferAmount = 10000;

  // When
  I.click('송금');
  I.fillField('받는 분 계좌번호:', '179');
  I.fillField('보낼금액(원):', transferAmount);
  I.fillField('받는 분 통장 표시:', '김인우');
  I.click('보내기');

  // Then
  // I.see('송금 진행중...');
  // I.limitTime(2).see('계좌 이체에 성공했습니다.');
  I.see('계좌 이체에 성공했습니다.');

  // 잔액 확인
  I.click('잔액확인');
  I.see('이름: 김인우');
  I.see('계좌번호: 352');
  I.see(`잔액: ${numberFormat(amount - transferAmount)}원`);
});

Scenario('없는 계좌번호에 송금을 시도하는 경우', ({ I }) => {
  // When
  I.click('송금');
  I.fillField('받는 분 계좌번호:', '666666');
  I.fillField('보낼금액(원):', '10000');
  I.fillField('받는 분 통장 표시:', '김인우');
  I.click('보내기');

  // Then
  I.see('잘못된 계좌번호입니다. 다시 입력해주세요.');
});

// Scenario('본인의 계좌번호에 송금을 시도하는 경우', ({ I }) => {
//   // When
//   I.click('송금');
//   I.fillField('받는 분 계좌번호:', '352');
//   I.fillField('보낼금액(원):', '10000');
//   I.fillField('받는 분 통장 표시:', '김인우');
//   I.click('보내기');

//   // Then
//   I.see('본인의 계좌번호입니다. 다시 입력해주세요.');
// });

// Scenario('계좌번호를 입력하지 않은 경우', ({ I }) => {
//   // When
//   I.click('송금');
//   I.fillField('보낼금액(원):', '10000');
//   I.fillField('받는 분 통장 표시:', '김인우');
//   I.click('보내기');

//   // Then
//   I.see('계좌번호를 입력해주세요.');
// });

// Scenario('보낼 금액을 입력하지 않은 경우', ({ I }) => {
//   // When
//   I.click('송금');
//   I.fillField('받는 분 계좌번호:', '352');
//   I.fillField('받는 분 통장 표시:', '김인우');
//   I.click('보내기');

//   // Then
//   I.see('금액을 입력해주세요.');
// });

Scenario('보유 금액이 보낼 금액보다 부족한 경우', ({ I }) => {
  const transferAmount = amount + 544000000;

  // When
  I.click('송금');
  I.fillField('받는 분 계좌번호:', '352');
  I.fillField('보낼금액(원):', transferAmount);
  I.fillField('받는 분 통장 표시:', '김인우');
  I.click('보내기');

  // Then
  I.see('계좌 잔액이 부족합니다.');
});

// Scenario('받는 분 통장 표시를 입력하지 않은 경우', ({ I }) => {
//   // When
//   I.click('송금');
//   I.fillField('받는 분 계좌번호:', '179');
//   I.fillField('보낼금액(원):', '10000');
//   I.click('보내기');

//   // Then
//   I.see('입금 받는 분의 통장에 표시될 이름을 입력하세요.');
// });
