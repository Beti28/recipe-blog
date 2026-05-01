import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px', backgroundColor: '#f4f4f4' }}>
      <h2>Recipe Blog</h2>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/">Начало</Link>
        <Link to="/login">Вход</Link>
        <Link to="/register">Регистрация</Link>
      </div>
    </nav>
  );
}

export default Navbar;