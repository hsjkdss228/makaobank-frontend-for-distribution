import styled from 'styled-components';

import Button from './Button';

// TODO: 색이 아닌 border-radius를 조정해야 함 (메인 화면에 쓸 것임)

const HeaderButton = styled(Button)`
  font-size: .7em;
  padding: .8em 4em;
  background: rgba(255, 255, 255, 0.2);
  color: #FFF;
`;

export default HeaderButton;
