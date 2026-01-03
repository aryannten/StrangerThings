import React, { useState } from 'react'
import { motion } from 'framer-motion'
import './Characters.css'
import CharacterModal from './CharacterModal'

const characters = [
  {
    name: 'Eleven',
    nickname: 'El',
    ability: 'Telekinesis & Telepathy',
    image: '`${import.meta.env.BASE_URL}images/eleven.jpg',
    quote: '"Friends don\'t lie."'
  },
  {
    name: 'Mike Wheeler',
    nickname: 'Mike',
    ability: 'Leadership & Loyalty',
    image: '`${import.meta.env.BASE_URL}images/mike.jpg',
    quote: '"She\'s our friend and she\'s crazy!"'
  },
  {
    name: 'Dustin Henderson',
    nickname: 'Dustin',
    ability: 'Intelligence & Humor',
    image: '`${import.meta.env.BASE_URL}images/dustin.jpg',
    quote: '"She\'s a Demogorgon."'
  },
  {
    name: 'Lucas Sinclair',
    nickname: 'Lucas',
    ability: 'Strategy & Bravery',
    image: '`${import.meta.env.BASE_URL}images/lucas.jpg',
    quote: '"You\'re an idiot, Steve Harrington."'
  },
  {
    name: 'Will Byers',
    nickname: 'Will',
    ability: 'True Sight',
    image: '`${import.meta.env.BASE_URL}images/will.jpg',
    quote: '"It\'s like I\'m stuck in the Upside Down."'
  },
  {
    name: 'Max Mayfield',
    nickname: 'MadMax',
    ability: 'Fearlessness',
    image: '`${import.meta.env.BASE_URL}images/max.jpg',
    quote: '"I\'m not afraid of you."'
  },
  {
    name: 'Derek',
    nickname: 'Derek',
    ability: 'Mystery & Courage',
    image: '`${import.meta.env.BASE_URL}images/derek.jpg',
    quote: '"Suck my fat one"'
  },
  {
    name: 'Holly',
    nickname: 'Holly',
    ability: 'Intuition & Heart',
    image: '`${import.meta.env.BASE_URL}images/holly.jpg',
    quote: '"You sure you’re not a monster?"'  },
  {
    name: 'Steve Harrington',
    nickname: 'Steve',
    ability: 'Bat Wielding & Redemption',
    image: '`${import.meta.env.BASE_URL}images/steve.jpg',
    quote: '"How do you like your eggs in the morning?"'
  },
  {
    name: 'Jim Hopper',
    nickname: 'Hopper',
    ability: 'Protection & Determination',
    image: '`${import.meta.env.BASE_URL}images/hopper.jpg',
    quote: '"Mornings are for coffee and contemplation."'
  },
  {
    name: 'Joyce Byers',
    nickname: 'Joyce',
    ability: 'Motherly Instinct & Persistence',
    image: '`${import.meta.env.BASE_URL}images/joyce.jpg',
    quote: '"This is not a normal family."'
  },
  {
    name: 'Nancy Wheeler',
    nickname: 'Nancy',
    ability: 'Investigation & Sharpshooting',
    image: '`${import.meta.env.BASE_URL}images/nancy.jpg',
    quote: '"I\'m not like other girls."'
  },
  {
    name: 'Murray Bauman',
    nickname: 'Murray',
    ability: 'Conspiracy & Truth-Seeking',
    image: '`${import.meta.env.BASE_URL}images/murray.jpg',
    quote: '"How is this my life?"'
  },
  {
    name: 'Robin Buckley',
    nickname: 'Robin',
    ability: 'Languages & Wit',
    image: '`${import.meta.env.BASE_URL}images/robin.jpg',
    quote: '"I\'m officially terrified."'  }
]

const Characters = () => {
  const [selectedCharacter, setSelectedCharacter] = useState(null)

  const container = {
    hidden: {},
    visible: {
      transition: { staggerChildren: 0.15 }
    }
  }

  const cardVariant = {
    hidden: { opacity: 0, y: 60, rotateX: -15 },
    visible: { 
      opacity: 1, 
      y: 0, 
      rotateX: 0,
      transition: { type: 'spring', stiffness: 60, damping: 12 }
    }
  }

  return (
    <section className="characters-section">
      <motion.div
        className="characters-header"
        initial={{ opacity: 0, y: -30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <h2 className="characters-title">The Party</h2>
        <p className="characters-subtitle">Meet the heroes of Hawkins</p>
      </motion.div>

      <motion.div 
        className="characters-grid"
        variants={container}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
      >
        {characters.map((char, index) => (
          <motion.div 
            key={index} 
            className="character-card"
            variants={cardVariant}
            whileHover={{ 
              scale: 1.05, 
              boxShadow: "0 0 40px rgba(255, 50, 50, 0.5)",
              transition: { duration: 0.3 }
            }}
            onClick={() => setSelectedCharacter(char)}
          >
            <div className="card-image-container">
              <div 
                className="card-image" 
                style={{ backgroundImage: `url(${char.image})` }}
              />
              <div className="card-overlay" />
            </div>
            
            <div className="card-content">
              <h3 className="card-name">{char.name}</h3>
              <span className="card-nickname">{char.nickname}</span>
              <p className="card-ability">{char.ability}</p>
              <p className="card-quote">{char.quote}</p>
            </div>

            <div className="card-glow" />
          </motion.div>
        ))}
      </motion.div>

      {/* Character Modal */}
      {selectedCharacter && (
        <CharacterModal 
          character={selectedCharacter} 
          onClose={() => setSelectedCharacter(null)} 
        />
      )}
    </section>
  )
}

export default Characters
