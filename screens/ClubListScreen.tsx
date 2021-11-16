import React, { useEffect, useState } from 'react'
import { StyleSheet, View, Text } from 'react-native'
import useFetch from '../hooks/useFetch'

export default function ClubListScreen() {
  const [clubs, setClubs] = useState([])

  const { data, loading, error } = useFetch('https://api.mpg.football/api/data/championship-clubs')

  useEffect(() => {
    if (data) {
      setClubs(Object.values(Object.values(data.championshipClubs)))
    }
  }, [data])

  return (
    <View style={styles.container}>
      <Text style={styles.title}>ClubListScreen</Text>
      {clubs.map((x) => (
        <Text key={x.id}>{x.id}</Text>
      ))}
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  separator: {
    marginVertical: 30,
    height: 1,
    width: '80%',
  },
})
