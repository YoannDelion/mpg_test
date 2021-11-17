import React from 'react'
import styled from 'styled-components/native'
import Title from './Title'

const ErrorContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function Error() {
  return (
    <ErrorContainer>
      <Title>Une erreur est survenue</Title>
    </ErrorContainer>
  )
}
