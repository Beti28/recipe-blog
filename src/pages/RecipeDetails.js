import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams(); 
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error('Грешка при зареждане:', error));
  }, [id]);

  if (!recipe) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Зареждане...</p>;

  return (
    <div style={{ 
      maxWidth: '800px',
      margin: '20px auto', 
      padding: '30px', 
      backgroundColor: '#fff',
      borderRadius: '20px',
      boxShadow: '0 10px 30px rgba(0,0,0,0.08)',
      display: 'flex',
      flexDirection: 'column',
      gap: '20px'
    }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold', fontSize: '14px' }}>
        &larr; Назад към рецептите
      </Link>
      
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', alignItems: 'start' }}>
        <img 
          src={recipe.image} 
          alt={recipe.title} 
          style={{ 
            width: '100%', 
            height: '300px', 
            objectFit: 'cover', 
            borderRadius: '15px' 
          }} 
        />
        
        <div style={{ textAlign: 'left' }}>
          <h2 style={{ margin: '0 0 15px 0', fontSize: '2rem', color: '#2d3436' }}>{recipe.title}</h2>
          <p style={{ fontSize: '16px', lineHeight: '1.6', color: '#636e72' }}>
            {recipe.description}
          </p>
          <div style={{ marginTop: '20px', fontSize: '14px', color: '#b2bec3' }}>
            Автор: <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>{recipe.authorName || 'Анонимен'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
export default RecipeDetails;