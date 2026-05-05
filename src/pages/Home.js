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
    <main>
      <h2 style={{ textAlign: 'center', marginBottom: '30px' }}>Всички Рецепти</h2>
      
      <div className="recipe-grid">
        {recipes.map(recipe => (
          <div key={recipe.id} className="recipe-card">
            <img 
              src={recipe.image} 
              alt={recipe.title} 
              className="recipe-image"
            />
            <div className="recipe-content">
              <h3>{recipe.title}</h3>
              <p className="recipe-description">
                {recipe.description.substring(0, 90)}...
              </p>
              <div className="recipe-footer">
                <span className="author-tag">от {recipe.authorName || 'Анонимен'}</span>
                <Link to={`/recipes/${recipe.id}`} className="view-btn">Виж повече →</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}

export default Home;