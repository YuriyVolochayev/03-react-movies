import toast from 'react-hot-toast';
import css from "./SearchBar.module.css";



interface SearchBarProps {
    onSubmit: (newQuery: string) => Promise<void>;
}

export default function SearchBar({onSubmit}: SearchBarProps) {
    const handleSearch = (formData: FormData) => {
        const query = formData.get("query") as string;

        if (query === "") {
            toast.error("Please enter your search query")
            return
        }

        onSubmit(query)

    }
    return (
        <header className={css.header}>
            <div className={css.container}>
                <a
                    className={css.link}
                    href="https://www.themoviedb.org/"
                    target="_blank"
                    rel="noopener noreferrer">
                    Powered by TMDB
                </a>
                <form action={handleSearch} className={css.form}>
                    <input
                        className={css.input}
                        type="text"
                        name="query"
                        autoComplete="off"
                        placeholder="Search movies..."
                        autoFocus
                    />
                    <button className={css.button} type="submit">
                        Search
                    </button>
                </form>
            </div>
        </header>

    )
}