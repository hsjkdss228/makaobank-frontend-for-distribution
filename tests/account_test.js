Feature('Account detail');

// Given
Before(({ I }) => {
  // 계좌 설정
  // GET /backdoor/setup-database
  I.setupDatabase();

  I.login('352');

  I.amOnPage('/');
});

Scenario('잔액 미보유', ({ I }) => {
  // Given
  I.changeAmount({ userId: 1, amount: 0 });

  I.amOnPage('/');

  // When
  I.click('잔액확인');

  // Then
  I.see('이름: 김인우');
  I.see('계좌번호: 352');
  I.see('잔액: 0원');
});

Scenario('잔액 보유', ({ I }) => {
  // Given
  I.changeAmount({ userId: 1, amount: 456000000 });

  I.amOnPage('/');

  // When
  I.click('잔액확인');

  // Then
  I.see('이름: 김인우');
  I.see('계좌번호: 352');
  I.see('잔액: 456,000,000원');
});
