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
`

export const Profile = styled.div`
  display: flex;
  align-items: center;

  //apenas a img do componente Profile
  > img {
    width: 56px;
    height: 56px;
    border-radius: 50%;
  }

  > div {
    display: flex;
    flex-direction: column;
    margin-left: 16px;
    line-height: 24px;

    span {
      font-size: 14px;
      color: ${({ theme }) => theme.COLORS.GRAY_100};
    }

    strong {
      font-size: 18px;
      color: ${({ theme }) => theme.COLORS.WHITE};
    }
  }
`