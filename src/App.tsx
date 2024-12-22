import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Home } from './pages/Home';
import { Suspense } from 'react';
import React from 'react';

//          <Route path="/about" element={<About />} />

const App = () => {
  return (
    <Suspense fallback="loading">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </Suspense>
  );
};
export default App;
