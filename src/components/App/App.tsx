import { useState } from 'react'
import SearchBar from '../SearchBar/SearchBar'
import MovieGrid from '../MovieGrid/MovieGrid'
import Loader from '../Loader/Loader'
import ErrorMessage from '../ErrorMessage/ErrorMessage'
import MovieModal from '../MovieModal/MovieModal'
import toast, { Toaster } from 'react-hot-toast'
import { type Movie } from '../../types/movie'
import { fetchMovies } from '../../services/movieService'
import css from "./App.module.css"

export default function App() {
    const [hasError, setHasError] = useState<boolean>(false)
    const [currentMovie, setCurrentMovie] = useState<Movie | null>(null)
    const [isLoad, setIsLoad] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false);
    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const selectMovie = (movie: Movie) => {
        setCurrentMovie(movie)
        openModal()
    }

    const [movies, setMovies] = useState<Movie[]>([])

    const searchSubmit = async (query: string) => {
        setMovies([])
        setIsLoad(true)
        setHasError(false)

        try {
            const results = await fetchMovies(query)
            if (results.length === 0) {
                toast.error("No movies found for your request.")
                return
            }
            setMovies(results)
            
        } catch {
            setHasError(true)
        } finally {
            setIsLoad(false)
        }
    };
    return (
    <div className={css.app}>
            <Toaster />
            <SearchBar onSubmit={searchSubmit} />
            {isLoad && <Loader />}
            {hasError && <ErrorMessage />}
            {!isLoad && !hasError && movies.length > 0 && (
                <MovieGrid onSelect={selectMovie} movies={movies} />)}
            {isModalOpen && currentMovie && (
                <MovieModal onClose={closeModal} movie={currentMovie}/>
            )}
            
    </div>
)
};





