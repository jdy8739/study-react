import styled, { keyframes } from "styled-components";

const Emoji = styled.span`
  font-size: 40px;
  transition: all 1s;
`;

const Anime = keyframes`
  0% {
    transform: rotate(0deg);
  }
  100% {
    transform: rotate(360deg);
    background-color: orange;
  }
`;

const RotateBox = styled.a`
  width: 100px;
  height: 100px;
  background-color: teal;
  display: flex;
  justify-content: center;
  align-items: center;
  &:hover {
    animation: ${ Anime } 3s;
  }
  ${ Emoji } {
    &:hover {
      transform: scale(2);
    }
  }
`;

const Title = styled.h1`
  color: ${ props => props.theme.textColor };
`;

function App() {
  return (
    <div className="App">
      <RotateBox as='div'>
        <Emoji>😗</Emoji>
      </RotateBox>
      <Title>Hello</Title>
    </div>
  );
}

export default App;
