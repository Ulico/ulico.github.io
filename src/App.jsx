import React, { useState, useEffect } from 'react';
import './App.css';
import Home from './Home';
import Music from './Music';
import Projects from './Projects';

function App() {
  const [activeTab, setActiveTab] = useState('home');

  useEffect(() => {
    const hash = window.location.hash.replace('#', '');
    if (hash && ['home', 'music', 'projects'].includes(hash)) {
      setActiveTab(hash);
    }
  }, []);

  const handleTabClick = (tab) => {
    setActiveTab(tab);
    window.location.hash = tab;
  };

  return (
    <div>
      <header className="header">
        <h1>Adrian Russo</h1>
        <nav>
          <a
            href="#home"
            className={activeTab === 'home' ? 'active' : ''}
            onClick={e => { e.preventDefault(); handleTabClick('home'); }}
          >Home</a>
          <a
            href="#music"
            className={activeTab === 'music' ? 'active' : ''}
            onClick={e => { e.preventDefault(); handleTabClick('music'); }}
          >Music</a>
          <a
            href="#projects"
            className={activeTab === 'projects' ? 'active' : ''}
            onClick={e => { e.preventDefault(); handleTabClick('projects'); }}
          >Projects</a>
        </nav>
      </header>
      <main className="main">
        <div style={{ display: activeTab === 'home' ? 'block' : 'none' }}>
          <Home />
        </div>
        <div style={{ display: activeTab === 'music' ? 'block' : 'none' }}>
          <Music />
        </div>
        <div style={{ display: activeTab === 'projects' ? 'block' : 'none' }}>
          <Projects />
        </div>
      </main>
    </div>
  );
}

export default App;
