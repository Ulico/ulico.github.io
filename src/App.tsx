import { useEffect, useState } from 'react'
import './App.css'
import headshot from './assets/headshot.jpg'
import pianoSmile from './assets/piano-smile.jpg'

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
    name: 'Friends of Frank Lesko',
    description:
      'Campaign website for an Illinois State Senate campaign — platform, FAQ, volunteer sign-up, and donations. Hand-built with plain HTML, CSS, and JavaScript.',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    repo: 'https://margaron.net/friendsoffranklesko',
  },
  {
    name: 'SBL Hub',
    description:
      'League management web app for the Springfield Battle League — SQL database schema and access-policy work alongside front-end features.',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    repo: 'https://github.com/patrickrolens/sbl-hub',
    link: { href: 'https://springfieldbattleleague.com/', label: 'Live site' },
    tag: 'Contributor',
  },
  {
    name: 'VGC Draft Planner',
    description:
      'Single-page web app for planning and comparing competitive Pokémon drafts, with data-driven UI features built on a structured JSON dataset.',
    language: 'JavaScript',
    languageColor: '#F1E05A',
    repo: 'https://github.com/patrickrolens/vgc-draft-planner',
    link: { href: 'https://planner.springfieldbattleleague.com/', label: 'Live site' },
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

type Video = {
  title: string
  sub?: string
  play: string
  thumb: string
  thumbFallback?: string
}

/* Players load on click (facade pattern): faster page load than eager iframes */
const ytVideo = (id: string, title: string, sub?: string): Video => ({
  title,
  sub,
  play: `https://www.youtube.com/embed/${id}?autoplay=1&playsinline=1`,
  thumb: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
  thumbFallback: `https://img.youtube.com/vi/${id}/hqdefault.jpg`,
})

const featuredVideo = ytVideo('7twDoLgIpMc', 'Escapade', 'with Paul Nolen at Jazz UpFront')

const moreVideos: Video[] = [
  ytVideo('4WCFLatV5vI', 'Gershwin — Prelude No. 3', '2018 recital'),
  ytVideo('EfPUBAQ9nYU', 'Doña Maria', 'Brazil Café'),
  ytVideo('ATwcjspRdeE', 'Girl Talk', 'Jazz Trio'),
  ytVideo(
    'vs_F7XFC8Qw',
    'Afternoon in Paris',
    'Jazz Quartet',
  ),
]

const PlayIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M8 5.14v13.72c0 .8.87 1.3 1.56.88l10.54-6.86a1.05 1.05 0 0 0 0-1.76L9.56 4.26A1.04 1.04 0 0 0 8 5.14Z" />
  </svg>
)

function VideoEmbed({ video, featured = false }: { video: Video; featured?: boolean }) {
  const [playing, setPlaying] = useState(false)
  return (
    <figure className={`video-card reveal${featured ? ' featured' : ''}`}>
      <div className="video-frame">
        {playing ? (
          <iframe
            src={video.play}
            title={video.title}
            allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <button
            type="button"
            className="video-facade"
            onClick={() => setPlaying(true)}
            aria-label={`Play ${video.title}`}
          >
            <img
              src={video.thumb}
              alt=""
              loading="lazy"
              onLoad={(e) => {
                /* YouTube serves a 120x90 gray placeholder when maxresdefault
                   doesn't exist — swap to hqdefault, which always does */
                if (
                  video.thumbFallback &&
                  e.currentTarget.naturalWidth <= 120 &&
                  !e.currentTarget.src.endsWith('hqdefault.jpg')
                ) {
                  e.currentTarget.src = video.thumbFallback
                }
              }}
            />
            <span className="play-btn">
              <PlayIcon />
            </span>
          </button>
        )}
      </div>
      <figcaption>
        <strong>{video.title}</strong>
        {video.sub && <span>{video.sub}</span>}
      </figcaption>
    </figure>
  )
}

const ArrowIcon = () => (
  <svg className="arrow-icon" width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path d="M4.5 11.5L11.5 4.5M11.5 4.5H5.5M11.5 4.5V10.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
)

const FacebookIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M22 12c0-5.52-4.48-10-10-10S2 6.48 2 12c0 4.84 3.44 8.87 8 9.8v-6.93H7.9V12H10V9.8c0-2.07 1.23-3.22 3.12-3.22.9 0 1.85.16 1.85.16v2.03h-1.04c-1.03 0-1.35.64-1.35 1.29V12h2.3l-.37 2.87h-1.93v6.93c4.56-.93 8-4.96 8-9.8Z" />
  </svg>
)

const MailIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    <rect x="3" y="5" width="18" height="14" rx="2" />
    <path d="m3 7 9 6 9-6" />
  </svg>
)

const LinkedInIcon = () => (
  <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
    <path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.45v6.29ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z" />
  </svg>
)

const GitHubIcon = () => (
  <svg width="18" height="18" viewBox="0 0 16 16" fill="currentColor" aria-hidden="true">
    <path d="M8 0C3.58 0 0 3.58 0 8c0 3.54 2.29 6.53 5.47 7.59.4.07.55-.17.55-.38 0-.19-.01-.82-.01-1.49-2.01.37-2.53-.49-2.69-.94-.09-.23-.48-.94-.82-1.13-.28-.15-.68-.52-.01-.53.63-.01 1.08.58 1.23.82.72 1.21 1.87.87 2.33.66.07-.52.28-.87.51-1.07-1.78-.2-3.64-.89-3.64-3.95 0-.87.31-1.59.82-2.15-.08-.2-.36-1.02.08-2.12 0 0 .67-.21 2.2.82.64-.18 1.32-.27 2-.27s1.36.09 2 .27c1.53-1.04 2.2-.82 2.2-.82.44 1.1.16 1.92.08 2.12.51.56.82 1.27.82 2.15 0 3.07-1.87 3.75-3.65 3.95.29.25.54.73.54 1.48 0 1.07-.01 1.93-.01 2.2 0 .21.15.46.55.38A8.01 8.01 0 0 0 16 8c0-4.42-3.58-8-8-8Z" />
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
          <a href="https://www.linkedin.com/in/adrianmrusso" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="LinkedIn">
            <LinkedInIcon />
          </a>
          <a href="https://www.facebook.com/adrian.russo.9041" target="_blank" rel="noopener noreferrer" className="nav-icon" aria-label="Facebook">
            <FacebookIcon />
          </a>
          <a href="mailto:adrianmarcusr@gmail.com" className="nav-icon" aria-label="Email">
            <MailIcon />
          </a>
        </div>
      </nav>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="hero-eyebrow reveal">Musician · Software Engineer</p>
            <h1 className="hero-title reveal">Adrian Russo</h1>
            <p className="hero-sub reveal">
              I build software — from websites to Python apps — and play jazz piano and
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
                spent two years teaching intro CS as a course associate at UIUC. These days I'm
                building the campaign website for Frank Lesko's Illinois State Senate run.
              </p>
              <p>
                Away from the keyboard I'm a semi-professional musician, and I enjoy playing
                VGC Pokémon (most of my side projects orbit a draft league), tennis and
                pickleball, and speedcubing — I was president of Illini Cubers, UIUC's
                competitive Rubik's cube organization, with official sub-10-second solves.
              </p>
            </div>
            <img
              className="about-photo reveal"
              src={pianoSmile}
              alt="Adrian at the piano"
              loading="lazy"
            />
          </div>
        </section>

        <section id="music" className="section">
          <h2 className="section-title reveal">
            <span className="section-index">02</span> Music
          </h2>
          <p className="section-sub reveal">
            Pianist and electric/upright bassist — jazz, classical, and Latin. I've performed with
            the UIUC Latin Jazz Ensemble, the Craig Russo Latin Jazz Project, Brazil Café, and
            Charanga Tropical.
          </p>
          <VideoEmbed video={featuredVideo} featured />
          <div className="video-row">
            {moreVideos.map((v) => (
              <VideoEmbed key={v.title} video={v} />
            ))}
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
        <div className="footer-links">
          <a href="https://github.com/Ulico" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <a href="https://www.linkedin.com/in/adrianmrusso" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
          <a href="https://www.facebook.com/adrian.russo.9041" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>
          <a href="mailto:adrianmarcusr@gmail.com">Email</a>
        </div>
      </footer>
    </div>
  )
}

export default App
