import { useRef, useState, useMemo, useCallback } from 'react'
import { searchMovies } from '../services/movies'

export function useMovies({ search, sort }) {
  const [movies, setMovies] = useState([])
  const [loading, setLoanding] = useState(false)
  const [error, setError] = useState(null)
  const previusSerch = useRef(search)


  const getMovies = useCallback( async ({search}) => {
    if (search === previusSerch.current) return

    try {
      setLoanding(true) 
      setError(null)
      previusSerch.current = search
      const newMovies = await searchMovies({ search })
      setMovies(newMovies)
    } catch (e) {
      setError(e.message)
    } finally {
      setLoanding(false)
    }
  }, [])


  const sortedMovies = useMemo(()=>{
    console.log('MemoSortedMovies')

    return sort
    ? [...movies].sort((a, b) => a.title.localeCompare(b.title))
    : movies
  }, [sort, movies]) 
    

  return { movies: sortedMovies, getMovies, loading }
}