import { Home } from './pages/Home';
import { Suspense } from 'react';
import React, { useContext } from 'react';
import { ContentContextProvider } from './context/ContentContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';

const PrivateRoutes = () => {
  const { authenticated } = useContext(AuthContext);

  if (!authenticated) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const HomePage = () => {
  return (
    <Suspense fallback="loading">
      <ContentContextProvider>
        <Home />
      </ContentContextProvider>
    </Suspense>
  );
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Router>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route element={<PrivateRoutes />}>
            <Route path="/" element={<HomePage />} />
          </Route>
        </Router>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
