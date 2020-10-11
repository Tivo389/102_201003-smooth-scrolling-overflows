import React from 'react';
import './css/index.css';
import SmoothScroll from './components/SmoothScroll';

function App() {
  return (
    <main className="mainContainer" style={{ minHeight: window.innerHeight }}>
      <SmoothScroll></SmoothScroll>
    </main>
  );
}

export default App;
