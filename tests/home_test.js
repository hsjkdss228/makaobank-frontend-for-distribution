Feature('Home page');

// Given
Before(({ I }) => {
  // 계좌 설정
  // GET /backdoor/setup-database
  I.setupDatabase();

  I.amOnPage('/');
});

Scenario('로그인하지 않고 홈 페이지 접속', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('홈');
  I.see('회원가입');
  I.see('로그인');
  I.see('마카오뱅크에서');
  I.see('촉촉한 금융습관을 들이세요.');
  I.see('송금하기');
  I.see('거래내역조회');
});

Scenario('로그인한 후 홈 페이지 확인', ({ I }) => {
  // Given
  I.amOnPage('/');
  I.login('352');

  // When
  I.amOnPage('/');

  // Then
  I.see('홈');
  I.see('잔액확인');
  I.see('송금');
  I.see('거래내역');
  I.see('로그아웃');
});
