import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import toast, { Toaster } from 'react-hot-toast'
import { type Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import css from "./App.module.css"

export default function App() {
    const [hasError, setHasError] = useState<boolean>(false)
    const [movies, setMovies] = useState<Movie[]>([])
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    const selectMovie = (movie: Movie) => {
        setCurrentMovie(movie)
    }

    const searchSubmit = async (query: string) => {
        
        setHasError(false)
        setMovies([])

        try {
            const results = await fetchMovies(query)
            if (results.length === 0) {
                toast.error("No movies found for your request.")
                return
            }
            setMovies(results)
            
        } catch {
            setHasError(true)
        }
    }
    return (
    <div className={css.app}>
        <Toaster />
            <SearchBar onSubmit={searchSubmit} />
            <MovieGrid onSelect={selectMovie} movies={movies}/>
    </div>
)
};





