import { Home } from './pages/Home';
import { Suspense } from 'react';
import React from 'react';
import GameContextProvider from './context/GameContextProvider';

const App = () => {
  return (
    <Suspense fallback="loading">
      <GameContextProvider>
        <Home />
      </GameContextProvider>
    </Suspense>
  );
};
export default App;
