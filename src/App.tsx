import { Home } from './pages/Home';
import React, { useContext } from 'react';
import { ContentContextProvider } from './context/ContentContextProvider';
import { BrowserRouter } from 'react-router-dom';
import { AuthProvider, AuthContext } from './context/AuthContext';
import { Routes as Router, Route, Navigate, Outlet } from 'react-router-dom';
import { Login } from './pages/Login';
import { Signup } from './pages/Signup';
import { FollowFans } from './pages/FollowFans';

const PrivateRoutes = () => {
  const { token } = useContext(AuthContext);
  if (!token) return <Navigate to="/login" replace />;

  return <Outlet />;
};

const App = () => {
  return (
    <BrowserRouter>
      <AuthProvider>
        <ContentContextProvider>
          <Router>
            <Route path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route element={<PrivateRoutes />}>
              <Route path="/follow" element={<FollowFans />} />
              <Route path="/" element={<Home />} />
            </Route>
          </Router>
        </ContentContextProvider>
      </AuthProvider>
    </BrowserRouter>
  );
};
export default App;
