import { useEffect } from 'react'
import './App.css'
import headshot from './assets/headshot.jpg'
import pianoSmile from './assets/piano-smile.jpg'
import stagePhoto from './assets/stage.jpg'

type Project = {
  name: string
  description: string
  language: string
  languageColor: string
  repo: string
  link?: { href: string; label: string }
  tag?: string
}

const projects: Project[] = [
  {
    name: 'Friends of Frank Lesko',
    description:
      'Campaign website for an Illinois State Senate campaign — platform, FAQ, volunteer sign-up, and donations. Hand-built with plain HTML, CSS, and JavaScript.',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    repo: 'https://margaron.net/friendsoffranklesko',
  },
  {
    name: 'Porygon3',
    description:
      'Discord bot for the Springfield Battle League, a competitive VGC Pokémon draft league. Handles trades, betting, season scheduling, and Pokémon Showdown replay analysis.',
    language: 'Python',
    languageColor: '#3572A5',
    repo: 'https://github.com/Ulico/Porygon3',
  },
  {
    name: 'Pokémon Teamsheet Generator',
    description:
      'Generates polished, Scarlet/Violet-styled teamsheet graphics for Pokémon teams — dynamic layouts, type and move icons, and stylized text.',
    language: 'Python',
    languageColor: '#3572A5',
    repo: 'https://github.com/Ulico/PokemonTeamsheetGenerator',
    link: {
      href: 'https://ulico-pokemonteamsheetgenerator-app-ukjjki.streamlit.app/',
      label: 'Live app',
    },
  },
  {
    name: 'SBL Hub',
    description:
      'League management web app for the Springfield Battle League — SQL database schema and access-policy work alongside front-end features.',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    repo: 'https://github.com/patrickrolens/sbl-hub',
    tag: 'Contributor',
  },
  {
    name: 'VGC Draft Planner',
    description:
      'Single-page web app for planning and comparing competitive Pokémon drafts, with data-driven UI features built on a structured JSON dataset.',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    repo: 'https://github.com/patrickrolens/vgc-draft-planner',
    tag: 'Contributor',
  },
  {
    name: 'LocationChanger',
    description:
      'Alters the GPS location on iOS devices using libimobiledevice and Python — no jailbreak required.',
    language: 'Python',
    languageColor: '#3572A5',
    repo: 'https://github.com/Ulico/LocationChanger',
  },
  {
    name: 'Pain Management',
    description:
      'Dual-interface Android app built for Carle Illinois College of Medicine — patients log chronic pain symptoms, physicians review consolidated history on a dashboard.',
    language: 'Kotlin',
    languageColor: '#A97BFF',
    repo: 'https://github.com/Ulico/Pain-Management-Patient-Side',
  },
  {
    name: 'Gig',
    description:
      'Android app using Firebase and the Spotify API to host listening parties where music recommendations are shared and played in real time.',
    language: 'Java',
    languageColor: '#B07219',
    repo: 'https://github.com/Ulico/Gig',
  },
  {
    name: 'ulico.github.io',
    description: 'This site. A minimal personal portfolio built with React, TypeScript, and Vite.',
    language: 'TypeScript',
    languageColor: '#3178C6',
    repo: 'https://github.com/Ulico/ulico.github.io',
  },
]

const fbEmbedSrc = (href: string) =>
  `https://www.facebook.com/plugins/video.php?href=${encodeURIComponent(href)}&show_text=false`

/* Facebook videos must be public to embed; private ones show "Video Unavailable" */
const videos: { title: string; src: string }[] = [
  {
    title: 'Gershwin — Prelude No. 3 (2018 recital)',
    src: 'https://www.youtube.com/embed/4WCFLatV5vI',
  },
  {
    title: 'Doña Maria — Brazil Café with Craig Russo & Jose Gobbo',
    src: 'https://www.youtube.com/embed/EfPUBAQ9nYU',
  },
  {
    title: 'Girl Talk — piano solo',
    src: 'https://www.youtube.com/embed/ATwcjspRdeE',
  },
  {
    title: 'Live set — Craig Russo Latin Jazz Project',
    src: fbEmbedSrc('https://www.facebook.com/reel/2216951922410350'),
  },
  {
    title: 'Escapade — with Paul Nolen at Jazz UpFront',
    src: 'https://www.youtube.com/embed/7twDoLgIpMc',
  },
]

const ArrowIcon = () => (
  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
  </svg>
)

const MusicNoteIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
)

const WaveIcon = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" aria-hidden="true">
    <path d="M3 12h1M7 8v8M11 5v14M15 8v8M19 10v4M22 12h-1" />
  </svg>
)

function App() {
  useEffect(() => {
    const els = document.querySelectorAll('.reveal')
    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible')
            io.unobserve(entry.target)
          }
        }
      },
      { threshold: 0.1 },
    )
    els.forEach((el) => io.observe(el))
    return () => io.disconnect()
  }, [])

  return (
    <div className="site">
      <div className="glow" aria-hidden="true" />

      <nav className="nav">
        <a href="#top" className="nav-brand">
          AR
        </a>
        <div className="nav-links">
          <a href="#about">About</a>
          <a href="#music">Music</a>
          <a href="#projects">Projects</a>
          <a href="https://github.com/Ulico" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="GitHub">
            <GitHubIcon />
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="hero-eyebrow reveal">Musician · Software Engineer</p>
            <h1 className="hero-title reveal">Adrian Russo</h1>
            <p className="hero-sub reveal">
              I build software — from Discord bots to VR chemistry labs — and play jazz piano and
              bass. Mathematics &amp; CS at the University of Illinois, M.S. in Computer Science.
            </p>
            <div className="hero-actions reveal">
              <a href="#projects" className="btn btn-primary">
                View projects
              </a>
              <a href="https://github.com/Ulico" target="_blank" rel="noopener noreferrer" className="btn btn-ghost">
                <GitHubIcon />
                GitHub
              </a>
            </div>
          </div>
          <img className="hero-photo reveal" src={headshot} alt="Adrian Russo" />
        </section>

        <section id="about" className="section">
          <h2 className="section-title reveal">
            <span className="section-index">01</span> About
          </h2>
          <div className="about-grid">
            <div className="about-prose reveal">
              <p>
                I'm a software engineer out of Springfield, Illinois, with degrees in Mathematics
                &amp; Computer Science and an M.S. in Computer Science from the University of
                Illinois Urbana-Champaign. I've gamified chemistry labs in virtual reality at
                Mirage, built mobile health apps for Carle Illinois College of Medicine, and
                spent two years teaching intro CS as a course associate at UIUC.
              </p>
              <p>
                Away from the keyboard I'm a semi-professional musician, a competitive VGC
                Pokémon player (most of my side projects orbit a draft league), and a
                speedcuber — I was president of Illini Cubers, UIUC's competitive Rubik's cube
                organization, with official sub-10-second solves.
              </p>
            </div>
            <div className="about-side reveal">
              <img className="about-photo" src={pianoSmile} alt="Adrian at the piano" />
              <dl className="about-facts">
              <div className="fact">
                <dt>Education</dt>
                <dd>B.S. Math &amp; CS · M.S. Computer Science, UIUC</dd>
              </div>
              <div className="fact">
                <dt>Currently</dt>
                <dd>Web developer, Friends of Frank Lesko</dd>
              </div>
              <div className="fact">
                <dt>Toolbox</dt>
                <dd>Python · Java · Kotlin · TypeScript · Applied ML</dd>
              </div>
              <div className="fact">
                <dt>Elsewhere</dt>
                <dd>Jazz piano &amp; bass · VGC Pokémon · Speedcubing</dd>
              </div>
              </dl>
            </div>
          </div>
        </section>

        <section id="music" className="section">
          <h2 className="section-title reveal">
            <span className="section-index">02</span> Music
          </h2>
          <p className="section-sub reveal">
            Pianist and electric/upright bassist — jazz, classical, and Latin. I've performed with
            the UIUC Latin Jazz Ensemble, the Craig Russo Latin Jazz Project, Brazil Café, and
            Charanga Tropical. Recordings coming soon.
          </p>
          <img
            className="music-banner reveal"
            src={stagePhoto}
            alt="Adrian performing at a grand piano"
          />
          <div className="video-row">
            {videos.map((v) => (
              <figure key={v.src} className="video-card reveal">
                <div className="video-frame">
                  <iframe
                    src={v.src}
                    title={v.title}
                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                    allowFullScreen
                    scrolling="no"
                    frameBorder="0"
                  />
                </div>
                <figcaption>{v.title}</figcaption>
              </figure>
            ))}
          </div>
          <div className="music-grid">
            <a
              href="https://open.spotify.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="card music-card reveal"
            >
              <span className="music-card-icon spotify">
                <MusicNoteIcon />
              </span>
              <div>
                <h3>
                  Spotify <ArrowIcon />
                </h3>
                <p>Playlists and released tracks.</p>
              </div>
            </a>
            <a
              href="https://soundcloud.com/"
              target="_blank"
              rel="noopener noreferrer"
              className="card music-card reveal"
            >
              <span className="music-card-icon soundcloud">
                <WaveIcon />
              </span>
              <div>
                <h3>
                  SoundCloud <ArrowIcon />
                </h3>
                <p>Demos, sketches, and works in progress.</p>
              </div>
            </a>
          </div>
        </section>

        <section id="projects" className="section">
          <h2 className="section-title reveal">
            <span className="section-index">03</span> Projects
          </h2>
          <p className="section-sub reveal">A few things I've built, straight from GitHub.</p>
          <div className="projects-grid">
            {projects.map((p) => (
              <div key={p.name} className="card project-card reveal">
                <div className="project-head">
                  {/* stretched link: covers the whole card via ::after */}
                  <a
                    className="repo-link"
                    href={p.repo}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <h3>{p.name}</h3>
                  </a>
                  <ArrowIcon />
                </div>
                <p>{p.description}</p>
                <div className="project-meta">
                  <span className="lang">
                    <span className="lang-dot" style={{ background: p.languageColor }} />
                    {p.language}
                  </span>
                  {p.link && (
                    <a
                      className="project-link-tag"
                      href={p.link.href}
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      {p.link.label}
                    </a>
                  )}
                  {p.tag && <span className="project-tag">{p.tag}</span>}
                </div>
              </div>
            ))}
          </div>
        </section>
      </main>

      <footer className="footer">
        <span>© {new Date().getFullYear()} Adrian Russo</span>
        <a href="https://github.com/Ulico" target="_blank" rel="noopener noreferrer">
          github.com/Ulico
        </a>
      </footer>
    </div>
  )
}

export default App
