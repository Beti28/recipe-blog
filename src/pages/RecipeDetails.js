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
    <div style={{ maxWidth: '600px', margin: '40px auto', padding: '20px', border: '1px solid #eee', borderRadius: '10px', boxShadow: '0 4px 8px rgba(0,0,0,0.1)' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>&larr; Назад към всички рецепти</Link>
      
      <h2 style={{ marginTop: '20px' }}>{recipe.title}</h2>
      <img 
        src={recipe.image} 
        alt={recipe.title} 
        style={{ 
          width: '100%', 
          height: '450px',
          objectFit: 'cover',
          borderRadius: '8px', 
          marginTop: '10px' 
        }}
      />
      <p style={{ fontSize: '18px', marginTop: '20px', lineHeight: '1.6' }}>{recipe.description}</p>
      
      {/* По-късно тук можем да добавим съставки, време за приготвяне и т.н. */}
    </div>
  );
}

export default RecipeDetails;