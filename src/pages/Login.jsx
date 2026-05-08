import { useNavigate, Link } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';

function Login() {
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: { email: '', password: '' },
    validationSchema: Yup.object({
      email: Yup.string().email('Невалиден имейл').required('Задължителен'),
      password: Yup.string().min(6, 'Минимум 6 символа').required('Задължителен'),
    }),
    onSubmit: (values) => {
      fetch(`http://localhost:8000/users?email=${values.email}&password=${values.password}`)
        .then(response => response.json())
        .then(users => {
          if (users.length > 0) {
            localStorage.setItem('user', JSON.stringify(users[0]));
            window.location.href = "/";
          } else {
            alert('Грешен имейл или парола!');
          }
        });
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

      <div style={{
        position: 'fixed',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        zIndex: -1,
        backgroundImage: 'linear-gradient(rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0.1)), url("/img/login-bg.png")',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat'
      }}></div>

      <div style={{
        maxWidth: '450px',
        width: '100%',
        padding: '50px',
        backgroundColor: 'rgba(255, 255, 255, 0.95)',
        borderRadius: '30px',
        boxShadow: '0 20px 40px rgba(0,0,0,0.08)',
        textAlign: 'center',
        backdropFilter: 'blur(8px)',
      }}>
        <h2 style={{ fontSize: '2.2rem', color: '#2d3436', marginBottom: '10px', marginTop: '0' }}>Вход</h2>
        <p style={{ color: '#636e72', marginBottom: '30px' }}>Добре дошли отново!</p>

        <form onSubmit={formik.handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          <div>
            <input type="email" name="email" placeholder="Имейл адрес" {...formik.getFieldProps('email')} style={inputStyle} />
            {formik.touched.email && formik.errors.email && (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}>{formik.errors.email}</div>
            )}
          </div>

          <div>
            <input type="password" name="password" placeholder="Парола" {...formik.getFieldProps('password')} style={inputStyle} />
            {formik.touched.password && formik.errors.password && (
              <div style={{ color: '#ff6b6b', fontSize: '13px', marginTop: '8px', textAlign: 'left' }}>{formik.errors.password}</div>
            )}
          </div>

          <button type="submit" style={{
            padding: '15px',
            backgroundColor: '#2d3436',
            color: 'white',
            border: 'none',
            borderRadius: '15px',
            cursor: 'pointer',
            fontSize: '16px',
            fontWeight: '600',
            boxShadow: '0 10px 20px rgba(0,0,0,0.1)',
            marginTop: '10px',
            transition: 'transform 0.2s ease'
          }}>
            Влез в профила
          </button>
        </form>

        <p style={{ marginTop: '25px', color: '#636e72', fontSize: '14px' }}>
          Нямате профил? <Link to="/register" style={{ color: '#ff6b6b', fontWeight: 'bold', textDecoration: 'none' }}>Регистрирайте се</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;