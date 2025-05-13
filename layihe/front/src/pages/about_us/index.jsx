import React from 'react'
import "./index.scss"

const About = () => {
  return (
    <section className="about">
      <div className="container">
        <h1>About Us</h1>
        <p>
          Welcome to <strong>League Hub</strong>, the ultimate destination for League of Legends fans! Whether you want to watch epic highlights, chat with fellow summoners, or stay updated on the latest news, we've got you covered.
        </p>
        <h2>What We Offer</h2>
        <ul>
          <li><strong>Reels & Highlights</strong> – Watch and share the best League moments.</li>
          <li><strong>Community Chat</strong> – Connect with players and discuss strategies.</li>
          <li><strong>Stay Updated</strong> – Get the latest patch notes and esports news.</li>
        </ul>
        <p>Join our growing community and experience League of Legends like never before!</p>
        <p className="gg">GG and see you on the Rift!</p>
      </div>
    </section>
  );
}

export default About