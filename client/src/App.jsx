import { Button, Flex, Text } from '@aws-amplify/ui-react'
import { Amplify, API } from 'aws-amplify';
import { useRef } from 'react'
import { PUBLISH_DOC } from './api';
import { CHANNEL_NAME, config } from './amplifyconfiguration';
import './App.css'

Amplify.configure(config);

function App() {
  const emojiRef = useRef([
		{ emoji: '🔥', displayText: '🔥 Fiya' },
		{ emoji: '🎲', displayText: '🎲 re:Invent Las Vegas' },
		{ emoji: '🎰', displayText: '🎰 Feeling Lucky!!' },
		{ emoji: '☁️', displayText: '☁️ Serverless Cloud' },
		{ emoji: '👀', displayText: '👀 I see you!' },
    { emoji: '😁', displayText: '😁 Get Excited!' },
    { emoji: '👋', displayText: '👋 Hello World!' },
    { emoji: '🎂', displayText: '🎂 Gimme more!!' },
	]);

  // const publish = async (name, data) => {
  //   return (await API.graphql({
  //     query: PUBLISH_DOC,
  //     variables: { name, data }
  //   }));
  // };

	const handleClick = async (emote) => {
		const reaction = {
			icon: emote,
		};

    await API.graphql({
      query: PUBLISH_DOC,
      variables: { 
        name: CHANNEL_NAME, 
        data: JSON.stringify(reaction)
      }
    })
	}

  return (
		<Flex justifyContent="center">
			<Flex wrap={'wrap'} justifyContent="center" maxWidth={'400px'}>
        <Text
          as="h3"
          color="white"
          lineHeight="1.5em"
          fontWeight={700}
          fontSize="1.5em"
          width="30vw"
        >
          re:Invent 2023
        </Text>

        <Text
          as="p"
          color="white"
        >
          Choose an emoji from the list below to see it live on the main screen!
        </Text>

				{emojiRef.current.map((emojiItem, idx) => (
					<Button
            key={idx}
						width={'100%'}
						variation="primary"
            backgroundColor="#1f0836"
						onClick={() => handleClick(emojiItem.emoji)}
					>
						{emojiItem.displayText}
					</Button>
				))}
			</Flex>
		</Flex>
  )
}

export default App
