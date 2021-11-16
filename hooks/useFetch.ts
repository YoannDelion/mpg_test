import { useEffect, useState } from 'react'

export default function useFetch(url: string) {
  const [data, setData] = useState()
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!url) return

    setLoading(true)

    async function fetchData() {
      try {
        const response = await fetch(url)
        if (!response.ok) {
          const { errorMessage } = await response.json()
          throw new Error(errorMessage)
        } else {
          const data = await response.json()
          setData(data)
        }
      } catch (error) {
        setError(error.message)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [url])

  return { data, loading, error }
}