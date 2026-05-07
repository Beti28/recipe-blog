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
    <div style={{ 
      position: 'relative', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '20px', 
      minHeight: 'calc(100vh - 170px)', 
      boxSizing: 'border-box',
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1, 
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("/img/details-bg.png")',
        
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}></div>

      <div style={{ 
        maxWidth: '900px', 
        width: '100%',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '30px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)', 
        padding: '40px',
        marginTop: '20px', 
        marginBottom: '20px',
        backdropFilter: 'blur(5px)',
        zIndex: 1 
      }}>
        
        <div style={{ textAlign: 'left', marginBottom: '25px' }}>
          <Link to="/" style={{ 
            textDecoration: 'none', 
            color: '#636e72', 
            fontSize: '14px',
            display: 'flex',
            alignItems: 'center',
            gap: '5px'
          }}>
            <span style={{ fontSize: '20px' }}>&larr;</span> Обратно към всички рецепти
          </Link>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '40px', alignItems: 'center' }}>
          <img
            src={recipe.image}
            alt={recipe.title}
            style={{ 
              width: '100%', 
              height: '380px', 
              objectFit: 'cover', 
              borderRadius: '25px',
              boxShadow: '0 10px 20px rgba(0,0,0,0.08)'
            }}
          />

          <div style={{ 
            display: 'flex', 
            flexDirection: 'column', 
            textAlign: 'center', 
            alignItems: 'center' 
          }}>
            <h2 style={{ 
              fontSize: '2.5rem', 
              color: '#2d3436', 
              marginBottom: '20px', 
              marginTop: '0', 
              fontWeight: '700' 
            }}>
              {recipe.title}
            </h2>

            <p style={{ color: '#636e72', marginBottom: '30px', lineHeight: '1.7', fontSize: '1.05rem' }}>
              {recipe.description}
            </p>

            <div style={{ 
              fontSize: '14px', 
              marginBottom: '35px',
              padding: '10px 18px',
              backgroundColor: '#f8f9fa',
              borderRadius: '12px',
            }}>
              <span style={{ color: '#b2bec3' }}>Приготвено от:</span> 
              <span style={{ color: '#2d3436', fontWeight: 'bold', marginLeft: '5px' }}>
                {recipe.authorName || recipe.author || "Анонимен"}
              </span>
            </div>

            {isAuthor ? (
              <div style={{ 
                display: 'flex', 
                gap: '15px',
                justifyContent: 'center',
                width: '100%' 
              }}>
                <Link to={`/edit/${recipe.id}`} style={{
                  padding: '12px 25px',
                  backgroundColor: '#2d3436',
                  color: 'white',
                  textDecoration: 'none',
                  borderRadius: '12px',
                  fontWeight: '600'
                }}>
                  Редактирай
                </Link>
                <button onClick={handleDelete} style={{
                  padding: '12px 25px',
                  backgroundColor: '#fff',
                  color: '#ff6b6b',
                  border: '2px solid #ff6b6b',
                  borderRadius: '12px',
                  cursor: 'pointer',
                  fontWeight: '600'
                }}>
                  Изтрий
                </button>
              </div>
            ) : (
              <p style={{ fontStyle: 'italic', color: '#b2bec3', fontSize: '13px', margin: 0 }}>
                Вие разглеждате тази рецепта като гост.
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RecipeDetails;