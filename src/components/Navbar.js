import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f8f9fa', borderBottom: '1px solid #ddd', alignItems: 'center' }}>

      <Link to="/" style={{ textDecoration: 'none', color: '#333' }}>
        <h1 style={{ margin: 0 }}>Recipe Blog</h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        
        {user ? (
          <>
            <Link to="/add-recipe" style={{ textDecoration: 'none', color: '#28a745', fontWeight: 'bold' }}>+ Добави рецепта</Link>
            <span style={{ color: '#666' }}>Здравей, {user.username}!</span>
            <button onClick={handleLogout} style={{ border: 'none', background: 'none', color: 'red', cursor: 'pointer', fontSize: '16px' }}>Изход</button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ textDecoration: 'none', color: '#333' }}>Вход</Link>
            <Link to="/register" style={{ textDecoration: 'none', color: '#333' }}>Регистрация</Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;