import { useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: Yup.object({
      email: Yup.string()
        .email('Невалиден имейл адрес (трябва да съдържа @)')
        .required('Имейлът е задължителен'),
      password: Yup.string()
        .min(6, 'Паролата трябва да е поне 6 символа')
        .required('Паролата е задължителна'),
    }),
    onSubmit: (values) => {
      fetch(`http://localhost:8000/users?email=${values.email}&password=${values.password}`)
        .then(response => response.json())
        .then(users => {
          if (users.length > 0) {
            alert('Успешно влязохте в профила си!');
            localStorage.setItem('user', JSON.stringify(users[0]));
            window.location.href = "/"; 
          } else {
            alert('Грешен имейл или парола!');
          }
        })
        .catch(error => console.error('Грешка при вход:', error));
    },
  });

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Вход</h2>
      <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        
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

        <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Влез
        </button>
      </form>
    </div>
  );
}

export default Login;