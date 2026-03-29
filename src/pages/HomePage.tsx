import { SearchBar } from '../components/SearchBar';

export function HomePage() {
  return (
    <section className="card">
      <h1>Buscar clima</h1>
      <p>Digite o nome de uma cidade para ver a previsão atual.</p>
      <SearchBar />
    </section>
  );
}