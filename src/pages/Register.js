import { useFormik } from 'formik';
import * as Yup from 'yup';

function Register() {
  const formik = useFormik({
    initialValues: {
      username: '',
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      username: Yup.string()
        .min(3, 'Името трябва да е поне 3 символа')
        .required('Потребителското име е задължително'),
      email: Yup.string()
        .email('Невалиден имейл адрес (трябва да съдържа @)')
        .required('Имейлът е задължителен'),
      password: Yup.string()
        .min(6, 'Паролата трябва да е поне 6 символа')
        .required('Паролата е задължителна'),
    }),
    onSubmit: (values) => {
      fetch('http://localhost:8000/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(values)
      })
      .then(response => response.json())
      .then(savedUser => {
        alert('Регистрацията е успешна! Вече сте вписани.');
        localStorage.setItem('user', JSON.stringify(savedUser));
        window.location.href = "/";
      })
      .catch(error => console.error('Грешка при регистрация:', error));
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Регистрация</h2>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
        <div>
          <input 
            type="text" 
            name="username" 
            placeholder="Потребителско име" 
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          {formik.touched.username && formik.errors.username ? (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.username}</div>
          ) : null}
        </div>

        <div>
          <input 
            type="email" 
            name="email" 
            placeholder="Имейл" 
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          {formik.touched.email && formik.errors.email ? (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.email}</div>
          ) : null}
        </div>

        <div>
          <input 
            type="password" 
            name="password" 
            placeholder="Парола" 
            value={formik.values.password}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            style={{ padding: '10px', fontSize: '16px', width: '100%', boxSizing: 'border-box' }}
          />
          {formik.touched.password && formik.errors.password ? (
            <div style={{ color: 'red', fontSize: '14px', marginTop: '5px' }}>{formik.errors.password}</div>
          ) : null}
        </div>

        <button 
          type="submit" 
          disabled={!formik.isValid || !formik.dirty} 
          style={{ 
            padding: '10px', 
            backgroundColor: (!formik.isValid || !formik.dirty) ? '#ccc' : '#333', 
            color: 'white', 
            border: 'none', 
            borderRadius: '5px', 
            cursor: (!formik.isValid || !formik.dirty) ? 'not-allowed' : 'pointer', 
            fontSize: '16px' 
          }}
        >
          Регистрирай ме
        </button>
      </form>
    </div>
  );
}

export default Register;