import styled from 'styled-components';

const Input = styled.input`
  font-size: .8em;
  width: 22em;
  padding: .8em .6em;
  border: ${(props) => (props.hasError ? '1px solid #F00' : '1px solid #A79FFF')};
  margin-block: .3em;
`;

export default Input;
