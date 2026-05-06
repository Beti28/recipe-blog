import { Link, useNavigate } from 'react-router-dom';

function Navbar() {
  const navigate = useNavigate();
  const userString = localStorage.getItem('user');
  
  let user = null;
  if (userString) {
    try {
      user = JSON.parse(userString);
    } catch (e) {
      user = null;
    }
  }

  const handleLogout = () => {
    localStorage.removeItem('user');
    navigate('/login');
  };

  return (
    <nav style={{ 
      display: 'flex', 
      justifyContent: 'space-between', 
      padding: '20px 40px', 
      backgroundColor: '#f8f9fa', 
      borderBottom: '1px solid #f0f0f0', 
      alignItems: 'center',
      fontFamily: "'Segoe UI', Roboto, sans-serif",
      position: 'sticky',
      top: 0,
      zIndex: 1000
    }}>
      
      <Link to="/" style={{ textDecoration: 'none', color: '#2d3436' }}>
        <h1 style={{ 
          margin: 0, 
          fontSize: '1.5rem', 
          fontWeight: '800',
          letterSpacing: '-0.5px'
        }}>
          Recipe <span style={{ color: '#ff6b6b' }}>Blog</span>
        </h1>
      </Link>
      
      <div style={{ display: 'flex', gap: '25px', alignItems: 'center' }}>
        
        {user ? (
          <>
            <Link to="/add-recipe" style={{ 
              textDecoration: 'none', 
              color: '#2ecc71', 
              fontWeight: '600',
              fontSize: '14px',
              transition: 'opacity 0.2s'
            }}>
              + Добави рецепта
            </Link>
            
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '10px',
              padding: '5px 15px',
              backgroundColor: '#f8f9fa',
              borderRadius: '20px'
            }}>
              <span style={{ color: '#636e72', fontSize: '14px' }}>Здравей,</span>
              <span style={{ color: '#2d3436', fontWeight: 'bold', fontSize: '14px' }}>
                {user.username || "Готвач"}
              </span>
            </div>

            <button onClick={handleLogout} style={{ 
              border: 'none', 
              background: 'none', 
              color: '#ff6b6b', 
              cursor: 'pointer', 
              fontSize: '14px',
              fontWeight: '600',
              padding: '0',
              marginLeft: '5px'
            }}>
              Изход
            </button>
          </>
        ) : (
          <>
            <Link to="/login" style={{ 
              textDecoration: 'none', 
              color: '#2d3436', 
              fontSize: '14px', 
              fontWeight: '600' 
            }}>
              Вход
            </Link>
            <Link to="/register" style={{ 
              textDecoration: 'none', 
              color: '#ffffff', 
              fontSize: '14px', 
              fontWeight: '600',
              backgroundColor: '#2d3436',
              padding: '8px 20px',
              borderRadius: '12px',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}>
              Регистрация
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;