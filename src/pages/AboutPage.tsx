export default function AboutPage() {
  return (
    <section className="card">
      <h1>Sobre</h1>
      <p>
        Esta aplicação foi desenvolvida em React para consultar dados
        meteorológicos em tempo real usando a API OpenWeather.
      </p>
      <p>
        O projeto utiliza roteamento com React Router, contexto global para o
        tema, hook personalizado para requisições e divisão da interface em
        componentes reutilizáveis.
      </p>
    </section>
  );
}