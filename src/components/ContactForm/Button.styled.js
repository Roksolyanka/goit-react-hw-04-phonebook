import styled from 'styled-components';

export const Button = styled.button`
  background-color: #4a0404;
  color: rgba(205, 127, 50, 1);
  font-size: 25px;
  border: none;
  border-radius: 10px;
  padding: 15px;
  max-height: auto;
  max-width: 200px;
  margin: 10px auto;

  &: hover {
    outline-color: transparent;
    outline-style: solid;
    box-shadow: 0 0 0 4px #fff;
    transition: 0.7s;
  }
`;
