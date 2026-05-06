import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

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

  const inputStyle = {
    padding: '15px 20px',
    fontSize: '16px',
    width: '100%',
    boxSizing: 'border-box',
    borderRadius: '15px',
    border: '1px solid #eee',
    backgroundColor: '#f9f9f9',
    outline: 'none'
  };

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      flex: 1,
      fontFamily: "'Segoe UI', Roboto, sans-serif"
    }}>
      <div style={{ 
        maxWidth: '450px', 
        width: '100%', 
        padding: '50px', 
        backgroundColor: '#ffffff',
        borderRadius: '30px', 
        boxShadow: '0 20px 40px rgba(0,0,0,0.05)',
        textAlign: 'center'
      }}>
        <h2 style={{ fontSize: '2.2rem', color: '#2d3436', marginBottom: '10px', marginTop: '0' }}>Регистрация</h2>
        <p style={{ color: '#b2bec3', marginBottom: '30px' }}>Присъединете се към нашата общност</p>

        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input 
              type="text" 
              name="username" 
              placeholder="Потребителско име" 
              {...formik.getFieldProps('username')}
              style={inputStyle}
            />
            {formik.touched.username && formik.errors.username ? (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left', paddingLeft: '10px' }}>{formik.errors.username}</div>
            ) : null}
          </div>

          <div>
            <input 
              type="email" 
              name="email" 
              placeholder="Имейл адрес" 
              {...formik.getFieldProps('email')}
              style={inputStyle}
            />
            {formik.touched.email && formik.errors.email ? (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left', paddingLeft: '10px' }}>{formik.errors.email}</div>
            ) : null}
          </div>

          <div>
            <input 
              type="password" 
              name="password" 
              placeholder="Парола" 
              {...formik.getFieldProps('password')}
              style={inputStyle}
            />
            {formik.touched.password && formik.errors.password ? (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left', paddingLeft: '10px' }}>{formik.errors.password}</div>
            ) : null}
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
              marginTop: '10px'
            }}
          >
            Създай профил
          </button>
        </form>

        <p style={{ marginTop: '25px', color: '#636e72', fontSize: '14px' }}>
          Вече имате профил? <Link to="/login" style={{ color: '#ff6b6b', fontWeight: 'bold', textDecoration: 'none' }}>Влезте тук</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;