Feature('Home page');

Scenario('Visit the home page', ({ I }) => {
  // When
  I.amOnPage('/');

  // Then
  I.see('마카오뱅크에서');
  I.see('촉촉한 금융습관을 들이세요.');
});
