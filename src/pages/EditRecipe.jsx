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
      .catch(err => console.error("Грешка:", err));
  }, [id]);

  const handleEdit = (e) => {
    e.preventDefault();
    fetch(`http://localhost:8000/recipes/${id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, image, description })
    }).then(() => navigate(`/recipes/${id}`));
  };

  const inputStyle = {
    padding: '12px 18px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '12px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    outline: 'none',
    fontFamily: 'inherit'
  };

  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      minHeight: 'calc(100vh - 170px)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      boxSizing: 'border-box',

    }}>
      
      {/* ФОНОВ СЛОЙ */}
      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        // Използваме името edit-bg.png
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("/img/edit-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}></div>

      {/* КАРТА С ФОРМАТА */}
      <div style={{ 
        maxWidth: '500px', 
        width: '100%', 
        padding: '40px', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '30px', 
        boxShadow: '0 15px 35px rgba(0,0,0,0.1)',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        zIndex: 1
      }}>
        <h2 style={{ fontSize: '2rem', color: '#2d3436', marginBottom: '8px', marginTop: '0' }}>Редактиране</h2>
        <p style={{ color: '#636e72', marginBottom: '25px', fontSize: '15px' }}>Променете детайлите на рецептата</p>
        
        <form onSubmit={handleEdit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#636e72', marginLeft: '5px' }}>Заглавие</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required style={inputStyle} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#636e72', marginLeft: '5px' }}>Снимка (URL)</label>
            <input type="url" value={image} onChange={(e) => setImage(e.target.value)} required style={inputStyle} />
          </div>

          <div style={{ textAlign: 'left' }}>
            <label style={{ fontSize: '13px', fontWeight: '600', color: '#636e72', marginLeft: '5px' }}>Начин на приготвяне</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} required rows="5" style={{ ...inputStyle, resize: 'none' }}></textarea>
          </div>

          <button type="submit" style={{ 
            padding: '14px', 
            backgroundColor: '#2d3436', 
            color: 'white', 
            border: 'none', 
            borderRadius: '12px', 
            cursor: 'pointer', 
            fontSize: '16px',
            fontWeight: '600',
            marginTop: '5px',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            transition: 'all 0.3s ease'
          }}>
            Запази промените
          </button>
          
          <button type="button" onClick={() => navigate(-1)} style={{ background: 'none', border: 'none', color: '#b2bec3', cursor: 'pointer', fontSize: '14px', marginTop: '5px' }}>
            Отказ
          </button>
        </form>
      </div>
    </div>
  );
}

export default EditRecipe;