/* global actor */

// in this file you can append custom step methods to 'I' object

const backdoorBaseUrl = 'http://localhost:8000/backdoor';

module.exports = () => actor({
  // Define custom steps here, use 'this' to access default methods of I.
  // It is recommended to place a general 'login' function here.
  setupDatabase() {
    this.amOnPage(`${backdoorBaseUrl}/setup-database`);
  },

  changeAmount({ userId, amount }) {
    this.amOnPage([
      backdoorBaseUrl,
      '/change-amount',
      `?userId=${userId}&amount=${amount}`,
    ].join(''));
  },

  transfer({ to, amount, name }) {
    this.click('송금');
    this.fillField('받는 분 계좌번호:', to);
    this.fillField('보낼금액(원):', amount);
    this.fillField('받는 분 통장 표시:', name);
    this.click('보내기');

    // Then
    // this.see('송금 진행중...');
    // this.limitTime(2).see('계좌 이체에 성공했습니다.');
    this.see('계좌 이체에 성공했습니다.');
  },

  login(accountNumber) {
    this.amOnPage('/login');
    this.fillField('아이디(계좌번호)', accountNumber);
    this.fillField('비밀번호', 'password');
    // this.click('로그인하기');
    this.click('[type=submit]');
    this.see('로그아웃');
  },

  logout() {
    this.click('로그아웃');
    this.see('로그인');
  },
});
