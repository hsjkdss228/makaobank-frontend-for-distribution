import styled from 'styled-components';

import Button from './Button';

const SubmitButton = styled(Button)`
  font-size: .7em;
  padding-block: 1em;
  width: ${(props) => props.theme.size.buttonWidth};
  background: ${(props) => props.theme.colors.button};
  color: #FFF;
`;

export default SubmitButton;
