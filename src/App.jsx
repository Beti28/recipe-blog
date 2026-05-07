import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import RecipeDetails from './pages/RecipeDetails';
import AddRecipe from './pages/AddRecipe';
import Footer from './components/Footer';
import EditRecipe from './pages/EditRecipe';
import './App.css';

function App() {
  return (
    <Router>
      <div className="App">
        <Navbar />
        <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/recipes/:id" element={<RecipeDetails />} />
          <Route path="/add-recipe" element={<AddRecipe />} />
          <Route path="/edit/:id" element={<EditRecipe />} />
        </Routes>
        </main>
        <Footer />
      </div>
      
    </Router>
    
  );
}

export default App;