import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddRecipe() {
  const navigate = useNavigate();
  
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
    },
    validationSchema: Yup.object({
      title: Yup.string().required('Заглавието е задължително'),
      description: Yup.string()
        .min(10, 'Описанието трябва да е поне 10 символа')
        .required('Описанието е задължително'),
      image: Yup.string()
        .url('Трябва да е валиден URL линк')
        .required('Линкът към снимката е задължителен'),
    }),
    onSubmit: (values) => {
      const newRecipe = {
        title: values.title,
        description: values.description,
        image: values.image,
        authorId: user.id,
        authorName: user.username
      };

      fetch('http://localhost:8000/recipes', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newRecipe)
      })
      .then(response => response.json())
      .then(() => {
        alert('Рецептата е добавена успешно!');
        navigate('/'); 
      })
      .catch(error => console.error('Грешка при добавяне:', error));
    },
  });

  const inputStyle = {
    padding: '15px 20px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '15px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    outline: 'none',
  };

  const backgroundStyle = {
    position: 'fixed',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    zIndex: -1, 
    backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.2), rgba(255, 255, 255, 0.2)), url("/img/addrecipe-bg.png")', 
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    backgroundRepeat: 'no-repeat'
  };

  if (!user) {
    return (
      <div style={{ 
        position: 'relative',
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: 'calc(100vh - 80px)',
        padding: '40px 20px',
        boxSizing: 'border-box',
      }}>
        <div style={backgroundStyle}></div>

        <div style={{ maxWidth: '450px', width: '100%', padding: '50px', backgroundColor: 'rgba(255, 255, 255, 0.95)', borderRadius: '30px', boxShadow: '0 20px 40px rgba(0,0,0,0.1)', textAlign: 'center', backdropFilter: 'blur(5px)' }}>
          <h2 style={{ fontSize: '2.2rem', color: '#2d3436' }}>Опа!</h2>
          <p style={{ color: '#636e72' }}>Моля, влезте в профила си, за да добавяте рецепти.</p>
        </div>
      </div>
    );
  }

  return (
    <div style={{ 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column',
      justifyContent: 'center', 
      alignItems: 'center', 
      minHeight: 'calc(100vh - 170px)',
      boxSizing: 'border-box',
    }}>

      <div style={backgroundStyle}></div>

      <div style={{ 
        maxWidth: '550px',
        width: '100%', 
        padding: '50px', 
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '30px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.1)',
        textAlign: 'center',
        backdropFilter: 'blur(5px)',
        zIndex: 1,
      }}>
        <h2 style={{ fontSize: '2.2rem', color: '#2d3436', marginBottom: '10px', marginTop: '0' }}>Нова рецепта</h2>
        <p style={{ color: '#636e72', marginBottom: '30px' }}>Споделете вашите кулинарни магии!</p>
        
        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div>
            <input 
              type="text" 
              name="title" 
              placeholder="Заглавие на рецептата" 
              {...formik.getFieldProps('title')} 
              style={inputStyle} 
            />
            {formik.touched.title && formik.errors.title && (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left', paddingLeft: '10px' }}>{formik.errors.title}</div>
            )}
          </div>

          <div>
            <input 
              type="text" 
              name="image" 
              placeholder="Линк към снимка (URL)" 
              {...formik.getFieldProps('image')} 
              style={inputStyle} 
            />
            {formik.touched.image && formik.errors.image && (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left', paddingLeft: '10px' }}>{formik.errors.image}</div>
            )}
          </div>

          <div>
            <textarea 
              name="description" 
              placeholder="Начин на приготвяне и съставки..." 
              rows="6"
              {...formik.getFieldProps('description')} 
              style={{ ...inputStyle, resize: 'vertical', fontFamily: 'inherit' }} 
            />
            {formik.touched.description && formik.errors.description && (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left', paddingLeft: '10px' }}>{formik.errors.description}</div>
            )}
          </div>

          <button 
            type="submit" 
            disabled={!formik.isValid || !formik.dirty}
            style={{ 
              padding: '15px', 
              backgroundColor: (!formik.isValid || !formik.dirty) ? '#dfe6e9' : '#2d3436', 
              color: 'white', 
              border: 'none', 
              borderRadius: '15px', 
              cursor: (!formik.isValid || !formik.dirty) ? 'not-allowed' : 'pointer', 
              fontSize: '16px',
              fontWeight: '600',
              boxShadow: (!formik.isValid || !formik.dirty) ? 'none' : '0 10px 20px rgba(0,0,0,0.1)',
              marginTop: '10px',
              transition: 'all 0.3s ease'
            }}
          >
            Публикувай рецептата
          </button>
        </form>
      </div>
    </div>
  );
}

export default AddRecipe;