import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './SeasonsTimeline.css'

const seasons = [
  {
    number: 1,
    title: 'The Vanishing of Will Byers',
    year: '1983',
    episodes: 8,
    description: 'When Will Byers disappears, his mother Joyce and friends uncover a secret government experiment and a terrifying creature from another dimension.',
    keyEvents: [
      'Will vanishes into the Upside Down',
      'Eleven escapes Hawkins Lab',
      'The party discovers the Demogorgon',
      'Barb becomes a victim',
      'Eleven defeats the Demogorgon'
    ],
    color: '#c04050'
  },
  {
    number: 2,
    title: 'The Mind Flayer',
    year: '1984',
    episodes: 9,
    description: 'A year later, Will is haunted by visions of the Upside Down. A new threat emerges as the Mind Flayer attempts to spread into Hawkins.',
    keyEvents: [
      'Will experiences True Sight',
      'Eleven finds her mother',
      'The Mind Flayer possesses Will',
      'Bob Newby\'s sacrifice',
      'Eleven closes the Gate'
    ],
    color: '#a050c0'
  },
  {
    number: 3,
    title: 'The Battle of Starcourt',
    year: '1985',
    episodes: 8,
    description: 'Summer brings the Starcourt Mall, new romances, and a Russian plot to reopen the Gate. The Mind Flayer creates the Flesh Monster.',
    keyEvents: [
      'Russians build a base under Starcourt',
      'Billy becomes the Mind Flayer\'s host',
      'The Flesh Monster is born',
      'Alexei befriends Murray',
      'Hopper\'s apparent death'
    ],
    color: '#5080d0'
  },
  {
    number: 4,
    title: 'Vecna\'s Curse',
    year: '1986',
    episodes: 9,
    description: 'The party is scattered. A new villain, Vecna, emerges and begins killing teenagers. Eleven must regain her powers to face the ultimate evil.',
    keyEvents: [
      'Vecna begins his killings',
      'Max faces Vecna\'s curse',
      'Eleven\'s origins revealed',
      'Henry Creel is One/Vecna',
      'The Upside Down invades Hawkins'
    ],
    color: '#d06040'
  },
  {
    number: 5,
    title: 'The Final Chapter',
    year: '1987',
    episodes: 8,
    description: 'The epic conclusion to the Stranger Things saga. As Vecna\'s influence spreads and the Upside Down continues to merge with Hawkins, our heroes must make their final stand.',
    keyEvents: [
      'The Upside Down fully merges with Hawkins',
      'Eleven faces her ultimate challenge',
      'The party reunites for one last battle',
      'The truth about the Upside Down revealed',
      'The final confrontation with Vecna'
    ],
    color: '#50c080'
  }
]

const SeasonsTimeline = () => {
  const [activeSeason, setActiveSeason] = useState(null)

  return (
    <section className="timeline-section">
      <motion.div
        className="timeline-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="timeline-title">THE STORY SO FAR</h2>
        <p className="timeline-subtitle">Journey through the mysteries of Hawkins</p>
      </motion.div>

      <div className="timeline-container">
        {/* Timeline line */}
        <div className="timeline-line">
          <motion.div 
            className="timeline-progress"
            initial={{ height: '0%' }}
            whileInView={{ height: '100%' }}
            viewport={{ once: true }}
            transition={{ duration: 2 }}
          />
        </div>

        {/* Season cards */}
        <div className="timeline-seasons">
          {seasons.map((season, index) => (
            <motion.div
              key={season.number}
              className={`timeline-season ${activeSeason === index ? 'active' : ''}`}
              initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ duration: 0.6, delay: index * 0.2 }}
              onClick={() => setActiveSeason(activeSeason === index ? null : index)}
              style={{ '--season-color': season.color }}
            >
              {/* Year marker */}
              <div className="season-year-marker">
                <div className="year-dot" />
                <span className="year-text">{season.year}</span>
              </div>

              {/* Season card */}
              <motion.div 
                className="season-card"
                whileHover={{ scale: 1.02 }}
                transition={{ duration: 0.3 }}
              >
                <div className="season-number">
                  <span>SEASON</span>
                  <strong>{season.number}</strong>
                </div>

                <div className="season-info">
                  <h3 className="season-title">{season.title}</h3>
                  <span className="season-episodes">{season.episodes} Episodes</span>
                  <p className="season-description">{season.description}</p>

                  {/* Expandable key events */}
                  <motion.div 
                    className="season-events"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ 
                      height: activeSeason === index ? 'auto' : 0,
                      opacity: activeSeason === index ? 1 : 0
                    }}
                    transition={{ duration: 0.3 }}
                  >
                    <h4>Key Events:</h4>
                    <ul>
                      {season.keyEvents.map((event, i) => (
                        <motion.li 
                          key={i}
                          initial={{ opacity: 0, x: -10 }}
                          animate={{ 
                            opacity: activeSeason === index ? 1 : 0,
                            x: activeSeason === index ? 0 : -10
                          }}
                          transition={{ delay: i * 0.1 }}
                        >
                          {event}
                        </motion.li>
                      ))}
                    </ul>
                  </motion.div>
                </div>

                <div className="season-expand">
                  <span>{activeSeason === index ? '−' : '+'}</span>
                </div>

                {/* Decorative corner */}
                <div className="season-corner" />
              </motion.div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Floating particles */}
      <div className="timeline-particles">
        {[...Array(20)].map((_, i) => (
          <div 
            key={i} 
            className="timeline-particle"
            style={{
              left: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${5 + Math.random() * 5}s`
            }}
          />
        ))}
      </div>
    </section>
  )
}

export default SeasonsTimeline
