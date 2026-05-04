import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function AddRecipe() {
  const navigate = useNavigate();
  
  // Проверяваме дали има логнат потребител
  const userString = localStorage.getItem('user');
  const user = userString ? JSON.parse(userString) : null;

  // Инициализираме Formik
  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      image: '',
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .required('Заглавието е задължително'),
      description: Yup.string()
        .min(10, 'Описанието трябва да е поне 10 символа')
        .required('Описанието е задължително'),
      image: Yup.string()
        .url('Трябва да е валиден URL линк (започващ с http/https)')
        .required('Линкът към снимката е задължителен'),
    }),
    onSubmit: (values) => {
      // Създаваме обекта, който ще пратим към базата, като добавяме и автора
      const newRecipe = {
        title: values.title,
        description: values.description,
        image: values.image,
        authorId: user.id, // Важно: записваме кой е създал рецептата
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
        navigate('/'); // Връщаме потребителя на началната страница
      })
      .catch(error => console.error('Грешка при добавяне:', error));
    },
  });

  // Ако някой се опита да влезе тук без да е логнат, му показваме съобщение
  if (!user) {
    return (
      <div style={{ textAlign: 'center', marginTop: '50px' }}>
        <h2>Опа!</h2>
        <p>Моля, влезте в профила си, за да добавяте рецепти.</p>
      </div>
    );
  }

  return (
    <div style={{ maxWidth: '500px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Добави нова рецепта</h2>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <input 
            type="text" 
            name="title" 
            placeholder="Заглавие на рецептата (напр. Домашна пица)" 
            value={formik.values.title}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          {formik.touched.title && formik.errors.title ? (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.title}</div>
          ) : null}
        </div>

        <div>
          <textarea 
            name="description" 
            placeholder="Начин на приготвяне и съставки..." 
            rows="5"
            value={formik.values.description}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box', resize: 'vertical' }}
          />
          {formik.touched.description && formik.errors.description ? (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.description}</div>
          ) : null}
        </div>

        <div>
          <input 
            type="text" 
            name="image" 
            placeholder="Линк към снимка (URL)" 
            value={formik.values.image}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          {formik.touched.image && formik.errors.image ? (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.image}</div>
          ) : null}
        </div>

        <button 
          type="submit" 
          disabled={!formik.isValid || !formik.dirty} 
          style={{ 
            padding: '10px', 
            backgroundColor: (!formik.isValid || !formik.dirty) ? '#ccc' : '#28a745', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: (!formik.isValid || !formik.dirty) ? 'not-allowed' : 'pointer', 
            fontSize: '16px',
            fontWeight: 'bold'
          }}
        >
          Публикувай рецептата
        </button>
      </form>
    </div>
  );
}

export default AddRecipe;