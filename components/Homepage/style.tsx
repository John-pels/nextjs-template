import styled from 'styled-components'

export const Container = styled.section`
  display: flex;
  justify-content: center;
  align-items: center;
  background: ${({ theme }) => theme.colors.primary};
  height: 100vh;
`

export const HeroText = styled.h1`
  color: ${({ theme }) => theme.colors.default};
  font-family: ${({ theme }) => theme.fontFamily.josefin};
  font-size: ${({ theme }) => theme.fontSize.custom(60)};
`

export const Image = styled.img``
