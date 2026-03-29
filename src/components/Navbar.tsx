import { NavLink } from 'react-router-dom';

export function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="brand">Painel Meteorológico</h2>

      <div className="nav-links">
        <NavLink to="/">Início</NavLink>
        <NavLink to="/about">Sobre</NavLink>
      </div>
    </nav>
  );
}