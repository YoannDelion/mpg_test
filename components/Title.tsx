import React, { ReactChild } from 'react'
import styled from 'styled-components/native'

const StyledTitle = styled.Text`
  font-weight: bold;
  font-size: 18px;
`

interface Props {
  children: ReactChild | ReactChild[]
}

export default function Title({ children }: Props) {
  return <StyledTitle>{children}</StyledTitle>
}
