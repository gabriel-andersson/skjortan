import React from 'react';
import Header from './components/Header';
import Dashboard from './components/Dashboard';
import './styles/global.css';
import './App.css';

function App() {
  return (
    <div className="App">
      <Header />
      <main className="main-content">
        <Dashboard />
      </main>
      <footer className="footer">
        <div className="container">
          <p>&copy; {new Date().getFullYear()} Skjortan - Beer & Shirt Tracker</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
