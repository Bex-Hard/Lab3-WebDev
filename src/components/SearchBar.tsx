type SearchBarProps = {
  query: string;
  onQueryChange: (value: string) => void;
  onSearch: () => void;
};

export function SearchBar({
  query,
  onQueryChange,
  onSearch,
}: SearchBarProps) {
  const handleSubmit = (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();
    onSearch();
  };

  return (
    <form className="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        value={query}
        onChange={(event: React.ChangeEvent<HTMLInputElement>) =>
          onQueryChange(event.target.value)
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