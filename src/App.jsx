import React, { useEffect, useState } from "react";
import "./App.css";

const App = () => {
  const [particles, setParticles] = useState([]);
  const [subtitle, setSubtitle] = useState("");
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [subtitleIndex, setSubtitleIndex] = useState(0);

  const subtitles = [
    "// Initializing...",
    "// Loading awesome features...",
    "// Preparing something special...",
    "// Almost ready...",
    "// Stay tuned for updates...",
  ];

  // Particle creation effect
  useEffect(() => {
    const createParticle = () => {
      const colors = [
        "rgba(0, 255, 0, 0.7)",
        "rgba(255, 0, 40, 0.7)",
        "rgba(0, 40, 255, 0.7)",
      ];

      const newParticle = {
        id: Date.now() + Math.random(),
        left: Math.random() * 100,
        color: colors[Math.floor(Math.random() * colors.length)],
        delay: Math.random() * 15,
        duration: Math.random() * 10 + 10,
      };

      setParticles((prev) => [...prev, newParticle]);

      // Remove particle after animation
      setTimeout(() => {
        setParticles((prev) => prev.filter((p) => p.id !== newParticle.id));
      }, 25000);
    };

    const interval = setInterval(createParticle, 2000);
    return () => clearInterval(interval);
  }, []);

  // Typing effect
  useEffect(() => {
    const timeout = setTimeout(
      () => {
        const currentText = subtitles[subtitleIndex];

        if (!isDeleting) {
          setSubtitle(currentText.substring(0, charIndex + 1));
          setCharIndex((prev) => prev + 1);

          if (charIndex === currentText.length) {
            setTimeout(() => setIsDeleting(true), 2000);
          }
        } else {
          setSubtitle(currentText.substring(0, charIndex - 1));
          setCharIndex((prev) => prev - 1);

          if (charIndex === 0) {
            setIsDeleting(false);
            setSubtitleIndex((prev) => (prev + 1) % subtitles.length);
          }
        }
      },
      isDeleting ? 50 : 100
    );

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, subtitleIndex, subtitles]);

  return (
    <div className="bg-black text-white">
      <div className="glitch-wrapper">
        {/* Dynamic particles */}
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              left: `${particle.left}vw`,
              animationDelay: `${particle.delay}s`,
              animationDuration: `${particle.duration}s`,
              background: particle.color,
            }}
          />
        ))}

        <div className="content-container flex flex-col min-h-screen">
          <header className="py-8 px-4 sm:px-8 md:px-16 lg:px-24">
            <nav className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <img
                  alt="Torox Project Logo"
                  className="h-10 w-10 filter  transition-transform hover:scale-110"
                  src="/logo.svg"
                />
              </div>
              <a
                className="text-sm font-semibold tracking-widest hover:text-gray-300 transition-colors nav-link"
                href="#"
              >
                CAREERS
              </a>
            </nav>
          </header>

          <main className="flex-grow flex flex-col items-center justify-center text-center px-4">
            <h1
              className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-extrabold leading-tight glitch-text"
              data-text="SOMETHING AWESOME COMING SOON"
            >
              SOMETHING
              <br />
              AWESOME
              <br />
              COMING SOON
            </h1>
            <div className="subtitle-container mt-8">
              <p className="text-lg text-gray-400 typing-effect">{subtitle}</p>
            </div>
          </main>

          <footer className="py-8 px-4 sm:px-8">
            <div className="flex justify-center space-x-6">
              <a
                className="text-white hover:text-gray-400 transition-colors social-icon"
                href="https://github.com/Torox-Labs"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    clipRule="evenodd"
                    d="M12 2C6.477 2 2 6.477 2 12c0 4.418 2.865 8.166 6.839 9.489.5.092.682-.217.682-.483 0-.237-.009-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.03-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.379.201 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.942.359.308.678.921.678 1.856 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.001 10.001 0 0022 12c0-5.523-4.477-10-10-10z"
                    fillRule="evenodd"
                  />
                </svg>
                <span className="sr-only">GitHub</span>
              </a>
              <a
                className="text-white hover:text-gray-400 transition-colors social-icon"
                href="https://x.com/Torox_org"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M22.46 6c-.77.35-1.6.58-2.46.67.9-.53 1.59-1.37 1.92-2.38-.84.5-1.78.86-2.79 1.07C18.38 4.5 17.26 4 16 4c-2.35 0-4.27 1.92-4.27 4.29 0 .34.04.67.11.98C8.28 9.09 5.11 7.38 3 4.79c-.37.63-.58 1.37-.58 2.15 0 1.49.75 2.81 1.91 3.56-.71 0-1.37-.22-1.95-.5v.03c0 2.08 1.48 3.82 3.44 4.21a4.22 4.22 0 01-1.94.07 4.28 4.28 0 004 2.98 8.521 8.521 0 01-5.33 1.84c-.34 0-.68-.02-1.02-.06C3.44 20.29 5.56 21 7.89 21 16 21 20.48 14.11 20.48 8.03c0-.19 0-.37-.01-.56.84-.6 1.56-1.36 2.13-2.23z" />
                </svg>
                <span className="sr-only">Twitter</span>
              </a>
              <a
                className="text-white hover:text-gray-400 transition-colors social-icon"
                href="#"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
                </svg>
                <span className="sr-only">LinkedIn</span>
              </a>
              <a
                className="text-white hover:text-gray-400 transition-colors social-icon"
                href="https://medium.com/@TOROX"
                target="_blank"
                rel="noopener noreferrer"
              >
                <svg
                  aria-hidden="true"
                  className="h-7 w-7"
                  fill="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path d="M12.526 12.51L7.02 1.654H2.087L9.06 14.727L2.086 22.34h13.377l7.497-12.49H12.526zm-1.926 2.07h2.71L20.913 2.99h-2.68L10.6 14.58z" />
                </svg>
                <span className="sr-only">Medium</span>
              </a>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
};

export default App;
