function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer style={{ 
      textAlign: 'center', 
      padding: '20px', 
      marginTop: '50px', 
      backgroundColor: '#f8f9fa', 
      borderTop: '1px solid #ddd',
      color: '#555'
    }}>
      <p style={{ margin: 0 }}>
        © {currentYear} Recipe Blog.
      </p>
      <p style={{ margin: '5px 0 0 0', fontWeight: 'bold' }}>
        Изработено от: Беатрис Иванова 193кнз
      </p>
    </footer>
  );
}

export default Footer;