import { useState } from 'react';

function Register() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newUser = { username, email, password };

    fetch('http://localhost:8000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(newUser)
    })
    .then(response => response.json())
    .then(savedUser => {
      // 1. Показваме съобщение за успех
      alert('Регистрацията е успешна! Вече сте вписани.');

      localStorage.setItem('user', JSON.stringify(savedUser));

      window.location.href = "/";
    })
    .catch(error => console.error('Грешка при регистрация:', error));
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px', border: '1px solid #ccc', borderRadius: '8px' }}>
      <h2>Регистрация</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <input 
          type="text" 
          placeholder="Потребителско име" 
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="email" 
          placeholder="Имейл" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <input 
          type="password" 
          placeholder="Парола" 
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required 
          style={{ padding: '10px', fontSize: '16px' }}
        />
        <button type="submit" style={{ padding: '10px', backgroundColor: '#333', color: 'white', border: 'none', borderRadius: '5px', cursor: 'pointer', fontSize: '16px' }}>
          Регистрирай ме
        </button>
      </form>
    </div>
  );
}

export default Register;