Feature('Transactions detail');

// Given
Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');

  // TODO: 로그인
});

// Scenario('거래 내역이 없는 경우', ({ I }) => {
//   // When
//   I.click('거래내역');

//   // Then
//   I.see('거래 내역');
//   I.see('종류');
//   I.see('계좌번호');
//   I.see('금액(월)');
//   I.see('거래내역이 없습니다.');
// });

Scenario('거래 내역이 존재하는 경우 (송금만)', ({ I }) => {
  // Given
  I.click('송금');
  I.fillField('받는 분 계좌번호:', '179');
  I.fillField('보낼금액(원):', '10000');
  I.fillField('받는 분 통장 표시:', '김인우');
  I.click('보내기');
  I.see('계좌 이체에 성공했습니다.');

  // When
  I.amOnPage('/');
  I.click('거래내역');

  // Then
  I.see('거래 내역');
  I.see('종류');
  I.see('계좌번호');
  I.see('금액(원)');
  I.see('송금');
  I.see('179');
  I.see('10,000원');
});

// Scenario('거래 내역이 존재하는 경우 (입금만)', ({ I }) => {
//   // When
//   I.click('거래내역');

//   // Then
//   I.see('입금');
//   I.see('킹코리타');
//   I.see('1원');
// });

// Scenario('거래 내역이 존재하는 경우 (송금, 입금 모두)', ({ I }) => {
//   // When
//   I.click('거래내역');

//   // Then
//   I.see('송금');
//   I.see('179');
//   I.see('10,000원');
//   I.see('입금');
//   I.see('킹코리타');
//   I.see('1원');
// });
