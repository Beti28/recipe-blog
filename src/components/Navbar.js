import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  
  const user = JSON.parse(localStorage.getItem('user'));

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ display: 'flex', justifyContent: 'space-between', padding: '10px 20px', backgroundColor: '#f4f4f4', alignItems: 'center' }}>
      <h2 style={{ margin: 0 }}>Recipe Blog</h2>
      
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Link to="/">Начало</Link>

        {!user ? (
          <>
            <Link to="/login">Вход</Link>
            <Link to="/register">Регистрация</Link>
          </>
        ) : (
          <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
            <span style={{ fontWeight: 'bold', color: '#555' }}>Здравей, {user.username}!</span>
            <button 
              onClick={handleLogout} 
              style={{ padding: '5px 10px', cursor: 'pointer', border: '1px solid #333', borderRadius: '4px' }}
            >
              Изход
            </button>
          </div>
        )}
      </div>
    </nav>
  );
}

export default Navbar;