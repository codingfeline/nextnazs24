import useSwr from 'swr'

const fetcher = (url: string) => fetch(url).then(res => res.json())

const useFetch = (url: string) => {
  const { data, error } = useSwr(url, fetcher)

  return {
    data,
    loading: !error && !data,
    error: error,
  }
}

export default useFetch
