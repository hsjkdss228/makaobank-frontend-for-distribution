Feature('Login page');

// Given
Before(({ I }) => {
  // 계좌 설정
  // GET /backdoor/setup-database
  I.setupDatabase();
});

Scenario('로그인 UI 출력 확인', ({ I }) => {
  // When
  I.amOnPage('/login');

  // Then
  I.see('USER LOGIN');
  I.see('아이디(계좌번호)');
  I.see('비밀번호');
  I.see('로그인하기');
  I.see('회원가입');
});

Scenario('로그인 폼에 등록된 계정 정보 입력 후 로그인', ({ I }) => {
  // When
  I.amOnPage('/login');

  // Then
  I.fillField('아이디(계좌번호)', '352');
  I.fillField('비밀번호', 'password');
  I.click('로그인하기');
  I.see('로그아웃');
});

Scenario('로그인 폼에 잘못된 계정 정보 입력 후 로그인 시도', ({ I }) => {
  // When
  I.amOnPage('/login');

  // Then
  I.fillField('아이디(계좌번호)', 'wrongId');
  I.fillField('비밀번호', 'wrongPassword');
  I.click('로그인하기');
  I.see('아이디 혹은 비밀번호가 맞지 않습니다.');
});

Scenario('로그인 폼에 아이디 미입력 후 로그인 시도', ({ I }) => {
  // When
  I.amOnPage('/login');

  // Then
  I.fillField('비밀번호', 'password');
  I.click('로그인하기');
  I.see('아이디를 입력해주세요.');
});

Scenario('로그인 폼에 비밀번호 미입력 후 로그인 시도', ({ I }) => {
  // When
  I.amOnPage('/login');

  // Then
  I.fillField('아이디(계좌번호)', 'wrongId');
  I.click('로그인하기');
  I.see('비밀번호를 입력해주세요.');
});

// Scenario('로그인 폼에서 회원가입 페이지로 이동', ({ I }) => {
//   // When
//   I.amOnPage('/login');

//   // Then
//   I.see('USER LOGIN');
//   I.see('아이디(계좌번호)');
//   I.see('비밀번호');
//   I.see('로그인하기');
//   I.see('회원가입');
// });
