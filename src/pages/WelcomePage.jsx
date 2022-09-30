import { Link } from 'react-router-dom';

import useBankStore from '../hooks/useBankStore';

export default function WelcomePage() {
  const bankStore = useBankStore();

  return (
    <div>
      <p>
        회원가입이 완료되었습니다.
      </p>
      <h2>
        환영합니다!
        {' '}
        {bankStore.createdUserName}
        {' '}
        님!
      </h2>
      <nav>
        <ul>
          <li>
            <Link to="/">
              홈으로
            </Link>
          </li>
          <li>
            <Link to="/login">
              로그인하기
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
