import React from 'react'
import { ActivityIndicator } from 'react-native'
import styled from 'styled-components/native'
import Title from './Title'

const LoaderContainer = styled.View`
  flex: 1;
  justify-content: center;
  align-items: center;
`

export default function Loader() {
  return (
    <LoaderContainer>
      <ActivityIndicator size='large' color='green' />
    </LoaderContainer>
  )
}
