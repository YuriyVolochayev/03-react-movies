import axios from "axios";
import { type Movie } from "../types/movie"; 

const BASE_URL = 'https://api.themoviedb.org/3/search/movie';
const myKey = import.meta.env.VITE_TMDB_TOKEN;

interface FetchMovies {
    results: Movie[]
}

export const fetchMovies = async (query: string): Promise<Movie[]> => {
    const configObj = {
        params: { query },
  headers: {
    Authorization: `Bearer ${myKey}`
  }
    }
    const response = await axios.get<FetchMovies>(BASE_URL, configObj);
    return response.data.results;
}
