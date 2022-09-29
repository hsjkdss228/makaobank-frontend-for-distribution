import { Link } from 'react-router-dom';

export default function HomePage() {
  return (
    <div>
      <p>
        마카오뱅크에서
      </p>
      <p>촉촉한 금융습관을 들이세요.</p>
      <nav>
        <ul>
          <li>
            <Link to="/transfer">
              송금하기
            </Link>
          </li>
          <li>
            <Link to="/transactions">
              거래내역조회
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
