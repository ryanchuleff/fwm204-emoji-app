import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import { Amplify, API } from 'aws-amplify';
import { SUBSCRIBE_DOC } from './api';
import { CHANNEL_NAME, config } from './amplifyconfiguration.json';

import Prism from 'prismjs';
import './prism.css';
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

  useEffect(() => {
    Prism.highlightAll();
  }, []);

  return (
    <div className="App">
      {/* <div style={
        { display: 'flex', justifyContent: 'flex-end' }
      }>
        <button onMouseOver={handleClick}>
          Show Component
        </button>
      </div> */}
      <div className="CodeWrapper">
        <div className="CodeBlock">
          <div className="Left">
            <h5>Publisher Code</h5>
            <pre><code className="language-javascript">{`
  const handleClick = async (emote) => {
    const reaction = { icon: emote };
    await API.graphql({
      query: PUBLISH_QUERY,
      variables: { 
        name: CHANNEL_NAME, 
        data: JSON.stringify(reaction)
      }
    })
  }
            `}</code></pre>
          </div>
          <div className="Right">
            <h5>Subscriber Code</h5>
            <pre><code className="language-javascript">{`
  const subscribe = (name, next, error) => {
    return API.graphql({
      query: SUBSCRIBE_QUERY, 
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
      setEmote((prevState) => [ ...prevState, JSON.parse(data).icon ])
    });

  return () => { sub.unsubscribe() }
  }, [])
            `}</code></pre>
          </div>
        </div>
      </div>
      {emote.map((item, i) => {
        return <EmojiThrower key={i} emoji={item} />
      })}
    </div>
  )
}

export default App;
