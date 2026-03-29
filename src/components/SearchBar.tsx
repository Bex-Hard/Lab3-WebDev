import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export function SearchBar() {
  const [query, setQuery] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    const trimmedQuery = query.trim();

    if (!trimmedQuery) return;

    navigate(`/forecast/${encodeURIComponent(trimmedQuery)}`);
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          setQuery(event.target.value)
        }
        placeholder="Digite uma cidade"
        className="search-input"
      />

      <button type="submit" className="primary-button">
        Buscar
      </button>
    </form>
  );
}