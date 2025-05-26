import React from 'react';

function Music() {
  return (
    <section>
      <h2>Music</h2>
      <ul className="music-list">
        <li><strong>Track/Album Name</strong> – Description or streaming link</li>
        <li><strong>Another Song</strong> – Description or streaming link</li>
        {/* Add more music entries here */}
      </ul>
    </section>
  );
}

export default Music;
