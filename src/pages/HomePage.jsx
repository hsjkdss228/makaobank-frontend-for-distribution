export default function HomePage({ handleLogin }) {
  return (
    <div>
      <p>
        마카오뱅크에서
      </p>
      <p>촉촉한 금융습관을 들이세요.</p>
      <button
        type="button"
        onClick={handleLogin}
      >
        로그인
      </button>
    </div>
  );
}
