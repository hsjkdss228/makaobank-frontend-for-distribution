Feature('Transactions detail');

// Given
Before(({ I }) => {
  I.setupDatabase();

  I.amOnPage('/');

  // TODO: 로그인
});

Scenario('거래 내역이 없는 경우', ({ I }) => {
  // When
  I.amOnPage('/');
  I.click('거래내역');

  // Then
  I.see('거래 내역');
  I.see('종류');
  I.see('계좌번호');
  I.see('금액(원)');
  I.see('거래내역이 없습니다.');
});

Scenario('거래 내역이 존재하는 경우 (송금만)', ({ I }) => {
  // Given
  I.transfer({ to: '179', amount: 20000, name: '김인우' });
  I.transfer({ to: '179', amount: 6000000, name: '흥인우' });

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
  I.see('20,000원');
  I.see('6,000,000원');
});

// Scenario('거래 내역이 존재하는 경우 (입금만)', ({ I }) => {
//   // Given
//   I.transfer({ to: '179', amount: 20000, name: '김인우' });

//   // When
//   I.amOnPage('/');
//   I.click('거래내역');

//   // Then
//   I.see('입금');
//   I.see('킹코리타');
//   I.see('1원');
// });

// Scenario('거래 내역이 존재하는 경우 (송금, 입금 모두)', ({ I }) => {
//   // Given
//   I.transfer({ to: '179', amount: 20000, name: '김인우' });

//   // When
//   I.amOnPage('/');
//   I.click('거래내역');

//   // Then
//   I.see('송금');
//   I.see('179');
//   I.see('10,000원');
//   I.see('입금');
//   I.see('킹코리타');
//   I.see('1원');
// });
