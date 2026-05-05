import { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';

function RecipeDetails() {
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);
  const navigate = useNavigate();

  const storedUser = localStorage.getItem('user');
  let currentUser = null;

  if (storedUser) {
    try {
      const parsedUser = JSON.parse(storedUser);
      currentUser = parsedUser.username;
    } catch (e) {
      currentUser = storedUser;
    }
  }

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/${id}`)
      .then(response => response.json())
      .then(data => setRecipe(data))
      .catch(error => console.error('Грешка при зареждане:', error));
  }, [id]);

  const handleDelete = () => {
    if (window.confirm("Сигурни ли сте, че искате да изтриете тази рецепта?")) {
      fetch(`http://localhost:8000/recipes/${id}`, { method: 'DELETE' })
        .then(() => navigate('/'))
        .catch(err => console.error("Грешка:", err));
    }
  };

  if (!recipe) return <p style={{ textAlign: 'center', marginTop: '50px' }}>Зареждане...</p>;

  const isAuthor = currentUser === recipe.authorName;

  return (
    <div style={{ maxWidth: '800px', margin: '20px auto', padding: '30px', backgroundColor: '#fff', borderRadius: '20px', boxShadow: '0 10px 30px rgba(0,0,0,0.08)' }}>
      <Link to="/" style={{ textDecoration: 'none', color: '#007BFF', fontWeight: 'bold' }}>&larr; Назад към рецептите</Link>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginTop: '20px' }}>

        <img
          src={recipe.image}
          alt={recipe.title}
          style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '15px' }}
        />

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <h2 style={{ fontSize: '2rem', marginBottom: '10px', marginTop: '0' }}>{recipe.title}</h2>
          <p style={{ color: '#636e72', marginBottom: '20px', flexGrow: 1 }}>{recipe.description}</p>

          <div style={{ fontSize: '14px', marginBottom: '20px' }}>
            Автор: <span style={{ color: '#ff6b6b', fontWeight: 'bold' }}>
              {recipe.authorName || recipe.author || "Анонимен"}
            </span>
          </div>

          {isAuthor ? (
            <div style={{
              display: 'flex',
              gap: '10px',
              justifyContent: 'center', 
              marginTop: '20px'        
            }}>
              <Link to={`/edit/${recipe.id}`} style={{
                padding: '10px 20px',
                backgroundColor: '#f39c12',
                color: 'white',
                textDecoration: 'none',
                borderRadius: '8px',
                fontWeight: 'bold'
              }}>
                Редактирай
              </Link>
              <button onClick={handleDelete} style={{
                padding: '10px 20px',
                backgroundColor: '#e74c3c',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                fontWeight: 'bold'
              }}>
                Изтрий
              </button>
            </div>
          ) : (

            <p style={{
              fontStyle: 'italic',
              color: '#b2bec3',
              fontSize: '12px',
              textAlign: 'center', 
              margin: 0
            }}>
              (Само авторът може да редактира тази рецепта)
            </p>
          )}

        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;