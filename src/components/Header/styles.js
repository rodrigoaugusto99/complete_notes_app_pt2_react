import styled from 'styled-components'

export const Container = styled.header`
//cabecalho fixo
  grid-area: header;

  //altura do cabecalho
  height: 105px;
  width: 100%;

  //bordinha em baixo
  border-bottom-width: 1px;
  border-bottom-style: solid;
  border-bottom-color: ${({ theme }) => theme.COLORS.BACKGROUND_700};

  display: flex;
  //elementos na horizontal cada uma na extremidade
  justify-content: space-between;

  padding: 0 80px;

  background: red;
`