import styled from 'styled-components';

import Button from './Button';

// TODO: 색이 아닌 border-radius를 조정해야 함 (메인 화면에 쓸 것임)

const SecondaryButton = styled(Button)`
  background: ${(props) => props.theme.colors.secondary};
  color: ${(props) => props.theme.colors.secondaryText};
`;

export default SecondaryButton;
