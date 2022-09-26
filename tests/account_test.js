Feature('Account detail');

// Given
Before(({ I }) => {
  // TODO: 계좌 설정

  I.amOnPage('/');

  // TODO: 로그인
});

Scenario('잔액 정보 확인', ({ I }) => {
  // When
  I.click('잔액확인');

  // Then
  I.see('이름: 김인우');
  I.see('계좌번호: 352');
  I.see('잔액: 0원');
});
