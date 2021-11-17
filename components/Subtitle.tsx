import React, { ReactChild } from 'react'
import styled from 'styled-components/native'

const StyledSubtitle = styled.Text`
  font-weight: bold;
  font-size: 16px;
`

interface Props {
  children: ReactChild | ReactChild[]
}

export default function Subtitle({ children }: Props) {
  return <StyledSubtitle>{children}</StyledSubtitle>
}
