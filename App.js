import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './context/AuthContext';

// Páginas
import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import BolsistasList from './pages/bolsistas/BolsistasList';
import BolsistaForm from './pages/bolsistas/BolsistaForm';
// Importe outras páginas aqui

// Componente de proteção de rota
const ProtectedRoute = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return children;
};

// Tema personalizado
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2',
    },
    secondary: {
      main: '#dc004e',
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Navigate to="/dashboard" />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/dashboard"
              element={
                <ProtectedRoute>
                  <Dashboard />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/bolsistas"
              element={
                <ProtectedRoute>
                  <BolsistasList />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/bolsistas/novo"
              element={
                <ProtectedRoute>
                  <BolsistaForm />
                </ProtectedRoute>
              }
            />
            
            <Route
              path="/bolsistas/editar/:id"
              element={
                <ProtectedRoute>
                  <BolsistaForm />
                </ProtectedRoute>
              }
            />
            
            {/* Adicione outras rotas aqui */}
            
            <Route path="*" element={<Navigate to="/" />} />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;