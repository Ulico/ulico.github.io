import { useState } from 'react'
import MusicTab from './MusicTab'
import ProjectsTab from './ProjectsTab'
import './App.css'

function App() {
  const [tab, setTab] = useState<'home' | 'music' | 'projects'>('home')
  const tabList = [
    { key: 'home', label: 'Home' },
    { key: 'music', label: 'Music' },
    { key: 'projects', label: 'Projects' },
  ]

  return (
    <div className="modern-container">
      <header className="modern-header">
        <h1 className="modern-title">Adrian Russo</h1>
        <nav className="modern-tabs">
          {tabList.map(({ key, label }) => (
            <button
              key={key}
              className={`modern-tab${tab === key ? ' active' : ''}`}
              onClick={() => setTab(key as typeof tab)}
            >
              {label}
            </button>
          ))}
        </nav>
      </header>
      <main className="modern-main">
        {tab === 'home' && (
          <section>
            <h2>Welcome!</h2>
            <p>Hi, I'm Adrian Russo. Welcome to my personal website.</p>
            <p>Explore my music and projects using the tabs above.</p>
          </section>
        )}
        {tab === 'music' && <MusicTab />}
        {tab === 'projects' && <ProjectsTab />}
      </main>
    </div>
  )
}

export default App
