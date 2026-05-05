import { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

function EditRecipe() {
  const { id } = useParams();
  const navigate = useNavigate();
  
  const [title, setTitle] = useState('');
  const [image, setImage] = useState('');
  const [description, setDescription] = useState('');

  useEffect(() => {
    fetch(`http://localhost:8000/recipes/${id}`)
      .then(res => res.json())
      .then(data => {
        setTitle(data.title);
        setImage(data.image);
        setDescription(data.description);
      })
      .catch(err => console.error("Грешка при зареждане:", err));
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();

    const updatedRecipe = { title, image, description };

    fetch(`http://localhost:8000/recipes/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updatedRecipe)
    }).then(() => {
      navigate(`/recipes/${id}`);
    });
  };

  return (
    <div className="form-container" style={{ maxWidth: '400px', margin: '40px auto', padding: '30px', background: '#fff', borderRadius: '15px', boxShadow: '0 4px 15px rgba(0,0,0,0.1)' }}>
      <h2 style={{ textAlign: 'center', color: '#2d3436' }}>Редактирай Рецепта</h2>
      <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <input 
          type="url" 
          value={image} 
          onChange={(e) => setImage(e.target.value)} 
          required 
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        />
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
          rows="5"
          style={{ padding: '10px', borderRadius: '8px', border: '1px solid #ccc' }}
        ></textarea>
        <button type="submit" style={{ padding: '12px', background: '#f39c12', color: 'white', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>
          Запази Промените
        </button>
      </form>
    </div>
  );
}

export default EditRecipe;