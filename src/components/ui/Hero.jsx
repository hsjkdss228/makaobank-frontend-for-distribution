import styled from 'styled-components';

const Hero = styled.div`
  position: absolute;
  top: 30%;
  left: 55%;
  width: 60vh;
  height: 51vh;
  border: none;
  background-color: transparent;
  background-image: url(${(props) => props.theme.image.heroImage});
  background-size: contain;
  background-repeat: no-repeat;
  background-position: center;
`;

export default Hero;
