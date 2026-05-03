import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function Home() {
  const [recipes, setRecipes] = useState([]);


  useEffect(() => {
    fetch('http://localhost:8000/recipes')
      .then(response => response.json())
      .then(data => setRecipes(data)) 
      .catch(error => console.error('Грешка при зареждане:', error));
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h2>Нашите Рецепти</h2>
      
      <div style={{ display: 'flex', gap: '20px', flexWrap: 'wrap', justifyContent: 'center' }}>

        {recipes.map(recipe => (
          <Link to={`/recipe/${recipe.id}`} key={recipe.id} style={{ textDecoration: 'none', color: 'inherit' }}>
            <div style={{ border: '1px solid #ccc', padding: '15px', borderRadius: '8px', width: '300px', cursor: 'pointer' }}>
              <h3>{recipe.title}</h3>
              <img 
                src={recipe.image} 
                alt={recipe.title} 
                style={{ width: '100%', height: '200px', objectFit: 'cover', borderRadius: '8px' }} 
              />
              <p>{recipe.description}</p>
            </div>
          </Link>
        ))}

      </div>
    </div>
  );
}

export default Home;