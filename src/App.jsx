import React, { useState, useEffect } from 'react';
import { Routes, Route, Navigate, Link, useNavigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import SudokuBoard from './components/SudokuBoard';
import Ranking from './components/Ranking';
import UserGames from './components/UserGames';
import Header from './components/Header';
import Footer from './components/Footer';

const App = () => {
  const [token, setToken] = useState(localStorage.getItem('token'));
  const navigate = useNavigate();

  const handleLogin = (token) => {
    localStorage.setItem('token', token);
    setToken(token);
    navigate('/sudoku');
  };

  const handleRegister = () => {
    localStorage.setItem('token', token);
    setToken(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setToken(null);
    navigate('/login');
  };

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      setToken(savedToken);
    }
  }, []);

  return (
    <div>
      <Header token={token} handleLogout={handleLogout} />
      <div className="container mt-5" style={{ minHeight: '500px' }}>
        <Routes>
          <Route path="/" element={<Navigate to={token ? "/sudoku" : "/login"} />} />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route path="/register" element={<Register onRegister={handleRegister} />} />
          <Route path="/sudoku" element={token ? <SudokuBoard token={token} /> : <Navigate to="/login" />} />
          <Route path="/ranking" element={<Ranking />} />
          <Route path="/user-games" element={token ? <UserGames token={token} /> : <Navigate to="/login" />} />
        </Routes>
      </div>
      <Footer />
    </div>
  );
};

export default App;