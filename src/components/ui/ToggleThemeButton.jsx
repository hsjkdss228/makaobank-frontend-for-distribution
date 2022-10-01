import styled from 'styled-components';

const ToggleThemeButton = styled.button`
  padding: 1em;
  border: none;
  background-color: transparent;
  background-image: url(${(props) => props.theme.icon.toggleButtonImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
  cursor: pointer;
`;

export default ToggleThemeButton;
