import styled from 'styled-components';

const InputArea = styled.div`
  margin-bottom: 1.5em;
  display: flex;
  flex-direction: column;
  input:focus {
    outline: none;
  }
  label {
    color: #A0A0A0;
    font-size: .6em;
  }
`;

export default InputArea;
