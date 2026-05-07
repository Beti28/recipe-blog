import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);

  useEffect(() => {
    fetch('http://localhost:8000/recipes')
      .then(res => res.json())
      .then(data => setRecipes(data))
      .catch(err => console.error("Грешка при зареждане:", err));
  }, []);

  return (
    <div style={{ position: 'relative', width: '100%', flex: '1 0 auto', display: 'flex', flexDirection: 'column' }}>
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: -1,
        backgroundImage: "linear-gradient(rgba(255, 255, 255, 0.3), rgba(255, 255, 255, 0.3)), url('/img/home-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}></div>

      <main style={{ padding: '40px 20px' }}>
        <h2 style={{ 
          textAlign: 'center', 
          fontSize: '2.8rem', 
          color: '#2d3436',
          fontWeight: '800',
          margin: '0 0 40px 0',
          textShadow: '0 2px 4px rgba(255,255,255,0.8)'
        }}>
          Всички Рецепти
        </h2>
        
        <div className="recipe-grid">
          {recipes.map(recipe => (
            <div key={recipe.id} className="recipe-card">
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                style={{ width: '100%', height: '220px', objectFit: 'cover' }}
              />
              <div style={{ padding: '25px', textAlign: 'left' }}>
                <h3 style={{ margin: '0 0 10px 0', color: '#2d3436' }}>{recipe.title}</h3>
                <p style={{ color: '#636e72', fontSize: '0.95rem', height: '60px', overflow: 'hidden' }}>
                  {recipe.description.substring(0, 90)}...
                </p>
                <div style={{ 
                  display: 'flex', 
                  justifyContent: 'space-between', 
                  alignItems: 'center',
                  marginTop: '20px',
                  paddingTop: '15px',
                  borderTop: '1px solid #f1f1f1'
                }}>
                  <span style={{ fontSize: '0.85rem', color: '#b2bec3' }}>
                    от <b style={{ color: '#ff6b6b' }}>{recipe.authorName || 'Анонимен'}</b>
                  </span>
                  <Link to={`/recipes/${recipe.id}`} style={{ textDecoration: 'none', color: '#2d3436', fontWeight: '700' }}>
                    Виж повече →
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </main>
    </div>
  );
}

export default Home;