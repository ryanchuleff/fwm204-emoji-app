import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Amplify, API } from 'aws-amplify';
import { SUBSCRIBE_DOC } from './api';
import { CHANNEL_NAME, config } from './amplifyconfiguration.json';
// import './App.css'

Amplify.configure(config);

const EmojiThrower = ({ emoji = '💯' }) => {
  const randomX = Math.random() * (window.innerWidth - 100)
  return (
    <motion.div
      z-index={100}
      initial={{ y: '100vh', x: randomX, opacity: 1, position: 'absolute' }}
      animate={{ opacity: 0, y: 0 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 2 }}
    >
      <p style={{ fontSize: '40px' }}>{emoji}</p>
    </motion.div>
  )
}

function App() {
  const [emote, setEmote] = useState([])
  const handleClick = () => { setEmote([ ...emote, 1 ])}

  const subscribe = (name, next, error) => {
    return API.graphql({
      query: SUBSCRIBE_DOC, 
      variables: { name }
    }).subscribe({
      next: ({ provider, value }) => {
        next(value.data.subscribe, provider, value)
      },
      error: error || console.log,
    });
  };

  useEffect(() => {
    const sub = subscribe(CHANNEL_NAME, ({ data }) => {
      console.log(data)
      const icon = JSON.parse(data).icon
      setEmote((prevState) => [ ...prevState, icon ])
    })

    return () => {
      sub.unsubscribe()
    }
  }, [])

  return (
    <div className="App">
      {/* <div style={
        { display: 'flex', justifyContent: 'flex-end' }
      }>
        <button onMouseOver={handleClick}>
          Show Component
        </button>
      </div> */}
      {emote.map((item, i) => {
        return <EmojiThrower key={i} emoji={item} />
      })}
    </div>
  )
}

export default App;
