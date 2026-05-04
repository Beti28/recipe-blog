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
    <div style={{ padding: '20px' }}>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Всички Рецепти</h2>
      
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', 
        gap: '20px',
        maxWidth: '1200px',
        margin: '0 auto' 
      }}>
        {recipes.map(recipe => (
          <div key={recipe.id} style={{ 
            border: '1px solid #eee', 
            borderRadius: '10px', 
            overflow: 'hidden', 
            boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              style={{ width: '100%', height: '200px', objectFit: 'cover' }} 
            />
            <div style={{ padding: '15px' }}>
              <h3 style={{ margin: '0 0 10px 0' }}>{recipe.title}</h3>
              <p style={{ color: '#666', fontSize: '14px', height: '60px', overflow: 'hidden' }}>
                {recipe.description.substring(0, 100)}...
              </p>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
                <span style={{ fontSize: '12px', color: '#999' }}>от {recipe.authorName || 'Анонимен'}</span>
                <Link 
                  to={`/recipes/${recipe.id}`} 
                  style={{ 
                    textDecoration: 'none', 
                    color: '#007bff', 
                    fontWeight: 'bold',
                    fontSize: '14px' 
                  }}
                >
                  Виж повече →
                </Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;